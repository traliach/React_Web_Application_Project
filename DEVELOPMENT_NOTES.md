# Manga Hub — Development Notes

A step-by-step record of everything we built, installed, and decided during this project.
Each step includes what we did, which files changed, and small code examples.

---

## Step 1 — Create the Project

**What we did:**
Set up a brand new React app using Vite inside the existing git repo folder.

**Why Vite?**
Vite is much faster than Create React App. It starts the dev server instantly and reloads the browser the moment you save a file.

**Commands:**
```bash
cd React_Web_Application_Project

# Scaffold a new Vite + React + TypeScript project in the current folder
npm create vite@latest . -- --template react-ts

# Install all the default packages
npm install
```

**Files Vite created for us:**
- `index.html` — the one HTML page the whole app lives inside
- `src/main.tsx` — the entry point; mounts the React app into the HTML
- `src/App.tsx` — the root React component
- `vite.config.ts` — Vite settings
- `tsconfig.json` — TypeScript settings

---

## Step 2 — Add Tailwind CSS

**What we did:**
Installed Tailwind CSS so we can style everything using class names like `bg-red-600` and `rounded-lg` instead of writing separate CSS files.

**Commands:**
```bash
# Install Tailwind and its required tools
npm install -D tailwindcss@3 postcss autoprefixer

# Create the config files automatically
npx tailwindcss init -p
```

**File changed: `tailwind.config.js`**
We told Tailwind which files to scan so it only includes the CSS classes we actually use:
```js
// tailwind.config.js
export default {
  // Look inside these files for Tailwind class names
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

**File changed: `src/index.css`**
Replaced all the default Vite styles with three Tailwind lines:
```css
/* These three lines load all of Tailwind's styles */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Step 3 — Add React Router (Page Navigation)

**What we did:**
Installed React Router so the app can show different pages without reloading the browser.

**Command:**
```bash
npm install react-router-dom
```

**Files created:**
- `src/pages/HomePage.tsx` — the Search page (shown at `/`)
- `src/pages/MyListPage.tsx` — the My List page (shown at `/my-list`)
- `src/components/HeaderNav.tsx` — the top navigation bar

**File changed: `src/App.tsx`**
Wrapped the whole app in `<BrowserRouter>` and defined the two routes:
```tsx
// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen halftone text-white">
        <HeaderNav />  {/* Always visible at the top */}
        <Routes>
          {/* Search home page */}
          <Route path="/" element={<HomePage />} />
          {/* Saved list page */}
          <Route path="/my-list" element={<MyListPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
```

---

## Step 4 — Choose the Right API

**What we did:**
We tested both Kitsu and Jikan APIs live before writing any code.

**Why we chose Jikan over Kitsu:**

| | Kitsu | Jikan ✅ |
|---|---|---|
| Search "naruto" top result | A spin-off novel | Naruto (correct) |
| Chapters | 5 | 700 |
| Author included | No | Yes |
| Genres included | No | Yes |
| Score / popularity | No | Yes |

**File created: `src/services/jikan.ts`**
All API calls live in one file so we never repeat fetch logic:
```ts
// The base address for every API call
const BASE_URL = 'https://api.jikan.moe/v4'

// Search manga by text
export async function searchManga(query: string, page = 1) {
  const params = new URLSearchParams({ q: query, limit: '20', page: String(page) })
  const res = await fetch(`${BASE_URL}/manga?${params}`)
  if (!res.ok) throw new Error(`Jikan error ${res.status}`)
  return res.json()
}
```

> **Jikan API docs:** https://docs.api.jikan.moe/

---

## Step 5 — Build the Search Page

**What we did:**
Wired the search input to the Jikan API. Results appear automatically as the user types (called "debouncing" — we wait 500ms after they stop typing before fetching).

**Key React concepts used:**

| Concept | How we used it |
|---|---|
| `useState` | Store the query text, results array, loading flag, error message |
| `useEffect` | Watch the query and trigger a search after 500ms pause |
| `async/await` | Make the API call without blocking the page |
| `try/catch/finally` | Handle errors gracefully, always stop loading spinner |

