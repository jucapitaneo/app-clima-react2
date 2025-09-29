import axios from 'axios';

const BASE = 'https://api.open-meteo.com/v1';

export async function getCurrentWeather(lat, lon) {
  const res = await axios.get(`${BASE}/forecast`, {
    params: {
      latitude: lat,
      longitude: lon,
      current_weather: true,
      timezone: 'America/Sao_Paulo'
    }
  });
  return res.data; 
}

export async function getHourlyWeather(lat, lon) {
  const res = await axios.get(`${BASE}/forecast`, {
    params: {
      latitude: lat,
      longitude: lon,
      hourly: 'temperature_2m,relative_humidity_2m,windspeed_10m',
      timezone: 'America/Sao_Paulo'
    }
  });
  return res.data;
}

export async function getDailyWeather(lat, lon) {
  const res = await axios.get(`${BASE}/forecast`, {
    params: {
      latitude: lat,
      longitude: lon,
      daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum',
      timezone: 'America/Sao_Paulo'
    }
  });
  return res.data;
}