import { fetchCities } from './src/services/countryApi.js';

;(async () => {
  try {
    const data = await fetchCities('US')
    console.log(data.slice(0, 3))
  } catch (e) {
    console.error('error', e.message)
  }
})()
