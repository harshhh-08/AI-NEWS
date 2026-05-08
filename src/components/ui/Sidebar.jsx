import { NavLink } from 'react-router-dom';
import { Satellite, Newspaper, LayoutDashboard, X } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';

const NAV = [
  { to: '/',      icon: LayoutDashboard, label: 'Overview'  },
  { to: '/iss',   icon: Satellite,       label: 'ISS Tracker' },
  { to: '/news',  icon: Newspaper,       label: 'News Feed'   },
];

export default function Sidebar({ mobileOpen, onClose }) {
  return (
    <>
      {/* ── Backdrop (mobile) ─────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* ── Sidebar panel ─────────────────────────────── */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-40 flex flex-col glass border-r border-white/5
          transition-transform duration-300
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto lg:flex`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-6 border-b border-white/5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center shadow-neon-blue">
            <Satellite size={18} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-none">ISS Dashboard</p>
            <p className="text-xs text-slate-500 mt-0.5">Live Space Data</p>
          </div>
          {/* Mobile close */}
          <button onClick={onClose} className="ml-auto text-slate-500 hover:text-white lg:hidden">
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <p className="text-[10px] text-slate-600 uppercase tracking-widest px-3 mb-3">Main Menu</p>
          {NAV.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `sidebar-item ${isActive ? 'active' : ''}`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-white/5 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">FOAI End Sem</p>
            <p className="text-[10px] text-slate-600 mt-0.5">Real-Time Dashboard</p>
          </div>
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
}
