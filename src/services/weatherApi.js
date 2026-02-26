const KEY = import.meta.env.VITE_OPENWEATHER_KEY
const BASE = 'https://api.openweathermap.org/data/2.5/weather'

export async function getWeather(city) {
  try {
    const url = `${BASE}?q=${encodeURIComponent(city)}&appid=${KEY}&units=metric`
    const res = await fetch(url)
    if (!res.ok) throw new Error('City not found')
    return res.json()
  } catch (err) {
    throw new Error('Failed to fetch weather: ' + err.message)
  }
}


