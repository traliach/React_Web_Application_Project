import { NavLink } from 'react-router-dom'

// Nav link text style
const link = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'text-red-400 font-semibold'
    : 'text-gray-300 hover:text-red-400 transition-colors'

// Top app navigation
export default function HeaderNav() {
  return (
    <header className="bg-gray-950 border-b-4 border-red-600 px-6 py-4 flex items-center justify-between">
      {/* App name manga style */}
      <span className="font-manga text-3xl text-red-500 tracking-widest">
        漫画 Manga Hub
      </span>
      <nav className="flex gap-6">
        {/* Go to search page */}
        <NavLink to="/" end className={link}>Search</NavLink>
        {/* Go to saved list */}
        <NavLink to="/my-list" className={link}>My List</NavLink>
      </nav>
    </header>
  )
}
