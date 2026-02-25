import { useEffect, useState } from 'react'
import { searchManga, getMangaById } from '../services/jikan'
import DetailsPanel from '../components/DetailsPanel'

// Main search page
export default function HomePage() {
  // Search box text
  const [query, setQuery] = useState('')
  // Search results list
  const [results, setResults] = useState<any[]>([])
  // Loading flag state
  const [loading, setLoading] = useState(false)
  // Error message text
  const [error, setError] = useState('')
  // Current page number
  const [page, setPage] = useState(1)
  // Last page number
  const [lastPage, setLastPage] = useState(1)
  // Opened manga details
  const [selected, setSelected] = useState<any>(null)
  // Search has started
  const [hasSearched, setHasSearched] = useState(false)

  // Live search after pause
  useEffect(() => {
    const cleanQuery = query.trim()

    if (cleanQuery === '') {
      setResults([])
      setError('')
      setHasSearched(false)
      setPage(1)
      return
    }

    const timeoutId = setTimeout(() => {
      setPage(1)
      fetchPage(cleanQuery, 1)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [query])

  // Fetch one results page
  async function fetchPage(q: string, p: number) {
    setLoading(true)
    setError('')
    setResults([])

    try {
      const data = await searchManga(q, p)
      setResults(data.data ?? [])
      setLastPage(data.pagination.last_visible_page)
      setHasSearched(true)
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  // Search on submit
  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const cleanQuery = query.trim()
    if (cleanQuery === '') return

    setPage(1)
    fetchPage(cleanQuery, 1)
  }

  // Go to previous page
  function handlePrev() {
    const p = page - 1
    setPage(p)
    fetchPage(query, p)
  }

  // Go to next page
  function handleNext() {
    const p = page + 1
    setPage(p)
    fetchPage(query, p)
  }

  // Open manga details panel
  async function handleCardClick(id: number) {
    const data = await getMangaById(id)
    setSelected(data.data)
  }

  return (
    <>
    <main className="max-w-5xl mx-auto p-6">
      {/* Search form row */}
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

      {/* Error banner area */}
      {error && (
        <div className="bg-red-900/40 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-4 flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => fetchPage(query, page)} className="underline text-sm">Retry</button>
        </div>
      )}

      {/* Loading skeleton cards */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-lg overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-700" />
              <div className="p-2 h-4 bg-gray-700 rounded mt-2 mx-2" />
            </div>
          ))}
        </div>
      )}

      {/* Manga cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {!loading && results.map(manga => (
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

      {/* Empty results message */}
      {!loading && hasSearched && results.length === 0 && (
        <p className="text-center text-gray-500 mt-20">No results for "{query}".</p>
      )}

      {/* Pagination controls row */}
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

    {/* Right-side details panel */}
    {selected && <DetailsPanel manga={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
