import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import {
  fetchTrendingMovies,
  searchMovies,
  getPosterUrl,
  fetchMovieDetails,
} from '../services/movieApi';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [modalMovie, setModalMovie] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchTrendingMovies()
      .then(setMovies)
      .catch(() => setError('Failed to load trending movies'))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    setError('');
    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch {
      setError('Failed to search movies');
    } finally {
      setLoading(false);
    }
  };

  const openModal = async (movie) => {
    setSelected(movie);
    setModalLoading(true);
    setModalError('');
    try {
      const details = await fetchMovieDetails(movie.id);
      setModalMovie(details);
    } catch {
      setModalError('Failed to load movie details');
    } finally {
      setModalLoading(false);
    }
  };

  const closeModal = () => {
    setSelected(null);
    setModalMovie(null);
    setModalError('');
  };

  return (
    <div className="container fade-in">
      <h2 className="my-4">Trending Movies</h2>
      <form onSubmit={handleSearch} className="d-flex mb-4">
        <input
          className="form-control me-2"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </form>
      {loading && <Loader />}
      {error && <p className="text-danger">{error}</p>}
      <div className="row g-4">
        {movies.map((movie) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={movie.id}>
            <div
              className="card h-100 movie-card"
              style={{ cursor: 'pointer' }}
              onClick={() => openModal(movie)}
            >
              <img
                src={getPosterUrl(movie.poster_path)}
                className="card-img-top"
                alt={movie.title}
                style={{ height: 350, objectFit: 'cover', background: '#222' }}
              />
              <div className="card-body">
                <h5 className="card-title" style={{ minHeight: 48 }}>{movie.title}</h5>
                <p className="card-text mb-1">
                  <strong>Rating:</strong> {movie.vote_average}
                </p>
                <p className="card-text">
                  <strong>Release:</strong> {movie.release_date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: 'block', background: 'rgba(0,0,0,0.7)' }}
          onClick={closeModal}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content bg-dark text-light">
              <div className="modal-header border-0">
                <h5 className="modal-title">{modalMovie?.title || selected.title}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                {modalLoading && <Loader />}
                {modalError && <p className="text-danger">{modalError}</p>}
                {modalMovie && (
                  <>
                    <img
                      src={getPosterUrl(modalMovie.backdrop_path || modalMovie.poster_path)}
                      alt={modalMovie.title}
                      className="img-fluid mb-3"
                      style={{ borderRadius: 10, width: '100%', maxHeight: 400, objectFit: 'cover' }}
                    />
                    <p><strong>Overview:</strong> {modalMovie.overview}</p>
                    <p><strong>Rating:</strong> {modalMovie.vote_average}</p>
                    <p><strong>Release Date:</strong> {modalMovie.release_date}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
