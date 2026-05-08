import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Satellite, Newspaper } from 'lucide-react';

const NAV = [
  { to: '/',     icon: LayoutDashboard, label: 'Overview'  },
  { to: '/iss',  icon: Satellite,       label: 'ISS'        },
  { to: '/news', icon: Newspaper,       label: 'News'       },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 lg:hidden glass border-t border-white/10 flex">
      {NAV.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center py-3 gap-1 text-xs font-medium transition-all duration-200 ${
              isActive ? 'text-neon-blue' : 'text-slate-500 hover:text-slate-300'
            }`
          }
        >
          <Icon size={20} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
