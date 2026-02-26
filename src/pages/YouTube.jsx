import { useState } from 'react'
import Loader from '../components/Loader'
import Card from '../components/Card'
import { searchYouTube } from '../services/youtubeApi'

export default function YouTube() {
  const [query, setQuery] = useState('')
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query) return
    setLoading(true)
    setError('')
    try {
      const result = await searchYouTube(query)
      setVideos(result)
    } catch {
      setError('Failed to fetch videos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container fade-in">
      <h2 className="my-4">YouTube Search</h2>
      <form onSubmit={handleSearch} className="d-flex mb-3">
        <input
          className="form-control me-2"
          type="text"
          placeholder="Search YouTube"
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
        {videos.map((item) => (
          <div className="col-12 col-md-6 col-lg-4" key={item.id.videoId}>
            <a
              href={`https://youtu.be/${item.id.videoId}`}
              target="_blank"
              rel="noreferrer"
              className="text-decoration-none text-dark"
            >
              <Card
                title={item.snippet.title}
                description={item.snippet.channelTitle}
                image={item.snippet.thumbnails?.medium.url}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
