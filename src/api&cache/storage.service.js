const FAVORITES_KEY = 'climaflow:favorites';
const CACHE_PREFIX = 'climaflow:cache:';

export function getFavoriteCities() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
  } catch { return []; }
}

export function addFavoriteCity(cityName) {
  const arr = getFavoriteCities();
  if (!arr.includes(cityName)) {
    arr.push(cityName);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(arr));
  }
}

export function removeFavoriteCity(cityName) {
  const arr = getFavoriteCities().filter(c => c !== cityName);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(arr));
}

export function saveCache(cityName, payload) {
  const key = CACHE_PREFIX + cityName.toLowerCase();
  localStorage.setItem(key, JSON.stringify({ ts: Date.now(), payload }));
}

export function readCache(cityName, maxAgeMs = 5*60*1000) {
  const key = CACHE_PREFIX + cityName.toLowerCase();
  try {
    const raw = JSON.parse(localStorage.getItem(key) || 'null');
    if (!raw) return null;
    if (Date.now() - raw.ts > maxAgeMs) {
      localStorage.removeItem(key);
      return null;
    }
    return raw.payload;
  } catch {
    return null;
  }
}