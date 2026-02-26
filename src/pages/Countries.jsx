import { useState, useEffect } from 'react'
import Loader from '../components/Loader'
import Card from '../components/Card'
import { fetchCountries, fetchCities } from '../services/countryApi'

export default function Countries() {
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState([])
  const [query, setQuery] = useState('')
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [citiesLoading, setCitiesLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const list = await fetchCountries()
        setCountries(list)
        setFiltered(list)
      } catch (err) {
        setError('Unable to load countries')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase()
    setQuery(term)
    setFiltered(
      countries.filter((c) => c.name.toLowerCase().includes(term)),
    )
    setCities([])
    setError('')
  }

  const handleClick = async (code) => {
    setCities([])
    setCitiesLoading(true)
    setError('')
    try {
      const data = await fetchCities(code)
      setCities(data)
    } catch {
      setError('Failed to load cities')
    } finally {
      setCitiesLoading(false)
    }
  }

  return (
    <div className="container fade-in">
      <h2 className="my-4">Countries</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search countries..."
          value={query}
          onChange={handleSearch}
        />
      </div>
      {loading && <Loader />}
      {error && <p className="text-danger">{error}</p>}
      <div className="row g-3">
        {filtered.map((c) => (
          <div className="col-12 col-md-6 col-lg-4" key={c.code}>
            <div
              className="card h-100"
              onClick={() => handleClick(c.code, c.name)}
            >
              <div className="card-body">
                <h5 className="card-title">{c.name}</h5>
                <p className="card-text">Code: {c.code}</p>
                <p className="card-text">
                  Population: {c.population ? c.population.toLocaleString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {citiesLoading && <Loader />}
      {cities.length > 0 && (
        <div className="mt-4">
          <h3>Major cities</h3>
          <div className="row g-3">
            {cities.map((city) => (
              <div
                className="col-12 col-md-6 col-lg-4"
                key={city.id || city.name}
              >
                <Card
                  title={city.name}
                  description={`Population: ${city.population ? city.population.toLocaleString() : 'N/A'}`}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
