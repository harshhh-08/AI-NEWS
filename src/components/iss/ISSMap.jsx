import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { useISS } from '../../context/ISSContext';
import { SkeletonMap } from '../ui/Skeleton';
import L from 'leaflet';
import { useEffect } from 'react';

// Custom ISS SVG marker
const issIcon = L.divIcon({
  className: '',
  html: `
    <div style="position:relative;width:40px;height:40px;">
      <div style="
        position:absolute;inset:0;border-radius:50%;
        background:rgba(0,212,255,0.15);
        border:2px solid rgba(0,212,255,0.6);
        animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;
      "></div>
      <div style="
        position:absolute;inset:8px;border-radius:50%;
        background:linear-gradient(135deg,#00d4ff,#a855f7);
        display:flex;align-items:center;justify-content:center;
        font-size:14px;box-shadow:0 0 12px rgba(0,212,255,0.6);
      ">🛸</div>
    </div>
    <style>
      @keyframes ping {
        75%,100% { transform:scale(2); opacity:0; }
      }
    </style>
  `,
  iconSize:   [40, 40],
  iconAnchor: [20, 20],
});

/** Smoothly pan map to new ISS position */
function MapPanner({ lat, lon }) {
  const map = useMap();
  useEffect(() => {
    if (lat != null && lon != null) {
      map.flyTo([lat, lon], map.getZoom(), { duration: 1.5 });
    }
  }, [lat, lon, map]);
  return null;
}

export default function ISSMap() {
  const { position, trail, loading } = useISS();

  if (loading && !position) return <SkeletonMap />;

  const center = position
    ? [position.latitude, position.longitude]
    : [0, 0];

  const trailPositions = trail.map((p) => [p.latitude, p.longitude]);

  return (
    <div className="relative w-full h-96 rounded-2xl overflow-hidden border border-white/5 shadow-card">
      <MapContainer
        center={center}
        zoom={3}
        style={{ width: '100%', height: '100%' }}
        zoomControl={true}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution=""
        />

        {/* ISS position marker */}
        {position && (
          <Marker position={[position.latitude, position.longitude]} icon={issIcon}>
            <Popup>
              <div className="text-xs space-y-1">
                <p className="font-bold text-sm">🛸 ISS Position</p>
                <p>Lat: <strong>{position.latitude.toFixed(4)}°</strong></p>
                <p>Lon: <strong>{position.longitude.toFixed(4)}°</strong></p>
                <p>Updated: {new Date(position.timestamp * 1000).toUTCString()}</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Trajectory trail */}
        {trailPositions.length > 1 && (
          <Polyline
            positions={trailPositions}
            pathOptions={{
              color:     '#00d4ff',
              weight:    2,
              opacity:   0.7,
              dashArray: '6 4',
            }}
          />
        )}

        {/* Auto-pan on position update */}
        {position && <MapPanner lat={position.latitude} lon={position.longitude} />}
      </MapContainer>

      {/* Overlay label */}
      <div className="absolute top-3 left-3 z-[999] glass px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs">
        <div className="pulse-dot" />
        <span className="text-slate-300 font-medium">LIVE TRACKING</span>
      </div>
    </div>
  );
}
