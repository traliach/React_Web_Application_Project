import { useDispatch, useSelector } from 'react-redux'
import { addToList, removeFromList } from '../store/listSlice'
import type { RootState } from '../store/store'

// Props from parent page
interface Props {
  manga: any
  onClose: () => void
}

// Right-side details panel
export default function DetailsPanel({ manga, onClose }: Props) {
  const dispatch = useDispatch()
  // Read saved list items
  const items = useSelector((s: RootState) => s.list.items)
  // Check if manga saved
  const saved = items.find(m => m.id === manga.mal_id)

  // Add or remove item
  function handleToggle() {
    if (saved) {
      dispatch(removeFromList(manga.mal_id))
    } else {
      dispatch(addToList({
        id: manga.mal_id,
        title: manga.title,
        image: manga.images.jpg.image_url,
      }))
    }
  }

  return (
    // Dark background overlay
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Click outside to close */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <aside className="relative w-full max-w-md bg-gray-900 h-full overflow-y-auto shadow-xl p-6 flex flex-col gap-4">
        {/* Close panel button */}
        <button
          onClick={onClose}
          aria-label="Close panel"
          className="self-end text-gray-400 hover:text-white text-2xl leading-none"
        >
          ✕
        </button>
        {/* Manga cover image */}
        <img
          src={manga.images.jpg.large_image_url}
          alt={manga.title}
          className="w-40 rounded-lg mx-auto"
        />
        <h2 className="text-xl font-bold text-white text-center">{manga.title}</h2>
        {/* Genre chip buttons row */}
        <div className="flex flex-wrap gap-2 justify-center">
          {manga.genres?.map((g: any) => (
            <span key={g.mal_id} className="bg-indigo-700 text-white text-xs px-2 py-1 rounded-full">
              {g.name}
            </span>
          ))}
        </div>
        {/* Basic manga info block */}
        <div className="text-gray-400 text-sm space-y-1">
          <p><span className="text-gray-200 font-medium">Status:</span> {manga.status}</p>
          <p><span className="text-gray-200 font-medium">Chapters:</span> {manga.chapters ?? 'N/A'}</p>
          <p><span className="text-gray-200 font-medium">Score:</span> {manga.score ?? 'N/A'}</p>
          {manga.authors?.[0] && (
            <p><span className="text-gray-200 font-medium">Author:</span> {manga.authors[0].name}</p>
          )}
        </div>
        {/* Save or remove button */}
        <button
          onClick={handleToggle}
          className={`w-full py-2 rounded-lg font-semibold text-white ${saved ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
        >
          {saved ? 'Remove from List' : '+ Add to My List'}
        </button>
        {/* Short story description */}
        <p className="text-gray-300 text-sm leading-relaxed line-clamp-6">{manga.synopsis}</p>
      </aside>
    </div>
  )
}
