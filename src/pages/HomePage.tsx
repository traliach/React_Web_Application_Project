import { useState } from 'react'
import { searchManga, getMangaById } from '../services/jikan'
import DetailsPanel from '../components/DetailsPanel'

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [selected, setSelected] = useState<any>(null)

  async function handleCardClick(id: number) {
    const data = await getMangaById(id)
    setSelected(data.data)
  }

  async function fetchPage(q: string, p: number) {
    setLoading(true)
    setError('')
    try {
      const data = await searchManga(q, p)
      setResults(data.data)
      setLastPage(data.pagination.last_visible_page)
    } catch (err) {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    setPage(1)
    fetchPage(query.trim(), 1)
  }

  function handlePrev() {
    const p = page - 1
    setPage(p)
    fetchPage(query, p)
  }

  function handleNext() {
    const p = page + 1
    setPage(p)
    fetchPage(query, p)
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
          <div key={manga.mal_id} onClick={() => handleCardClick(manga.mal_id)} className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-indigo-500 transition-all">
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

      {results.length > 0 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            disabled={page === 1 || loading}
            className="bg-gray-700 hover:bg-gray-600 disabled:opacity-40 text-white px-5 py-2 rounded-lg"
          >
            ← Prev
          </button>
          <span className="text-gray-400 text-sm">Page {page} of {lastPage}</span>
          <button
            onClick={handleNext}
            disabled={page === lastPage || loading}
            className="bg-gray-700 hover:bg-gray-600 disabled:opacity-40 text-white px-5 py-2 rounded-lg"
          >
            Next →
          </button>
        </div>
      )}
    </main>

    {selected && <DetailsPanel manga={selected} onClose={() => setSelected(null)} />}
  )
}
