import { useState } from 'react'
import Loader from '../components/Loader'
import Card from '../components/Card'
import { searchCuisine } from '../services/recipeApi'

export default function Cuisine() {
  const [query, setQuery] = useState('')
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query) return
    setLoading(true)
    setError('')
    try {
      const results = await searchCuisine(query)
      setMeals(results)
    } catch {
      setError('Failed to fetch cuisine')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container fade-in">
      <h2 className="my-4">Cuisine</h2>
      <form onSubmit={handleSearch} className="d-flex mb-3">
        <input
          className="form-control me-2"
          type="text"
          placeholder="Search meals"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </form>
      {loading && <Loader />}
      {error && <p className="text-danger">{error}</p>}
      <div className="row g-3">
        {meals.map((meal) => (
          <div className="col-12 col-md-6 col-lg-4" key={meal.idMeal}>
            <Card
              title={meal.strMeal}
              description={meal.strCategory}
              image={meal.strMealThumb}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
