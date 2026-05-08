import axios from 'axios';

// Use Vite proxy in dev → avoids CORS / HTTP mixed-content issues in the browser.
// In production, point these to a backend proxy or a CORS-friendly wrapper.
const ISS_POSITION_URL = '/proxy/iss-now';
const ASTRONAUTS_URL   = '/proxy/astros';

/**
 * Fetch current ISS position.
 * @returns {{ latitude: number, longitude: number, timestamp: number }}
 */
export async function fetchISSPosition() {
  const { data } = await axios.get(ISS_POSITION_URL, { timeout: 10000 });
  return {
    latitude:  parseFloat(data.iss_position.latitude),
    longitude: parseFloat(data.iss_position.longitude),
    timestamp: data.timestamp,
  };
}

/**
 * Fetch list of astronauts currently in space.
 * @returns {{ number: number, people: Array<{name:string, craft:string}> }}
 */
export async function fetchAstronauts() {
  const { data } = await axios.get(ASTRONAUTS_URL, { timeout: 10000 });
  return { number: data.number, people: data.people };
}
