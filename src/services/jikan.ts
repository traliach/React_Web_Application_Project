const BASE_URL = 'https://api.jikan.moe/v4'

export async function searchManga(query: string, page = 1, signal?: AbortSignal) {
  const params = new URLSearchParams({
    q: query,
    limit: '20',
    page: String(page),
  })
  const res = await fetch(`${BASE_URL}/manga?${params}`, { signal })
  if (!res.ok) throw new Error(`Jikan error ${res.status}`)
  return res.json()
}
