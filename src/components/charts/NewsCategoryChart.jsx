import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { useNews } from '../../context/NewsContext';
import { BarChart2 } from 'lucide-react';

const NEON_COLORS = ['#00d4ff', '#a855f7', '#00ff94', '#ff006e', '#ff6b35', '#fbbf24', '#34d399', '#f472b6'];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass px-3 py-2 rounded-xl border border-white/20 text-xs">
      <p className="text-white font-semibold capitalize">{payload[0]?.name}</p>
      <p className="text-slate-300">{payload[0]?.value} articles</p>
    </div>
  );
};

const CustomLegend = ({ payload, onClick, activeCategory }) => (
  <div className="flex flex-wrap justify-center gap-2 mt-3">
    {payload.map((entry, i) => (
      <button
        key={entry.value}
        onClick={() => onClick(entry.value)}
        className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs transition-all ${
          activeCategory === entry.value
            ? 'bg-white/10 border border-white/20'
            : 'opacity-60 hover:opacity-100'
        }`}
      >
        <span style={{ background: entry.color }} className="w-2.5 h-2.5 rounded-full" />
        <span className="capitalize text-slate-300">{entry.value}</span>
      </button>
    ))}
  </div>
);

export default function NewsCategoryChart() {
  const { categoryCounts, filterByCategory, activeCategory } = useNews();

  const data = Object.entries(categoryCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  if (!data.length) {
    return (
      <div className="glass p-5 rounded-2xl border border-white/5 h-72 flex items-center justify-center">
        <p className="text-slate-500 text-sm">Load news to see distribution</p>
      </div>
    );
  }

  return (
    <div className="glass p-5 rounded-2xl border border-white/5 space-y-3">
      <div className="flex items-center gap-2">
        <BarChart2 size={16} className="text-neon-purple" />
        <h3 className="text-sm font-semibold text-white">News by Category</h3>
        {activeCategory && (
          <span className="ml-auto text-xs bg-neon-purple/10 border border-neon-purple/30 text-neon-purple px-2 py-0.5 rounded-full capitalize">
            {activeCategory}
          </span>
        )}
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={NEON_COLORS[i % NEON_COLORS.length]}
                opacity={activeCategory && data[i].name !== activeCategory ? 0.35 : 1}
                style={{ cursor: 'pointer' }}
                onClick={() => filterByCategory(data[i].name)}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <CustomLegend
        payload={data.map((d, i) => ({ value: d.name, color: NEON_COLORS[i % NEON_COLORS.length] }))}
        onClick={filterByCategory}
        activeCategory={activeCategory}
      />
    </div>
  );
}
