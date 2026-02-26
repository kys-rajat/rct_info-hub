const API_KEY = '2c4a525dd580a659e5aa507659a16c3d';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

export function getPosterUrl(path) {
  return path ? `${IMG_BASE}${path}` : '';
}

export async function fetchTrendingMovies() {
  const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
  if (!res.ok) throw new Error('Failed to fetch trending movies');
  const data = await res.json();
  return data.results || [];
}

export async function searchMovies(query) {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Failed to search movies');
  const data = await res.json();
  return data.results || [];
}

export async function fetchMovieDetails(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  if (!res.ok) throw new Error('Failed to fetch movie details');
  return res.json();
}
