/**
 * localStorage helpers with JSON serialisation, TTL support, and error handling.
 */

/**
 * Save a value to localStorage (with optional TTL in ms).
 */
export function saveToStorage(key, value, ttlMs = null) {
  try {
    const payload = { value, savedAt: Date.now(), ttlMs };
    localStorage.setItem(key, JSON.stringify(payload));
  } catch (e) {
    console.warn('Storage write failed:', e);
  }
}

/**
 * Read a value from localStorage.
 * Returns null if missing, expired, or invalid.
 */
export function loadFromStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { value, savedAt, ttlMs } = JSON.parse(raw);
    if (ttlMs && Date.now() - savedAt > ttlMs) {
      localStorage.removeItem(key);
      return null;
    }
    return value;
  } catch (e) {
    console.warn('Storage read failed:', e);
    return null;
  }
}

/**
 * Remove a key from localStorage.
 */
export function removeFromStorage(key) {
  try { localStorage.removeItem(key); } catch (e) { /* ignore */ }
}

/**
 * Check if a cached entry is still valid.
 */
export function isCacheValid(key) {
  return loadFromStorage(key) !== null;
}

// Named storage keys used across the app
export const STORAGE_KEYS = {
  THEME:       'iss-dashboard-theme',
  NEWS_CACHE:  'iss-dashboard-news',
  CHAT_MSGS:   'iss-dashboard-chat',
};
