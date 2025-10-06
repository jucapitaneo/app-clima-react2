import React, { useState } from 'react';
import SearchBar from '../molecules/SearchBar';
import WeatherSummaryCard from '../molecules/WeatherSummaryCard';
import { getCurrentWeather } from '../../api-cache/openMeteo.service';
import { getCoordinates } from '@/api-cache/geocoding.service';
import { fetchWeather } from '@/api-cache/weather.service';
import { readCache, saveCache, addFavoriteCity, getFavoriteCities } from '../../api-cache/storage.service';

export default function WeatherPanel() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(getFavoriteCities());
  const [error, setError] = useState(null); 

  async function handleSearch(city) {0
    setLoading(true);
    setError(null);
    const weatherOf = await fetchWeather(city, setError, setLoading, setWeather);
    setWeather(weatherOf)
  }

  function handleFavorite() {
    if (!weather) return;
    addFavoriteCity(weather.city);
    setFavorites(getFavoriteCities());
    fetchWeather(city, setError, setLoading, setWeather)
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      <div className="mt-4">
        {loading && <div className="text-blue-500">Carregando...</div>}
        {error && (
          <div className="mt-2 p-3 rounded bg-red-100 text-red-700 border border-red-300">
            {error}
          </div>
        )}
        {!loading && weather && !error && <WeatherSummaryCard weather={weather} />}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          className="px-3 py-2 bg-yellow-500 rounded disabled:opacity-50"
          onClick={handleFavorite}
          disabled={!weather}
        >
          Favoritar cidade
        </button>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold">Favoritos</h3>
        <ul className="mt-2">
          {favorites.length === 0 && (
            <li className="text-sm text-gray-500">Nenhuma cidade favoritada</li>
          )}
          {favorites.map((c) => (
            <li key={c} className="py-1">{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
