import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Weather from './pages/Weather'
import Cuisine from './pages/Cuisine'
import YouTube from './pages/YouTube'
import Movies from './pages/Movies'
import Countries from './pages/Countries'
import ErrorBoundary from './components/ErrorBoundary'
import './assets/styles.css'

export default function App() {
  return (
    <ErrorBoundary>
      <Router basename={import.meta.env.BASE_URL}>
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
          <Route path="/countries" element={<Countries />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}
