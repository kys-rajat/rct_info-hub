export async function searchCuisine(query) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
    query,
  )}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Network response was not ok')
  const data = await res.json()
  return data.meals || []
}
