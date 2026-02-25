import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HeaderNav from './components/HeaderNav'
import HomePage from './pages/HomePage'
import MyListPage from './pages/MyListPage'

// Root component with routing
function App() {
  return (
    <BrowserRouter>
      {/* Dark background for whole app */}
      <div className="min-h-screen bg-gray-950 text-white">
        {/* Navigation bar at top */}
        <HeaderNav />
        <Routes>
          {/* Home = search page */}
          <Route path="/" element={<HomePage />} />
          {/* My List page */}
          <Route path="/my-list" element={<MyListPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
