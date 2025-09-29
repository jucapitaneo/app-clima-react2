import React, { useState } from 'react';
import SearchBar from '../molecules/SearchBar';
import WeatherSummaryCard from '../molecules/WeatherSummaryCard';
import { getCurrentWeather } from '../../api&cache/openMeteo.service';
import { readCache, saveCache, addFavoriteCity, getFavoriteCities } from '../../api&cache/storage.service';

export default function WeatherPanel() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(getFavoriteCities());

  async function handleSearch(city) {
    setLoading(true);
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pt&format=json`
      );
      const geo = await geoRes.json();
      if (!geo.results || geo.results.length === 0) {
        alert('Cidade não encontrada');
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country } = geo.results[0];

      const cached = readCache(city);
      if (cached) {
        setWeather(cached);
        setLoading(false);
        return;
      }

      const w = await getCurrentWeather(latitude, longitude);
      const merged = { ...w, city: name, country };

      setWeather(merged);
      saveCache(city, merged);
    } catch (err) {
      alert('Erro ao buscar dados: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleFavorite() {
    if (!weather) return;
    addFavoriteCity(weather.city);
    setFavorites(getFavoriteCities());
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className="mt-4">
        {loading && <div>Carregando...</div>}
        {!loading && weather && <WeatherSummaryCard weather={weather} />}
      </div>

      <div className="mt-4 flex gap-2">
        <button className="px-3 py-2 bg-yellow-500 rounded" onClick={handleFavorite} disabled={!weather}>
          Favoritar cidade
        </button>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold">Favoritos</h3>
        <ul className="mt-2">
          {favorites.length === 0 && <li className="text-sm text-gray-500">Nenhuma cidade favoritada</li>}
          {favorites.map(c => <li key={c} className="py-1">{c}</li>)}
        </ul>
      </div>
    </div>
  );
}