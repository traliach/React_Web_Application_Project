import { useState, useEffect, useRef } from 'react'
import { searchManga, getMangaById } from '../services/jikan'
import DetailsPanel from '../components/DetailsPanel'

// Main search and results page
export default function HomePage() {
  // Controlled input value
  const [query, setQuery] = useState('')
  // Array of manga results
  const [results, setResults] = useState<any[]>([])
  // True while fetching data
  const [loading, setLoading] = useState(false)
  // Error message string
  const [error, setError] = useState('')
  // Current page number
  const [page, setPage] = useState(1)
  // Total pages available
  const [lastPage, setLastPage] = useState(1)
  // Manga shown in panel
  const [selected, setSelected] = useState<any>(null)
  // True after first search
  const [hasSearched, setHasSearched] = useState(false)
  // Holds the debounce timer
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Auto-search 500ms after typing
  useEffect(() => {
    if (!query.trim()) return
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setPage(1)
      fetchPage(query.trim(), 1)
    }, 500)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [query])

  // Fetch one page of results
  async function fetchPage(q: string, p: number) {
    setLoading(true)
    setError('')
    setResults([])
    try {
      const data = await searchManga(q, p)
      // Fallback to empty array
      setResults(data.data ?? [])
      setLastPage(data.pagination.last_visible_page)
      setHasSearched(true)
    } catch (err) {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  // Handle form submit (Enter or button)
  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    setPage(1)
    fetchPage(query.trim(), 1)
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

  // Fetch full details for panel
  async function handleCardClick(id: number) {
    const data = await getMangaById(id)
    setSelected(data.data)
  }

  return (
    <>
    <main className="max-w-5xl mx-auto p-6">
      {/* Search input and button */}
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

      {/* Error message with retry */}
      {error && (
        <div className="bg-red-900/40 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-4 flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => fetchPage(query, page)} className="underline text-sm">Retry</button>
        </div>
      )}

      {/* Skeleton cards while loading */}
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

      {/* Results grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {!loading && results.map(manga => (
          // Click card to open panel
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

      {/* Show when search returns nothing */}
      {!loading && hasSearched && results.length === 0 && (
        <p className="text-center text-gray-500 mt-20">No results for "{query}".</p>
      )}

      {/* Prev / Next pagination */}
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

    {/* Details panel overlay */}
    {selected && <DetailsPanel manga={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
