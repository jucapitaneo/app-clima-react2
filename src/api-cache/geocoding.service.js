const GEOCODING_API= 'https://geocoding-api.open-meteo.com/v1/search'

export async function getCoordinates(city, setError, setLoading) {
  const geoRes = await fetch(
    `${GEOCODING_API}?name=${encodeURIComponent(city)}&count=1&language=pt&format=json`
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