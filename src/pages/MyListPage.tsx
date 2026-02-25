import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { removeFromList, cycleStatus } from '../store/listSlice'
import type { Status } from '../store/listSlice'

const STATUSES: Status[] = ['Plan to Read', 'Reading', 'Completed']

const STATUS_COLORS: Record<Status, string> = {
  'Plan to Read': 'bg-gray-600',
  'Reading': 'bg-yellow-600',
  'Completed': 'bg-green-600',
}

export default function MyListPage() {
  const dispatch = useDispatch()
  const items = useSelector((s: RootState) => s.list.items)

  if (items.length === 0) {
    return (
      <main className="p-6 text-center text-gray-400 mt-20">
        <p className="text-xl">Your list is empty.</p>
        <p className="text-sm mt-2">Search for manga and add them!</p>
      </main>
    )
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-white mb-6">My List</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map(manga => (
          <div key={manga.id} className="bg-gray-800 rounded-lg overflow-hidden flex flex-col">
            <img src={manga.image} alt={manga.title} className="w-full object-cover h-48" />
            <div className="p-2 flex flex-col gap-2 flex-1">
              <p className="text-white text-sm font-medium line-clamp-2">{manga.title}</p>
              <button
                onClick={() => dispatch(cycleStatus(manga.id))}
                className={`text-xs text-white px-2 py-1 rounded-full ${STATUS_COLORS[manga.status]}`}
              >
                {manga.status}
              </button>
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
