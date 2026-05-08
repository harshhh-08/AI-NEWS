import { useISS } from '../../context/ISSContext';
import StatCard from '../ui/StatCard';
import ErrorCard from '../ui/ErrorCard';
import { SkeletonCard } from '../ui/Skeleton';
import { MapPin, Gauge, Users, Clock, RefreshCw } from 'lucide-react';

export default function ISSStats() {
  const { position, speed, astronauts, loading, error, lastUpdated, refresh } = useISS();

  if (error && !position) {
    return <ErrorCard message={error} onRetry={refresh} className="col-span-full" />;
  }

  if (loading && !position) {
    return (
      <>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </>
    );
  }

  const fmt = (n, dec = 4) => n != null ? Number(n).toFixed(dec) : '—';

  return (
    <>
      <StatCard
        icon={MapPin}
        label="Latitude"
        value={`${fmt(position?.latitude)}°`}
        sub="Current ISS latitude"
        accent="blue"
      />
      <StatCard
        icon={MapPin}
        label="Longitude"
        value={`${fmt(position?.longitude)}°`}
        sub="Current ISS longitude"
        accent="purple"
      />
      <StatCard
        icon={Gauge}
        label="Speed"
        value={speed ? `${Math.round(speed).toLocaleString()} km/h` : '—'}
        sub="Via Haversine formula"
        accent="green"
      />
      <StatCard
        icon={Users}
        label="In Space"
        value={astronauts?.number ?? '—'}
        sub={`Astronauts aboard ISS`}
        accent="pink"
      />

      {/* Last updated + manual refresh */}
      <div className="col-span-full flex items-center justify-between glass px-5 py-3 rounded-xl border border-white/5">
        <div className="flex items-center gap-2 text-slate-400 text-xs">
          <Clock size={14} />
          <span>
            Last updated:{' '}
            <span className="text-slate-200 font-mono">
              {lastUpdated ? lastUpdated.toLocaleTimeString() : '—'}
            </span>
          </span>
          <span className="text-slate-600">·</span>
          <span>Auto-refresh every 15 s</span>
        </div>
        <button
          onClick={refresh}
          disabled={loading}
          className="btn-primary flex items-center gap-2"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>
    </>
  );
}
