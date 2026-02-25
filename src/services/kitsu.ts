const BASE_URL = 'https://kitsu.io/api/edge'

export async function searchManga(query: string, offset = 0, signal?: AbortSignal) {
  const params = new URLSearchParams({
    'filter[text]': query,
    'page[limit]': '20',
    'page[offset]': String(offset),
    'fields[manga]': 'canonicalTitle,posterImage,synopsis,chapterCount,status',
  })
  const res = await fetch(`${BASE_URL}/manga?${params}`, { signal })
  if (!res.ok) throw new Error(`Kitsu error ${res.status}`)
  return res.json()
}
