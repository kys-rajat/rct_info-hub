const BASE = 'https://wft-geo-db.p.rapidapi.com/v1/geo'
const RAPID_KEY = 'bb177be0ccmsh4dc21f5df856375p1cd752jsn37fb34f1ec44'

const headers = {
  'X-RapidAPI-Key': RAPID_KEY,
  'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
}

export async function fetchCountries() {
  const res = await fetch(`${BASE}/countries`, { headers })
  if (!res.ok) throw new Error('Failed to load countries')
  const data = await res.json()
  return data.data
}

export async function fetchCities(code) {
  const res = await fetch(`${BASE}/cities?countryIds=${encodeURIComponent(code)}`, { headers })
  if (!res.ok) throw new Error('Failed to load cities')
  const data = await res.json()
  return data.data
}
