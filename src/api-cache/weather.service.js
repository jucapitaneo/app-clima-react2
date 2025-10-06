import { readCache, saveCache } from "./storage.service";
import { getCoordinates } from "./geocoding.service";
import { getCurrentWeather } from "./openMeteo.service";

export async function fetchWeather(city, setError, setLoading, setWeather) {
  try{
    const cached = readCache(city);
      if (cached) {
        setWeather(cached);
        setLoading(false);
        return;
      }

    const coords = await getCoordinates(city, setError, setLoading);
    if (!coords) return;

      const { latitude, longitude, name, country } = coords;

      const w = await getCurrentWeather(latitude, longitude);
      const merged = { ...w, city: name, country };
      saveCache(city, merged);

      return merged
    } catch (err) {
      setError('Erro ao buscar dados: ' + err.message);
    } finally {
      setLoading(false);
    }
  }