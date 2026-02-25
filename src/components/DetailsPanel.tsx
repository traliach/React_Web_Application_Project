interface Props {
  manga: any
  onClose: () => void
}

export default function DetailsPanel({ manga, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <aside className="relative w-full max-w-md bg-gray-900 h-full overflow-y-auto shadow-xl p-6 flex flex-col gap-4">
        <button
          onClick={onClose}
          aria-label="Close panel"
          className="self-end text-gray-400 hover:text-white text-2xl leading-none"
        >
          ✕
        </button>
        <img
          src={manga.images.jpg.large_image_url}
          alt={manga.title}
          className="w-40 rounded-lg mx-auto"
        />
        <h2 className="text-xl font-bold text-white text-center">{manga.title}</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {manga.genres?.map((g: any) => (
            <span key={g.mal_id} className="bg-indigo-700 text-white text-xs px-2 py-1 rounded-full">
              {g.name}
            </span>
          ))}
        </div>
        <div className="text-gray-400 text-sm space-y-1">
          <p><span className="text-gray-200 font-medium">Status:</span> {manga.status}</p>
          <p><span className="text-gray-200 font-medium">Chapters:</span> {manga.chapters ?? 'N/A'}</p>
          <p><span className="text-gray-200 font-medium">Score:</span> {manga.score ?? 'N/A'}</p>
          {manga.authors?.[0] && (
            <p><span className="text-gray-200 font-medium">Author:</span> {manga.authors[0].name}</p>
          )}
        </div>
        <p className="text-gray-300 text-sm leading-relaxed line-clamp-6">{manga.synopsis}</p>
      </aside>
    </div>
  )
}
