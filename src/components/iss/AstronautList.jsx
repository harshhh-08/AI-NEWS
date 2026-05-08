import { useISS } from '../../context/ISSContext';
import { User, Rocket } from 'lucide-react';

export default function AstronautList() {
  const { astronauts, loading } = useISS();

  if (loading && !astronauts) {
    return (
      <div className="glass p-5 rounded-2xl space-y-3">
        <div className="skeleton h-5 w-40 rounded" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="skeleton h-10 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (!astronauts?.people?.length) return null;

  const crafts = [...new Set(astronauts.people.map((p) => p.craft))];

  return (
    <div className="glass p-5 rounded-2xl border border-white/5 space-y-4">
      <div className="flex items-center gap-2">
        <Rocket size={16} className="text-neon-purple" />
        <h3 className="text-sm font-semibold text-white">People in Space</h3>
        <span className="ml-auto text-xs bg-neon-purple/10 border border-neon-purple/30 text-neon-purple px-2 py-0.5 rounded-full">
          {astronauts.number} total
        </span>
      </div>

      {crafts.map((craft) => (
        <div key={craft}>
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">{craft}</p>
          <div className="grid grid-cols-1 gap-2">
            {astronauts.people
              .filter((p) => p.craft === craft)
              .map((person) => (
                <div
                  key={person.name}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/3 border border-white/5 hover:border-neon-purple/20 transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-neon-purple/10 flex items-center justify-center">
                    <User size={12} className="text-neon-purple" />
                  </div>
                  <span className="text-sm text-slate-200">{person.name}</span>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
