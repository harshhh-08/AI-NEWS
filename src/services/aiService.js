import axios from 'axios';

const HF_URL = 'https://router.huggingface.co/v1/chat/completions';

// meta-llama/Llama-3.1-8B-Instruct is confirmed working on this HF token.
// Mistral-7B-Instruct-v0.2 was returning "model_not_supported" on the free tier.
const MODEL = 'meta-llama/Llama-3.1-8B-Instruct';

/**
 * Send a message to the AI with injected dashboard context.
 * @param {Array}  messages  - array of { role, content }
 * @param {Object} context   - live dashboard data to inject into system prompt
 * @returns {string} AI reply text
 */
export async function sendChatMessage(messages, context = {}) {
  const token = import.meta.env.VITE_HF_TOKEN;

  if (!token) throw new Error('VITE_HF_TOKEN is not set in .env');

  const systemPrompt = buildSystemPrompt(context);

  const payload = {
    model: MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages.slice(-20), // keep last 20 for context window
    ],
    max_tokens:  512,
    temperature: 0.4,
    stream:      false,
  };

  const { data } = await axios.post(HF_URL, payload, {
    headers: {
      Authorization:  `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    timeout: 30000,
  });

  const reply = data.choices?.[0]?.message?.content?.trim();
  if (!reply) throw new Error('Empty response from AI');
  return reply;
}

/** Build a context-rich system prompt from live dashboard data */
function buildSystemPrompt(ctx) {
  const {
    issLat, issLon, issSpeed, issTimestamp,
    astronautCount, astronauts,
    newsCount, newsHeadlines,
  } = ctx;

  const issInfo = issLat != null
    ? `ISS is currently at Lat ${issLat?.toFixed(4)}°, Lon ${issLon?.toFixed(4)}°. Speed ≈ ${Math.round(issSpeed ?? 0).toLocaleString()} km/h. Last updated: ${issTimestamp ? new Date(issTimestamp * 1000).toUTCString() : 'N/A'}.`
    : 'ISS position data is not yet loaded.';

  const astroInfo = astronauts?.length
    ? `${astronautCount} people are currently in space: ${astronauts.map((a) => `${a.name} (${a.craft})`).join(', ')}.`
    : 'Astronaut data is not yet loaded.';

  const newsInfo = newsHeadlines?.length
    ? `${newsCount} news articles are loaded. Top headlines:\n${newsHeadlines.slice(0, 8).map((h, i) => `${i + 1}. ${h}`).join('\n')}`
    : 'News articles have not been loaded yet.';

  return `You are a smart assistant embedded in the "Real-Time ISS & AI News Dashboard".
Your ONLY knowledge source is the live dashboard data shown below. 
Do NOT use any outside knowledge, assumptions, or make things up.
If the user asks something not answerable from the data, respond exactly: "I don't know from current dashboard data."
Keep answers concise and helpful.

=== LIVE DASHBOARD DATA ===
[ISS TRACKING]
${issInfo}

[CREW IN SPACE]
${astroInfo}

[NEWS]
${newsInfo}
===========================`;
}
