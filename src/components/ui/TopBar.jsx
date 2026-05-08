import { Menu, Bell } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useISS } from '../../context/ISSContext';

export default function TopBar({ onMenuOpen }) {
  const { position } = useISS();

  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 px-5 py-3.5 glass border-b border-white/5">
      {/* Hamburger (mobile) */}
      <button
        id="mobile-menu-btn"
        onClick={onMenuOpen}
        className="w-9 h-9 rounded-xl glass flex items-center justify-center lg:hidden hover:border-neon-blue/30 transition-all"
      >
        <Menu size={18} className="text-slate-400" />
      </button>

      {/* Title area */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <div className="pulse-dot" />
          <span className="text-xs text-neon-green font-mono">LIVE</span>
          {position && (
            <span className="text-xs text-slate-500 font-mono hidden sm:inline">
              ISS @ {position.latitude.toFixed(2)}°, {position.longitude.toFixed(2)}°
            </span>
          )}
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  );
}
