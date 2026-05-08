/**
 * Haversine formula — calculates distance between two lat/lng points (km)
 * and derives speed (km/h) given a time delta in seconds.
 */

const R = 6371; // Earth radius in km

/** Convert degrees to radians */
const toRad = (deg) => (deg * Math.PI) / 180;

/**
 * Distance between two coordinates in kilometres.
 * @param {number} lat1
 * @param {number} lon1
 * @param {number} lat2
 * @param {number} lon2
 * @returns {number} distance in km
 */
export function haversineDistance(lat1, lon1, lat2, lon2) {
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Speed in km/h given two positions and the elapsed seconds.
 * @param {number} lat1
 * @param {number} lon1
 * @param {number} lat2
 * @param {number} lon2
 * @param {number} deltaSeconds
 * @returns {number} speed in km/h
 */
export function calculateSpeed(lat1, lon1, lat2, lon2, deltaSeconds) {
  if (!deltaSeconds || deltaSeconds <= 0) return 27600; // ISS nominal speed fallback
  const dist = haversineDistance(lat1, lon1, lat2, lon2);
  return (dist / deltaSeconds) * 3600;
}
