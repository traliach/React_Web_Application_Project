import { useState } from 'react'
import { searchManga } from '../services/jikan'

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setError('')
    try {
      const data = await searchManga(query.trim())
      setResults(data.data)
    } catch (err) {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <form onSubmit={handleSearch} className="flex gap-2 mb-8">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search manga..."
          className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-semibold"
        >
          {loading ? 'Searching…' : 'Search'}
        </button>
      </form>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {results.map(manga => (
          <div key={manga.mal_id} className="bg-gray-800 rounded-lg overflow-hidden">
            <img
              src={manga.images.jpg.image_url}
              alt={manga.title}
              className="w-full object-cover h-48"
            />
            <div className="p-2">
              <p className="text-white text-sm font-medium line-clamp-2">{manga.title}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
