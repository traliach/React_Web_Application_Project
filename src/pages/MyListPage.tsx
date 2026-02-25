import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { removeFromList, cycleStatus } from '../store/listSlice'
import type { Status } from '../store/listSlice'

// Color for each status
const STATUS_COLORS: Record<Status, string> = {
  'Plan to Read': 'bg-gray-600',
  'Reading': 'bg-yellow-600',
  'Completed': 'bg-green-600',
}

// Page for saved manga
export default function MyListPage() {
  const dispatch = useDispatch()
  // Read items from store
  const items = useSelector((s: RootState) => s.list.items)

  // Show empty list text
  if (items.length === 0) {
    return (
      <main className="p-6 text-center mt-24">
        <p className="font-manga text-8xl text-red-700 opacity-30">漫画</p>
        <p className="font-manga text-2xl text-gray-400 mt-4 tracking-widest">Your List Is Empty</p>
        <p className="text-gray-500 text-sm mt-2">Search for manga and add them!</p>
      </main>
    )
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h2 className="font-manga text-4xl text-red-500 mb-6 tracking-widest">My List</h2>
      {/* Saved manga card grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map(manga => (
          <div key={manga.id} className="bg-gray-900 border-2 border-gray-800 hover:border-red-600 rounded-lg overflow-hidden flex flex-col transition-all">
            <img src={manga.image} alt={manga.title} className="w-full object-cover h-48" />
            <div className="p-2 flex flex-col gap-2 flex-1">
              <p className="text-white text-sm font-medium line-clamp-2">{manga.title}</p>
              {/* Click to change status */}
              <button
                onClick={() => dispatch(cycleStatus(manga.id))}
                className={`text-xs text-white px-2 py-1 rounded-full ${STATUS_COLORS[manga.status]}`}
              >
                {manga.status}
              </button>
              {/* Remove this manga item */}
              <button
                onClick={() => dispatch(removeFromList(manga.id))}
                className="text-xs text-red-400 hover:text-red-300 mt-auto"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
