// API base web address
const BASE_URL = 'https://api.jikan.moe/v4'

// Search manga by text
export async function searchManga(query: string, page = 1, signal?: AbortSignal) {
  // Build URL parameters
  const params = new URLSearchParams({
    q: query,
    limit: '20',
    page: String(page),
  })
  // Call search endpoint
  const res = await fetch(`${BASE_URL}/manga?${params}`, { signal })
  // Stop if request fails
  if (!res.ok) throw new Error(`Jikan error ${res.status}`)
  return res.json()
}

// Get one manga detail
export async function getMangaById(id: number, signal?: AbortSignal) {
  const res = await fetch(`${BASE_URL}/manga/${id}`, { signal })
  if (!res.ok) throw new Error(`Jikan error ${res.status}`)
  return res.json()
}

// Get top ranked manga (trending)
export async function getTopManga(page = 1, signal?: AbortSignal) {
  const params = new URLSearchParams({ limit: '20', page: String(page) })
  const res = await fetch(`${BASE_URL}/top/manga?${params}`, { signal })
  if (!res.ok) throw new Error(`Jikan error ${res.status}`)
  return res.json()
}

// Browse manga by genre ID
export async function getMangaByGenre(genreId: number, page = 1, signal?: AbortSignal) {
  const params = new URLSearchParams({
    genres: String(genreId),
    limit: '20',
    page: String(page),
    order_by: 'popularity',
  })
  const res = await fetch(`${BASE_URL}/manga?${params}`, { signal })
  if (!res.ok) throw new Error(`Jikan error ${res.status}`)
  return res.json()
}
