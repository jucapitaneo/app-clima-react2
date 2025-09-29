import React from 'react';
import WeatherPanel from '../components/organisms/WeatherPanel.jsx';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <header className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold">Clima App</h1>
        <p className="text-sm text-gray-600">Tempo atual + vento (Open Meteo)</p>
      </header>

      <main className="max-w-4xl mx-auto mt-6">
        <WeatherPanel />
      </main>
    </div>
  );
}