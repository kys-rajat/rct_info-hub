import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Weather from './pages/Weather'
import Cuisine from './pages/Cuisine'
import YouTube from './pages/YouTube'
import Movies from './pages/Movies'
import ErrorBoundary from './components/ErrorBoundary'
import './assets/styles.css'

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Navbar />
        <div className="scroll-container">
          <div className="scroll-text">
            🌟 Welcome to InfoHub Dashboard 🌟 Get Real-time Weather Updates 🌦️ Explore Delicious Recipes 🍽️ Search YouTube Videos 🎬 Discover Countries & Cities 🌏 Build Your Knowledge 📚 Learn Something New Every Day 🚀 
            🌟 Welcome to InfoHub Dashboard 🌟 Get Real-time Weather Updates 🌦️ Explore Delicious Recipes 🍽️ Search YouTube Videos 🎬 Discover Countries & Cities 🌏 Build Your Knowledge 📚 Learn Something New Every Day 🚀
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/cuisine" element={<Cuisine />} />
          <Route path="/youtube" element={<YouTube />} />
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}
