import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HeaderNav from './components/HeaderNav'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import MyListPage from './pages/MyListPage'

// Main app routes
function App() {
  return (
    <BrowserRouter>
      {/* Full app background */}
      <div className="min-h-screen halftone text-white">
        {/* Top navigation bar */}
        <HeaderNav />
        <Routes>
          {/* Search home page */}
          <Route path="/" element={<HomePage />} />
          {/* Saved list page */}
          <Route path="/my-list" element={<MyListPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
