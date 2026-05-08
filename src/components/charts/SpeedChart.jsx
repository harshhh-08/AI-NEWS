import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart,
} from 'recharts';
import { useISS } from '../../context/ISSContext';
import { Activity } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass px-3 py-2 rounded-xl border border-neon-blue/30 text-xs">
      <p className="text-slate-400 mb-1">{label}</p>
      <p className="text-neon-blue font-bold">{payload[0]?.value?.toLocaleString()} km/h</p>
    </div>
  );
};

export default function SpeedChart() {
  const { speedHistory } = useISS();

  if (!speedHistory?.length) {
    return (
      <div className="glass p-5 rounded-2xl border border-white/5 h-56 flex items-center justify-center">
        <p className="text-slate-500 text-sm">Collecting speed data…</p>
      </div>
    );
  }

  return (
    <div className="glass p-5 rounded-2xl border border-white/5 space-y-4">
      <div className="flex items-center gap-2">
        <Activity size={16} className="text-neon-blue" />
        <h3 className="text-sm font-semibold text-white">ISS Speed</h3>
        <span className="text-xs text-slate-500">Last {speedHistory.length} readings</span>
        {speedHistory.length > 0 && (
          <span className="ml-auto text-neon-blue font-mono text-sm font-bold">
            {speedHistory[speedHistory.length - 1]?.speed?.toLocaleString()} km/h
          </span>
        )}
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={speedHistory} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="speedGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#00d4ff" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}   />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="time"
            tick={{ fill: '#64748b', fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={['auto', 'auto']}
            tick={{ fill: '#64748b', fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="speed"
            stroke="#00d4ff"
            strokeWidth={2}
            fill="url(#speedGrad)"
            dot={false}
            activeDot={{ r: 4, fill: '#00d4ff', strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
