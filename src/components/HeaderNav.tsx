import { NavLink } from 'react-router-dom'

// Nav link text style
const link = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'text-indigo-400 font-semibold'
    : 'text-gray-300 hover:text-white transition-colors'

// Top app navigation
export default function HeaderNav() {
  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
      {/* App name text */}
      <span className="text-xl font-bold text-indigo-400">Manga Hub</span>
      <nav className="flex gap-6">
        {/* Go to search page */}
        <NavLink to="/" end className={link}>Search</NavLink>
        {/* Go to saved list */}
        <NavLink to="/my-list" className={link}>My List</NavLink>
      </nav>
    </header>
  )
}