**File changed: `src/pages/HomePage.tsx`**
```tsx
// Wait 500ms after the user stops typing, then search
useEffect(() => {
  const cleanQuery = query.trim()
  if (cleanQuery === '') return

  const timeoutId = setTimeout(() => {
    fetchPage(cleanQuery, 1) // fetch page 1
  }, 500)

  return () => clearTimeout(timeoutId) // cancel if user keeps typing
}, [query]) // re-run every time query changes
```

---

## Step 6 — Add Pagination

**What we did:**
Added Prev / Next buttons that load the previous or next page of results.

**How Jikan pagination works:**
Every response includes a `pagination` object:
```json
{
  "pagination": {
    "last_visible_page": 40,
    "has_next_page": true,
    "current_page": 1
  }
}
```

We save `last_visible_page` in state and use it to disable the Next button on the last page.

**File changed: `src/pages/HomePage.tsx`**
```tsx
// Go to previous page
function handlePrev() {
  const p = page - 1
  setPage(p)
  fetchPage(query, p)
}

// Go to next page
function handleNext() {
  const p = page + 1
  setPage(p)
  fetchPage(query, p)
}
```

---

## Step 7 — Add the Details Slide-Over Panel

**What we did:**
Clicking a manga card fetches its full details and shows a panel that slides in from the right side of the screen.

**File created: `src/components/DetailsPanel.tsx`**

The panel uses CSS `fixed` positioning to float over the page:
```tsx
// fixed = stays in place even when page scrolls
// inset-0 = covers the full screen
// z-50 = appears on top of everything
<div className="fixed inset-0 z-50 flex justify-end">
  {/* The dark clickable overlay */}
  <div className="absolute inset-0 bg-black/60" onClick={onClose} />
  {/* The white panel on the right */}
  <aside className="relative w-full max-w-md bg-gray-950 ...">
    ...
  </aside>
</div>
```

---

## Step 8 — Add Redux (Global State)

**What we did:**
Installed Redux Toolkit so the saved manga list is available on every page, not just the one component that created it.

**Command:**
```bash
npm install @reduxjs/toolkit react-redux
```

**File created: `src/store/listSlice.ts`**
A "slice" is one piece of the global state with its own actions:
```ts
const listSlice = createSlice({
  name: 'list',
  initialState: { items: [] },
  reducers: {
    // Add manga if new
    addToList(state, action) {
      const exists = state.items.find(m => m.id === action.payload.id)
      if (!exists) {
        state.items.push({ ...action.payload, status: 'Plan to Read' })
      }
    },
    // Remove manga by id
    removeFromList(state, action) {
      state.items = state.items.filter(m => m.id !== action.payload)
    },
    // Move to next status
    cycleStatus(state, action) {
      const manga = state.items.find(m => m.id === action.payload)
      if (!manga) return
      const cycle = ['Plan to Read', 'Reading', 'Completed']
      const next = (cycle.indexOf(manga.status) + 1) % cycle.length
      manga.status = cycle[next]
    },
  },
})
```

**File created: `src/store/store.ts`**
```ts
export const store = configureStore({
  reducer: { list: listReducer },
})
```

**File changed: `src/main.tsx`**
Wrapped the app in `<Provider>` so every component can access the store:
```tsx
<Provider store={store}>
  <App />
</Provider>
```

---

## Step 9 — localStorage Persistence

