const API_URL = import.meta.env.VITE_GEOCODING_API;

export async function getCoordinates(city, setError, setLoading) {
  const geoRes = await fetch(
    `${API_URL}?name=${encodeURIComponent(city)}&count=1&language=pt&format=json`
  );
  const geo = await geoRes.json();
  if (!geo.results || geo.results.length === 0) {
    setError('Cidade não encontrada.');
    setLoading(false);
    return;
  }

  const { latitude, longitude, name, country } = geo.results[0];
  return { latitude, longitude, name, country }
}