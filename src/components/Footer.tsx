// Bottom footer shown on every page
export default function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-12 py-6 text-center text-gray-500 text-sm">
      <p>
        Built by{' '}
        <span className="font-manga text-red-500 tracking-wider text-base">@traliach</span>
      </p>
      <p className="mt-1">
        Contact:{' '}
        <a
          href="mailto:traliach@gmail.com"
          className="text-gray-400 hover:text-red-400 transition-colors"
        >
          traliach@gmail.com
        </a>
      </p>
    </footer>
  )
}
