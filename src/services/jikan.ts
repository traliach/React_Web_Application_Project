// Base URL for all requests
const BASE_URL = 'https://api.jikan.moe/v4'

// Search manga by keyword
export async function searchManga(query: string, page = 1, signal?: AbortSignal) {
  // Build query string parameters
  const params = new URLSearchParams({
    q: query,
    limit: '20',
    page: String(page),
  })
  // Fetch results from Jikan API
  const res = await fetch(`${BASE_URL}/manga?${params}`, { signal })
  // Throw if response is not OK
  if (!res.ok) throw new Error(`Jikan error ${res.status}`)
  return res.json()
}

// Fetch one manga by ID
export async function getMangaById(id: number, signal?: AbortSignal) {
  const res = await fetch(`${BASE_URL}/manga/${id}`, { signal })
  if (!res.ok) throw new Error(`Jikan error ${res.status}`)
  return res.json()
}
