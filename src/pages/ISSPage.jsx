import ISSMap from '../components/iss/ISSMap';
import ISSStats from '../components/iss/ISSStats';
import AstronautList from '../components/iss/AstronautList';
import SpeedChart from '../components/charts/SpeedChart';
import { Satellite } from 'lucide-react';

export default function ISSPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-xl bg-neon-blue/10 flex items-center justify-center">
            <Satellite size={17} className="text-neon-blue" />
          </div>
          <h1 className="text-xl font-bold text-white">ISS Live Tracker</h1>
          <span className="text-xs bg-neon-green/10 border border-neon-green/30 text-neon-green px-2.5 py-0.5 rounded-full font-mono">
            LIVE
          </span>
        </div>
        <p className="text-sm text-slate-500 ml-11">
          Real-time position, speed, and crew — updated every 15 seconds.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <ISSStats />
      </div>

      {/* Map */}
      <ISSMap />

      {/* Charts + Astronauts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SpeedChart />
        <AstronautList />
      </div>
    </div>
  );
}
