/**
 * Stat card with icon, label, value, and optional accent colour.
 */
export default function StatCard({ icon: Icon, label, value, sub, accent = 'blue', className = '' }) {
  const accents = {
    blue:   { border: 'border-neon-blue/20',   icon: 'text-neon-blue',   glow: 'neon-glow-blue'   },
    green:  { border: 'border-neon-green/20',  icon: 'text-neon-green',  glow: 'neon-glow-green'  },
    purple: { border: 'border-neon-purple/20', icon: 'text-neon-purple', glow: 'neon-glow-purple' },
    pink:   { border: 'border-pink-500/20',    icon: 'text-pink-400',    glow: ''                 },
  };
  const a = accents[accent] || accents.blue;

  return (
    <div className={`stat-card border ${a.border} ${className}`}>
      <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${a.glow}`}>
        {Icon && <Icon size={20} className={a.icon} />}
      </div>
      <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">{label}</p>
      <p className="text-white text-2xl font-bold font-mono">{value ?? '—'}</p>
      {sub && <p className="text-slate-500 text-xs">{sub}</p>}
    </div>
  );
}
