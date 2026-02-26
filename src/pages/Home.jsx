import { Link } from 'react-router-dom'

export default function Home() {
  const cards = [
    { title: 'Weather', path: '/weather', icon: '🌤️' },
    { title: 'Cuisine', path: '/cuisine', icon: '🍳' },
    { title: 'YouTube', path: '/youtube', icon: '📹' },
    { title: 'Movies', path: '/movies', icon: '🎬' }
  ]

  return (
    <div>
      <header className="hero text-white text-center d-flex align-items-center justify-content-center">
        <div className="hero-overlay"></div>
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">
            InfoHub Dashboard
          </h1>
          <p className="lead mb-4">
            Build responsive demos quickly – weather, recipes, videos and global data in one place.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/weather" className="btn btn-primary btn-lg">
              Get Started
            </Link>
            <Link to="/youtube" className="btn btn-outline-light btn-lg">
              Explore YouTube
            </Link>
          </div>
        </div>
      </header>
      <div className="container mt-5 mb-5">
        <div className="row g-4">
          {cards.map((c) => (
            <div className="col-12 col-md-6 col-lg-3" key={c.title}>
              <Link to={c.path} className="text-decoration-none">
                <div className="card feature-card">
                  <div className="card-body text-center">
                    <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{c.icon}</div>
                    <h5 className="card-title">{c.title}</h5>
                    <p className="card-text mt-3">
                      {c.title === 'Weather' && 'Check weather conditions worldwide'}
                      {c.title === 'Cuisine' && 'Discover delicious cuisine'}
                      {c.title === 'YouTube' && 'Search videos and content'}
                      {c.title === 'Movies' && 'See trending and search movies'}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