**What we did:**
Made the saved list survive page refreshes by saving it to `localStorage` (the browser's built-in key/value storage).

**File changed: `src/store/store.ts`**

Two additions — load saved data when the store is created, and save every time it changes:
```ts
// 1. Load saved list from browser storage
function loadList() {
  try {
    const raw = localStorage.getItem('mangaList')
    return raw ? { list: JSON.parse(raw) } : undefined
  } catch {
    return undefined // if data is corrupted, start fresh
  }
}

// 2. Create store with saved data as starting point
export const store = configureStore({
  reducer: { list: listReducer },
  preloadedState: loadList(), // start with saved list
})

// 3. Save to storage after every change
store.subscribe(() => {
  localStorage.setItem('mangaList', JSON.stringify(store.getState().list))
})
```

---

## Step 10 — My List Page

**What we did:**
Built the My List page. It reads the Redux store and shows all saved manga with status chips and remove buttons.

**File changed: `src/pages/MyListPage.tsx`**

Reading from Redux uses two hooks:
```tsx
const dispatch = useDispatch()  // lets us call actions
const items = useSelector((state) => state.list.items) // reads data
```

---

## Step 11 — Loading Skeletons + Error Banner + Empty State

**What we did:**
Added UI feedback for every possible state: loading, error, and no results.

**Loading skeletons** (`src/pages/HomePage.tsx`):
```tsx
{/* Show 8 grey pulsing cards while loading */}
{loading && (
  <div className="grid grid-cols-4 gap-4">
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="bg-gray-800 animate-pulse rounded-lg">
        <div className="h-48 bg-gray-700" />
      </div>
    ))}
  </div>
)}
```

**Error banner** (`src/pages/HomePage.tsx`):
```tsx
{error && (
  <div className="bg-red-900/40 border border-red-500 text-red-300 ...">
    <span>{error}</span>
    <button onClick={() => fetchPage(query, page)}>Retry</button>
  </div>
)}
```

---

## Step 12 — Manga Theme UI

**What we did:**
Redesigned the app to look like a manga app.

**File changed: `index.html`** — added Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Bangers&display=swap" rel="stylesheet" />
```

**File changed: `src/index.css`** — added halftone background + font helpers:
```css
/* Subtle halftone dot background like manga pages */
.halftone {
  background-color: #0a0a0f;
  background-image: radial-gradient(circle, #ffffff08 1px, transparent 1px);
  background-size: 24px 24px;
}

/* Comic-book style font class */
.font-manga {
  font-family: 'Bangers', cursive;
  letter-spacing: 0.05em;
}
```

**File changed: `src/components/HeaderNav.tsx`** — manga logo with kanji:
```tsx
<span className="font-manga text-3xl text-red-500 tracking-widest">
  漫画 Manga Hub
</span>
```

---

## Step 13 — Genre Filter Chips

**What we did:**
Added genre chips above the search bar so users can browse by theme even if they don't know a manga's name.

**File changed: `src/services/jikan.ts`** — added genre fetch function:
```ts
// Browse manga by genre ID
export async function getMangaByGenre(genreId: number, page = 1) {
  const params = new URLSearchParams({
    genres: String(genreId), // Jikan uses numeric genre IDs
    limit: '20',
    page: String(page),
    order_by: 'popularity',
  })
  const res = await fetch(`${BASE_URL}/manga?${params}`)
  if (!res.ok) throw new Error(`Jikan error ${res.status}`)
  return res.json()
}
```

**File changed: `src/pages/HomePage.tsx`** — genre list and click handler:
```tsx
// Genre names mapped to Jikan's numeric IDs
const GENRES = [
  { id: 1,  name: '⚔️ Action' },
  { id: 22, name: '💕 Romance' },
  { id: 14, name: '👻 Horror' },
  // ... more genres
]

// Called when a genre chip is clicked
async function handleGenreClick(genreId: number) {
  if (activeGenre === genreId) {
    setActiveGenre(null) // click again to clear
    setResults([])
    return
  }
  setActiveGenre(genreId)
  setQuery('')
  const data = await getMangaByGenre(genreId)
  setResults(data.data ?? [])
}
```

---

## Final File Structure

```
src/
├── components/
│   ├── HeaderNav.tsx       ← Top nav, links, manga logo
│   └── DetailsPanel.tsx    ← Slide-over with manga info
├── pages/
│   ├── HomePage.tsx        ← Search bar, genre chips, results grid
│   └── MyListPage.tsx      ← Saved manga with status chips
├── services/
│   └── jikan.ts            ← All API fetch functions
├── store/
│   ├── listSlice.ts        ← Redux actions: add, remove, cycleStatus
│   └── store.ts            ← Redux store + localStorage save/load
├── App.tsx                 ← Router + page layout
├── main.tsx                ← App entry point, Redux Provider
└── index.css               ← Tailwind + halftone + font helpers
```

---

## All Packages Installed

```bash
# Step 1 — Vite scaffolded these automatically
react, react-dom, typescript, vite, @types/react, @types/react-dom

# Step 2 — Tailwind
npm install -D tailwindcss@3 postcss autoprefixer

# Step 3 — React Router
npm install react-router-dom

# Step 8 — Redux
npm install @reduxjs/toolkit react-redux
```
