import React from 'react';

export default function WeatherSummaryCard({ weather }) {
  if (!weather) return null;

  const temp = Math.round(weather.current_weather?.temperature);
  const wind = weather.current_weather?.windspeed;
  const code = weather.current_weather?.weathercode;

  const codes = {
    0: 'Céu limpo',
    1: 'Principalmente limpo',
    2: 'Parcialmente nublado',
    3: 'Nublado',
    45: 'Névoa',
    48: 'Névoa com gelo',
    51: 'Chuvisco leve',
    61: 'Chuva leve',
    71: 'Neve leve',
    95: 'Trovoadas'
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md max-w-md">
      <h2 className="text-xl font-bold">
        {weather.city}, {weather.country}
      </h2>
      <div className="text-lg">{temp}°C — {codes[code] || 'Clima desconhecido'}</div>
      <div className="text-sm text-gray-500">Vento: {wind} km/h</div>
    </div>
  );
}