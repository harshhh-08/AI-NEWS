import { useISS } from '../context/ISSContext';
import { useNews } from '../context/NewsContext';
import StatCard from '../components/ui/StatCard';
import ISSMap from '../components/iss/ISSMap';
import SpeedChart from '../components/charts/SpeedChart';
import NewsCategoryChart from '../components/charts/NewsCategoryChart';
import NewsCard from '../components/news/NewsCard';
import { SkeletonNewsCard } from '../components/ui/Skeleton';
import {
  Satellite, Gauge, Users, Newspaper,
  MapPin, TrendingUp, Globe2,
} from 'lucide-react';
import { useEffect } from 'react';

export default function OverviewPage() {
  const { position, speed, astronauts, loading: issLoading } = useISS();
  const { articles, loading: newsLoading, hasFetched, loadNews } = useNews();

  useEffect(() => {
    if (!hasFetched) loadNews();
  }, [hasFetched, loadNews]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero header */}
      <div className="relative glass rounded-2xl p-6 border border-white/5 overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)' }}
        />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <div className="pulse-dot" />
            <span className="text-xs text-neon-green font-mono font-semibold tracking-widest">LIVE DASHBOARD</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            Real-Time ISS &amp; AI News{' '}
            <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-xl">
            Track the International Space Station live, explore global news, and ask the AI assistant anything about what's on screen.
          </p>
        </div>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={MapPin}
          label="Latitude"
          value={position ? `${position.latitude.toFixed(2)}°` : '—'}
          sub="ISS latitude"
          accent="blue"
        />
        <StatCard
          icon={Globe2}
          label="Longitude"
          value={position ? `${position.longitude.toFixed(2)}°` : '—'}
          sub="ISS longitude"
          accent="purple"
        />
        <StatCard
          icon={Gauge}
          label="Speed"
          value={speed ? `${Math.round(speed / 1000).toFixed(1)}k km/h` : '—'}
          sub="Orbital velocity"
          accent="green"
        />
        <StatCard
          icon={Users}
          label="In Space"
          value={astronauts?.number ?? '—'}
          sub="Crew aboard ISS"
          accent="pink"
        />
      </div>

      {/* Map + Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2">
          <ISSMap />
        </div>
        <div className="space-y-5">
          <SpeedChart />
        </div>
      </div>

      {/* News section preview */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-7 h-7 rounded-xl bg-neon-purple/10 flex items-center justify-center">
            <Newspaper size={15} className="text-neon-purple" />
          </div>
          <h2 className="text-base font-semibold text-white">Latest Headlines</h2>
          <span className="text-xs text-slate-500">({articles.length} articles loaded)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {newsLoading && !hasFetched
            ? [...Array(3)].map((_, i) => <SkeletonNewsCard key={i} />)
            : articles.slice(0, 3).map((a) => <NewsCard key={a.id} article={a} />)
          }
        </div>
      </div>

      {/* News category chart */}
      <div className="max-w-sm">
        <NewsCategoryChart />
      </div>
    </div>
  );
}
