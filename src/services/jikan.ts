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
