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
      <div className="min-h-screen halftone text-white flex flex-col">
        {/* Top navigation bar */}
        <HeaderNav />
        <div className="flex-1">
          <Routes>
            {/* Search home page */}
            <Route path="/" element={<HomePage />} />
            {/* Saved list page */}
            <Route path="/my-list" element={<MyListPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
