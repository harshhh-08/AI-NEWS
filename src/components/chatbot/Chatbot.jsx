import { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../../services/aiService';
import { useISS } from '../../context/ISSContext';
import { useNews } from '../../context/NewsContext';
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from '../../utils/storage';
import {
  MessageCircle, X, Send, Trash2, Bot, User, Loader2,
} from 'lucide-react';
import toast from 'react-hot-toast';

const MAX_MESSAGES = 30;

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 animate-fade-in">
      <div className="w-7 h-7 rounded-full bg-neon-blue/20 flex items-center justify-center flex-shrink-0">
        <Bot size={14} className="text-neon-blue" />
      </div>
      <div className="glass px-4 py-3 rounded-2xl rounded-bl-sm border border-white/10">
        <div className="flex gap-1 items-center h-4">
          {[0,1,2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-neon-blue"
              style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex items-end gap-2 chat-bubble ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser ? 'bg-neon-purple/20' : 'bg-neon-blue/20'
      }`}>
        {isUser
          ? <User size={14} className="text-neon-purple" />
          : <Bot  size={14} className="text-neon-blue" />
        }
      </div>

      {/* Bubble */}
      <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
        isUser
          ? 'bg-neon-purple/20 border border-neon-purple/30 text-white rounded-br-sm'
          : 'glass border border-white/10 text-slate-200 rounded-bl-sm'
      }`}>
        {msg.content}
      </div>
    </div>
  );
}

export default function Chatbot() {
  const [open, setOpen]       = useState(false);
  const [messages, setMessages] = useState(() => loadFromStorage(STORAGE_KEYS.CHAT_MSGS) || []);
  const [input, setInput]     = useState('');
  const [thinking, setThinking] = useState(false);
  const bottomRef             = useRef(null);
  const inputRef              = useRef(null);

  const { position, speed, astronauts } = useISS();
  const { articles } = useNews();

  // Build context for AI
  const buildContext = () => ({
    issLat:         position?.latitude,
    issLon:         position?.longitude,
    issSpeed:       speed,
    issTimestamp:   position?.timestamp,
    astronautCount: astronauts?.number,
    astronauts:     astronauts?.people,
    newsCount:      articles.length,
    newsHeadlines:  articles.map((a) => a.title),
  });

  // Persist messages
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CHAT_MSGS, messages.slice(-MAX_MESSAGES));
  }, [messages]);

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, thinking]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || thinking) return;

    const userMsg = { role: 'user', content: text };
    const updated = [...messages, userMsg].slice(-MAX_MESSAGES);
    setMessages(updated);
    setInput('');
    setThinking(true);

    try {
      const reply = await sendChatMessage(
        updated.map((m) => ({ role: m.role, content: m.content })),
        buildContext()
      );
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }].slice(-MAX_MESSAGES));
    } catch (err) {
      toast.error('AI response failed');
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '⚠️ Sorry, I had trouble connecting. Please try again.' },
      ].slice(-MAX_MESSAGES));
    } finally {
      setThinking(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    toast.success('Chat cleared');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      {/* ── Floating button ────────────────────────────── */}
      <button
        id="chatbot-toggle"
        onClick={() => setOpen((v) => !v)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          open ? 'bg-red-500/80 hover:bg-red-500' : 'bg-gradient-to-br from-neon-blue to-neon-purple hover:scale-110'
        }`}
        style={{ boxShadow: open ? '0 0 20px rgba(239,68,68,0.4)' : '0 0 24px rgba(0,212,255,0.4)' }}
      >
        {open ? <X size={22} className="text-white" /> : <MessageCircle size={22} className="text-white" />}
      </button>

      {/* ── Chat window ────────────────────────────────── */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] flex flex-col glass rounded-2xl border border-white/10 shadow-glass transition-all duration-300 overflow-hidden ${
          open ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        }`}
        style={{ height: '520px' }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center">
            <Bot size={16} className="text-neon-blue" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white leading-none">Dashboard AI</p>
            <p className="text-xs text-slate-500 mt-0.5">Powered by Mistral-7B</p>
          </div>
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              title="Clear chat"
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-slate-500 text-xs mt-12 space-y-2">
              <Bot size={32} className="mx-auto text-neon-blue/40" />
              <p className="font-medium">Hi! Ask me anything about the dashboard.</p>
              <p className="text-slate-600">ISS position, speed, astronauts, news…</p>
            </div>
          )}
          {messages.map((msg, i) => <ChatBubble key={i} msg={msg} />)}
          {thinking && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3.5 border-t border-white/10 flex-shrink-0">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              id="chatbot-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask about ISS, news…"
              rows={1}
              className="flex-1 resize-none bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-neon-blue/40 transition-all max-h-28"
              style={{ minHeight: '42px' }}
            />
            <button
              id="chatbot-send"
              onClick={send}
              disabled={!input.trim() || thinking}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0"
              style={{
                background: input.trim() && !thinking
                  ? 'linear-gradient(135deg, #00d4ff, #a855f7)'
                  : 'rgba(255,255,255,0.05)',
              }}
            >
              {thinking
                ? <Loader2 size={16} className="text-white animate-spin" />
                : <Send size={16} className={input.trim() ? 'text-white' : 'text-slate-600'} />
              }
            </button>
          </div>
          <p className="text-xs text-slate-600 mt-2 text-center">Enter to send · Shift+Enter for new line</p>
        </div>
      </div>

      {/* Bounce animation for dots */}
      <style>{`
        @keyframes bounce {
          0%,80%,100% { transform: translateY(0); }
          40%          { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}
