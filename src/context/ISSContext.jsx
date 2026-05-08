import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { fetchISSPosition, fetchAstronauts } from '../services/issService';
import { calculateSpeed } from '../utils/haversine';
import toast from 'react-hot-toast';

// ── Context ────────────────────────────────────────────
export const ISSContext = createContext(null);

const REFRESH_INTERVAL  = 15000; // 15 seconds
const MAX_TRAIL         = 15;
const MAX_SPEED_HISTORY = 30;

// ── Provider ───────────────────────────────────────────
export function ISSProvider({ children }) {
  const [position, setPosition]         = useState(null);
  const [trail, setTrail]               = useState([]);
  const [speed, setSpeed]               = useState(null);
  const [speedHistory, setSpeedHistory] = useState([]);
  const [astronauts, setAstronauts]     = useState(null);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [lastUpdated, setLastUpdated]   = useState(null);
  const prevPositionRef                 = useRef(null);
  const prevTimestampRef                = useRef(null);

  const fetchPosition = useCallback(async () => {
    try {
      const data = await fetchISSPosition();
      const { latitude, longitude, timestamp } = data;

      let spd = 27600; // ISS nominal fallback
      if (prevPositionRef.current && prevTimestampRef.current) {
        const delta = timestamp - prevTimestampRef.current;
        spd = calculateSpeed(
          prevPositionRef.current.latitude,
          prevPositionRef.current.longitude,
          latitude,
          longitude,
          delta
        );
        spd = Math.max(25000, Math.min(30000, spd));
      }

      prevPositionRef.current  = { latitude, longitude };
      prevTimestampRef.current = timestamp;

      setPosition({ latitude, longitude, timestamp });
      setSpeed(spd);
      setTrail((prev) => [...prev, { latitude, longitude, timestamp }].slice(-MAX_TRAIL));
      setSpeedHistory((prev) => [
        ...prev,
        { time: new Date(timestamp * 1000).toLocaleTimeString(), speed: Math.round(spd) },
      ].slice(-MAX_SPEED_HISTORY));
      setLastUpdated(new Date());
      setError(null);
      setLoading(false);
    } catch (err) {
      console.error('ISS fetch error:', err);
      setError(err.message || 'Failed to fetch ISS data');
      setLoading(false);
      toast.error('ISS data fetch failed — retrying soon');
    }
  }, []);

  const fetchAstros = useCallback(async () => {
    try {
      const data = await fetchAstronauts();
      setAstronauts(data);
    } catch (err) {
      console.error('Astronaut fetch error:', err);
    }
  }, []);

  useEffect(() => {
    fetchPosition();
    fetchAstros();
  }, [fetchPosition, fetchAstros]);

  useEffect(() => {
    const id = setInterval(fetchPosition, REFRESH_INTERVAL);
    return () => clearInterval(id);
  }, [fetchPosition]);

  const refresh = useCallback(() => {
    setLoading(true);
    fetchPosition();
    fetchAstros();
  }, [fetchPosition, fetchAstros]);

  return (
    <ISSContext.Provider value={{
      position, trail, speed, speedHistory,
      astronauts, loading, error, lastUpdated,
      refresh,
    }}>
      {children}
    </ISSContext.Provider>
  );
}

// ── Hook ───────────────────────────────────────────────
export function useISS() {
  return useContext(ISSContext);
}
