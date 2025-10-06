export async function getCoordinates(city, setError, setLoading) {
  const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pt&format=json`
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