import { useState } from 'react'
import Loader from '../components/Loader'
import Card from '../components/Card'
import { getWeather } from '../services/weatherApi'

export default function Weather() {
  const [city, setCity] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e) => {
    e.preventDefault()
    setError('')
    if (!city) return
    setLoading(true)
    try {
      const result = await getWeather(city)
      setData(result)
    } catch {
      setError('Failed to fetch weather')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container fade-in">
      <h2 className="my-4">Weather</h2>
      <form onSubmit={handleSearch} className="d-flex mb-3 gap-2">
        <input
          className="form-control"
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </form>
      {loading && <Loader />}
      {error && <p className="text-danger">{error}</p>}
      {data && (
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <div className="card shadow-lg">
              <div className="card-body">
                <h5 className="card-title">
                  {data.name}, {data.country}
                </h5>
                <div className="row align-items-center">
                  <div className="col-6">
                    <h2 style={{ color: '#00d4ff', marginBottom: '10px' }}>
                      {Math.round(data.main.temp)}°C
                    </h2>
                    <p className="card-text mb-2">
                      <strong>Condition:</strong> {data.weather[0].main}
                    </p>
                  </div>
                  <div className="col-6 text-center">
                    <div style={{ fontSize: '4rem' }}>
                      {data.weather[0].main.includes('Clear') && '☀️'}
                      {data.weather[0].main.includes('cloud') && '☁️'}
                      {data.weather[0].main.includes('rain') && '🌧️'}
                      {data.weather[0].main.includes('snow') && '❄️'}
                      {data.weather[0].main.includes('Fog') && '🌫️'}
                      {data.weather[0].main.includes('Thunder') && '⛈️'}
                      {!['Clear', 'cloud', 'rain', 'snow', 'Fog', 'Thunder'].some(w => data.weather[0].main.includes(w)) && '🌤️'}
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-6">
                    <p className="card-text">
                      <strong>Humidity:</strong> {data.main.humidity}%
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="card-text">
                      <strong>Wind Speed:</strong> {Math.round(data.wind.speed)} km/h
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
