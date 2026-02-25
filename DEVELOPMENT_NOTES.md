# Manga Hub — Development Notes

This document is a student-friendly record of the **main steps** we completed to build Manga Hub.
It avoids repeating the same idea many times, but still shows what we installed, what files we changed, and why.

---

## What we built (quick summary)

- **Search** manga by title (results show as you type)
- **Browse by theme** using genre chips (Action, Romance, Horror, etc.)
- **Trending (🔥)** button to load top-ranked manga
- **Details slide-over panel** when you click a manga card
- **My List** page with:
  - Add / remove manga
  - Reading status cycle (Plan → Reading → Completed)
  - Favorite toggle (heart)
- **localStorage** persistence (your list stays after refresh)
- Manga-style UI (font + halftone background + red/black theme)
- Footer credit shown on every page

---

## Main tools / tech used

- **React + TypeScript** (components, state, props, typing)
- **Vite** (fast dev server + build)
- **Tailwind CSS** (utility classes for styling)
- **React Router** (pages: `/` and `/my-list`)
- **Redux Toolkit** (global state for saved list)
- **Jikan API** (AJAX `fetch()` calls for manga data)

---

## Install + run commands (Git Bash)

```bash
# install dependencies
npm install

# run dev server
npm run dev

# create production build
npm run build
```

---

## Step-by-step (major milestones)

### Step 1 — Create the Vite React app

**Goal**: start a React + TypeScript project quickly.

```bash
npm create vite@latest . -- --template react-ts
npm install
```

**Key files Vite gives you**:
- `index.html`
- `src/main.tsx`
- `src/App.tsx`

---

### Step 2 — Add Tailwind CSS

**Goal**: style in JSX using Tailwind classes.

```bash
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

**Files changed**:
- `tailwind.config.js` (content paths)
- `src/index.css` (Tailwind directives)

Small example (`src/index.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### Step 3 — Add React Router (pages)

**Goal**: switch pages without reloading.

```bash
npm install react-router-dom
```

**Files created**:
- `src/pages/HomePage.tsx` (search page)
- `src/pages/MyListPage.tsx` (saved list page)
- `src/components/HeaderNav.tsx` (navigation)

**File changed**:
- `src/App.tsx` (routes)

---

### Step 4 — Choose an API (Jikan)

We compared Kitsu vs Jikan and picked **Jikan** because it gave better manga results + fields.

**File created**:
- `src/services/jikan.ts` (one place for all API calls)

**API docs**: `https://docs.api.jikan.moe/`

---

### Step 5 — Home page search (AJAX) + debounce

**Goal**: when the user types, fetch results (but not on every keystroke).

**File changed**:
- `src/pages/HomePage.tsx`

Core idea (debounce):

```ts
setTimeout(() => fetchPage(query, 1), 500)
```

---

### Step 6 — Pagination

**Goal**: Prev / Next buttons to load other pages from the API.

**File changed**:
- `src/pages/HomePage.tsx`

We store `page` and `last_visible_page` in state and disable buttons when needed.

---

### Step 7 — Details slide-over panel

**Goal**: click a card → see full manga info without leaving the page.

**File created**:
- `src/components/DetailsPanel.tsx`

The panel is `fixed` so it sits on top of the page, and it has a dark overlay to close it.

---

### Step 8 — Add Redux Toolkit (My List state)

**Goal**: saved list should be available on any page.

```bash
npm install @reduxjs/toolkit react-redux
```

**Files created**:
- `src/store/listSlice.ts` (reducers/actions like add/remove/status/favorite)
- `src/store/store.ts` (store setup)

**File changed**:
- `src/main.tsx` (wrap with `<Provider store={store}>`)

---

### Step 9 — Persist the list (localStorage)

**Goal**: list should stay after refresh.

**File changed**:
- `src/store/store.ts`

We load from localStorage when the store starts, and save again on every change.

---

### Step 10 — My List page UI (status + remove + favorite)

**Goal**: show saved manga cards and allow actions.

**File changed**:
- `src/pages/MyListPage.tsx`

My List uses Redux hooks:
- `useSelector` to read `items`
- `useDispatch` to run actions

---

### Step 11 — Loading, error, and empty states

**Goal**: never show a blank screen.

**File changed**:
- `src/pages/HomePage.tsx`

We added:
- loading skeleton cards
- error banner with Retry
- “no results” message (only after a search)

---

### Step 12 — Manga theme styling

**Goal**: manga vibe (font + halftone background + bold red accents).

**Files changed**:
- `index.html` (Google font)
- `src/index.css` (halftone background + helper classes)
- `src/components/HeaderNav.tsx` (logo styling + kanji)

---

### Step 13 — Browse by theme (genre chips)

**Goal**: if you don’t know a title, you can still browse.

**Files changed**:
- `src/services/jikan.ts` (genre fetch helper)
- `src/pages/HomePage.tsx` (chip UI + handler)

---

### Step 14 — Trending (🔥)

**Goal**: one click to load top manga.

**Files changed**:
- `src/services/jikan.ts` (top manga fetch helper)
- `src/pages/HomePage.tsx` (Trending button + state)

---

### Step 15 — Favorites (heart)

**Goal**: mark saved manga as a favorite.

**Files changed**:
- `src/store/listSlice.ts` (toggleFavorite action)
- `src/pages/MyListPage.tsx` (heart button UI)

---

### Step 16 — Footer credit (mobile + desktop)

**Goal**: show “Built by @traliach” on every page, including mobile.

**Files changed**:
- `src/components/Footer.tsx` (new component)
- `src/App.tsx` (layout uses `flex flex-col` + `flex-1` so footer stays visible)

---

## Rating filter (attempted, then removed)

We tried adding a “minimum score” filter (6+, 7+, 8+, 9+). We removed it because it **filtered only the current page** of results.

- Example problem: you might see only 3 results on the page, but pagination still says something huge like “Page 1 of 4114” because the API pagination is for the unfiltered search.

**Lesson learned**: filtering paginated data should usually happen on the **server/API**. If we bring it back later, we should use Jikan’s `min_score` query parameter so the API returns correct pagination.

---

## Final file structure (important files)

```
src/
  components/
    HeaderNav.tsx
    DetailsPanel.tsx
    Footer.tsx
  pages/
    HomePage.tsx
    MyListPage.tsx
  services/
    jikan.ts
  store/
    listSlice.ts
    store.ts
  App.tsx
  main.tsx
  index.css
```

---

## Packages installed (summary)

```bash
# Tailwind
npm install -D tailwindcss@3 postcss autoprefixer

# Router
npm install react-router-dom

# Redux
npm install @reduxjs/toolkit react-redux
```

# Manga Hub — Development Notes

This document is a student-friendly record of the **main steps** we completed to build Manga Hub.
It avoids repeating the same idea many times, but still shows what we installed, what files we changed, and why.

---

## What we built (quick summary)

- **Search** manga by title (results show as you type)
- **Browse by theme** using genre chips (Action, Romance, Horror, etc.)
- **Trending (🔥)** button to load top-ranked manga
- **Details slide-over panel** when you click a manga card
- **My List** page with:
  - Add / remove manga
  - Reading status cycle (Plan → Reading → Completed)
  - Favorite toggle (heart)
- **localStorage** persistence (your list stays after refresh)
- Manga-style UI (font + halftone background + red/black theme)
- Footer credit shown on every page

---

## Main tools / tech used

- **React + TypeScript** (components, state, props, typing)
- **Vite** (fast dev server + build)
- **Tailwind CSS** (utility classes for styling)
- **React Router** (pages: `/` and `/my-list`)
- **Redux Toolkit** (global state for saved list)
- **Jikan API** (AJAX `fetch()` calls for manga data)

---

## Install + run commands (Git Bash)

```bash
# install dependencies
npm install

# run dev server
npm run dev

# create production build
npm run build
```

---

## Step-by-step (major milestones)

### Step 1 — Create the Vite React app

**Goal**: start a React + TypeScript project quickly.

```bash
npm create vite@latest . -- --template react-ts
npm install
```

**Key files Vite gives you**:
- `index.html`
- `src/main.tsx`
- `src/App.tsx`

---

### Step 2 — Add Tailwind CSS

**Goal**: style in JSX using Tailwind classes.

```bash
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

**Files changed**:
- `tailwind.config.js` (content paths)
- `src/index.css` (Tailwind directives)

Small example (`src/index.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### Step 3 — Add React Router (pages)

**Goal**: switch pages without reloading.

```bash
npm install react-router-dom
```

**Files created**:
- `src/pages/HomePage.tsx` (search page)
- `src/pages/MyListPage.tsx` (saved list page)
- `src/components/HeaderNav.tsx` (navigation)

**File changed**:
- `src/App.tsx` (routes)

---

### Step 4 — Choose an API (Jikan)

We compared Kitsu vs Jikan and picked **Jikan** because it gave better manga results + fields.

**File created**:
- `src/services/jikan.ts` (one place for all API calls)

**API docs**: `https://docs.api.jikan.moe/`

---

### Step 5 — Home page search (AJAX) + debounce

**Goal**: when the user types, fetch results (but not on every keystroke).

**File changed**:
- `src/pages/HomePage.tsx`

Core idea (debounce):

```ts
setTimeout(() => fetchPage(query, 1), 500)
```

---

### Step 6 — Pagination

**Goal**: Prev / Next buttons to load other pages from the API.

**File changed**:
- `src/pages/HomePage.tsx`

We store `page` and `last_visible_page` in state and disable buttons when needed.

---

### Step 7 — Details slide-over panel

**Goal**: click a card → see full manga info without leaving the page.

**File created**:
- `src/components/DetailsPanel.tsx`

The panel is `fixed` so it sits on top of the page, and it has a dark overlay to close it.

---

### Step 8 — Add Redux Toolkit (My List state)

**Goal**: saved list should be available on any page.

```bash
npm install @reduxjs/toolkit react-redux
```

**Files created**:
- `src/store/listSlice.ts` (reducers/actions like add/remove/status/favorite)
- `src/store/store.ts` (store setup)

**File changed**:
- `src/main.tsx` (wrap with `<Provider store={store}>`)

---

### Step 9 — Persist the list (localStorage)

**Goal**: list should stay after refresh.

**File changed**:
- `src/store/store.ts`

We load from localStorage when the store starts, and save again on every change.

---

### Step 10 — My List page UI (status + remove + favorite)

**Goal**: show saved manga cards and allow actions.

**File changed**:
- `src/pages/MyListPage.tsx`

My List uses Redux hooks:
- `useSelector` to read `items`
- `useDispatch` to run actions

---

### Step 11 — Loading, error, and empty states

**Goal**: never show a blank screen.

**File changed**:
- `src/pages/HomePage.tsx`

We added:
- loading skeleton cards
- error banner with Retry
- “no results” message (only after a search)

---

### Step 12 — Manga theme styling

**Goal**: manga vibe (font + halftone background + bold red accents).

**Files changed**:
- `index.html` (Google font)
- `src/index.css` (halftone background + helper classes)
- `src/components/HeaderNav.tsx` (logo styling + kanji)

---

### Step 13 — Browse by theme (genre chips)

**Goal**: if you don’t know a title, you can still browse.

**Files changed**:
- `src/services/jikan.ts` (genre fetch helper)
- `src/pages/HomePage.tsx` (chip UI + handler)

---

### Step 14 — Trending (🔥)

**Goal**: one click to load top manga.

**Files changed**:
- `src/services/jikan.ts` (top manga fetch helper)
- `src/pages/HomePage.tsx` (Trending button + state)

---

### Step 15 — Footer credit (mobile + desktop)

**Goal**: show “Built by @traliach” on every page, including mobile.

**Files changed**:
- `src/components/Footer.tsx` (new component)
- `src/App.tsx` (layout uses `flex flex-col` + `flex-1` so footer stays visible)

---

## Rating filter (attempted, then removed)

We tried adding a “minimum score” filter (6+, 7+, 8+, 9+). We removed it because it **filtered only the current page** of results.

- Example problem: you might see only 3 results on the page, but pagination still says something huge like “Page 1 of 4114” because the API pagination is for the unfiltered search.

**Lesson learned**: filtering paginated data should usually happen on the **server/API**. If we bring it back later, we should use Jikan’s `min_score` query parameter so the API returns correct pagination.

---

## Final file structure (important files)

```
src/
  components/
    HeaderNav.tsx
    DetailsPanel.tsx
    Footer.tsx
  pages/
    HomePage.tsx
    MyListPage.tsx
  services/
    jikan.ts
  store/
    listSlice.ts
    store.ts
  App.tsx
  main.tsx
  index.css
```

---

## Packages installed (summary)

```bash
# Tailwind
npm install -D tailwindcss@3 postcss autoprefixer

# Router
npm install react-router-dom

# Redux
npm install @reduxjs/toolkit react-redux
```

# Manga Hub — Development Notes

A step-by-step record of every major decision, installation, and code change made during this project.
Each step shows what changed, which file was affected, and a small example of the actual code.

---

## Step 1 — Create the Project

Set up a new React app using Vite inside the existing git repo folder.

Vite was chosen over Create React App because it starts the dev server much faster and reloads the browser the moment a file is saved.

Commands run:
```bash
cd React_Web_Application_Project

# Scaffold a Vite + React + TypeScript project in the current folder
npm create vite@latest . -- --template react-ts

# Install the default packages
npm install
```

Files Vite created automatically:
- `index.html` — the single HTML page the whole app lives inside
- `src/main.tsx` — the entry point that mounts React into the HTML
- `src/App.tsx` — the root React component
- `vite.config.ts` — Vite configuration
- `tsconfig.json` — TypeScript configuration

---

## Step 2 — Add Tailwind CSS

Installed Tailwind CSS so everything can be styled using class names like `bg-red-600` and `rounded-lg` directly in the JSX, instead of writing separate CSS files.

Commands run:
```bash
# Install Tailwind and its required tools
npm install -D tailwindcss@3 postcss autoprefixer

# Generate the config files
npx tailwindcss init -p
```

File changed: `tailwind.config.js`

Told Tailwind which files to scan so it only ships CSS classes that are actually used:
```js
export default {
  // Look inside these files for class names
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

File changed: `src/index.css`

Replaced all default Vite styles with these three lines:
```css
/* These three lines load all of Tailwind */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Step 3 — Add React Router

Installed React Router so the app can move between pages without reloading the browser.

Command run:
```bash
npm install react-router-dom
```

Files created:
- `src/pages/HomePage.tsx` — the Search page, shown at the `/` route
- `src/pages/MyListPage.tsx` — the My List page, shown at `/my-list`
- `src/components/HeaderNav.tsx` — the top navigation bar

File changed: `src/App.tsx`

Wrapped the app in `BrowserRouter` and defined the two routes:
```tsx
// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen halftone text-white">
        <HeaderNav />
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

## Step 4 — Choose the API

Both Kitsu and Jikan were tested live before any code was written.

Why Jikan was chosen over Kitsu:

| Field | Kitsu | Jikan |
|---|---|---|
| Search "naruto" top result | A spin-off novel | Naruto (correct) |
| Chapter count | 5 | 700 |
| Author included | No | Yes |
| Genres included | No | Yes |
| Score and popularity | No | Yes |

File created: `src/services/jikan.ts`

All API calls go through one file so fetch logic is never repeated:
```ts
// The base address for every request
const BASE_URL = 'https://api.jikan.moe/v4'

// Search manga by text
export async function searchManga(query: string, page = 1) {
  const params = new URLSearchParams({ q: query, limit: '20', page: String(page) })
  const res = await fetch(`${BASE_URL}/manga?${params}`)
  if (!res.ok) throw new Error(`Jikan error ${res.status}`)
  return res.json()
}
```

Jikan API docs: https://docs.api.jikan.moe/

---

## Step 5 — Build the Search Page

Wired the search input to the Jikan API. Results appear automatically as the user types. This technique is called debouncing — the code waits 500ms after the user stops typing before making the request, so the API is not called on every single keystroke.

React concepts used:

| Concept | How it was used |
|---|---|
| `useState` | Stores the query text, results, loading flag, error message |
| `useEffect` | Watches the query and triggers a search after a 500ms pause |
| `async/await` | Makes the API call without freezing the page |
| `try/catch/finally` | Handles errors and always stops the loading state |

File changed: `src/pages/HomePage.tsx`
```tsx
// Runs every time the query value changes
useEffect(() => {
  const cleanQuery = query.trim()
  if (cleanQuery === '') return

  const timeoutId = setTimeout(() => {
    fetchPage(cleanQuery, 1)
  }, 500) // wait 500ms before fetching

  return () => clearTimeout(timeoutId) // cancel if user keeps typing
}, [query])
```

---

## Step 6 — Add Pagination

Added Prev and Next buttons that load a different page of results from the API.

Every Jikan response includes a pagination object:
```json
{
  "pagination": {
    "last_visible_page": 40,
    "has_next_page": true,
    "current_page": 1
  }
}
```

The `last_visible_page` value is saved in state and used to disable the Next button on the final page.

File changed: `src/pages/HomePage.tsx`
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

Clicking a manga card fetches that manga's full details and opens a panel that slides in from the right side of the screen.

File created: `src/components/DetailsPanel.tsx`

The panel uses `fixed` positioning so it floats over the page content:
```tsx
// fixed = stays in place even when the page scrolls
// inset-0 = stretches to cover the full screen
// z-50 = appears on top of all other elements
<div className="fixed inset-0 z-50 flex justify-end">
  {/* Dark overlay — clicking it closes the panel */}
  <div className="absolute inset-0 bg-black/60" onClick={onClose} />
  {/* The panel itself on the right side */}
  <aside className="relative w-full max-w-md bg-gray-950 ...">
    ...
  </aside>
</div>
```

---

## Step 8 — Add Redux

Installed Redux Toolkit so the saved manga list is available on every page, not just inside one component.

Command run:
```bash
npm install @reduxjs/toolkit react-redux
```

File created: `src/store/listSlice.ts`

A slice is one section of the global state. This one has three actions:
```ts
const listSlice = createSlice({
  name: 'list',
  initialState: { items: [] },
  reducers: {
    // Add manga if it is not already saved
    addToList(state, action) {
      const exists = state.items.find(m => m.id === action.payload.id)
      if (!exists) {
        state.items.push({ ...action.payload, status: 'Plan to Read' })
      }
    },
    // Remove a manga by its ID
    removeFromList(state, action) {
      state.items = state.items.filter(m => m.id !== action.payload)
    },
    // Move to the next reading status
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

File created: `src/store/store.ts`
```ts
export const store = configureStore({
  reducer: { list: listReducer },
})
```

File changed: `src/main.tsx`

Wrapped the app in `Provider` so every component can read from and write to the store:
```tsx
<Provider store={store}>
  <App />
</Provider>
```

---

## Step 9 — localStorage Persistence

Made the saved list survive page refreshes by reading from and writing to `localStorage`, which is the browser's built-in key/value storage.

File changed: `src/store/store.ts`
```ts
// Load the saved list from the browser when the app starts
function loadList() {
  try {
    const raw = localStorage.getItem('mangaList')
    return raw ? { list: JSON.parse(raw) } : undefined
  } catch {
    return undefined // if the data is corrupted, start with an empty list
  }
}

// Create the store and pre-fill it with the saved list
export const store = configureStore({
  reducer: { list: listReducer },
  preloadedState: loadList(),
})

// After every change, save the updated list to localStorage
store.subscribe(() => {
  localStorage.setItem('mangaList', JSON.stringify(store.getState().list))
})
```

---

## Step 10 — My List Page

Built the My List page. It reads from the Redux store and displays all saved manga with status chips and remove buttons.

File changed: `src/pages/MyListPage.tsx`

Two Redux hooks are used to read and update state:
```tsx
const dispatch = useDispatch()  // used to call actions like removeFromList
const items = useSelector((state) => state.list.items) // reads the saved list
```

---

## Step 11 — Loading Skeletons, Error Banner, Empty State

Added feedback for every loading, error, and empty scenario so the app never just shows a blank screen.

Loading skeletons in `src/pages/HomePage.tsx`:
```tsx
{/* While loading, show 8 grey pulsing placeholder cards */}
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

Error banner in `src/pages/HomePage.tsx`:
```tsx
{error && (
  <div className="bg-red-900/40 border border-red-500 text-red-300 ...">
    <span>{error}</span>
    {/* Retry button calls the same fetch function again */}
    <button onClick={() => fetchPage(query, page)}>Retry</button>
  </div>
)}
```

---

## Step 12 — Manga Theme

Redesigned the visual style to match a manga aesthetic.

File changed: `index.html` — added Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Bangers&display=swap" rel="stylesheet" />
```

File changed: `src/index.css` — halftone background and font helper class:
```css
/* Dot pattern background, common in printed manga */
.halftone {
  background-color: #0a0a0f;
  background-image: radial-gradient(circle, #ffffff08 1px, transparent 1px);
  background-size: 24px 24px;
}

/* Apply the Bangers font to any element */
.font-manga {
  font-family: 'Bangers', cursive;
  letter-spacing: 0.05em;
}
```

File changed: `src/components/HeaderNav.tsx` — manga-style logo with kanji:
```tsx
<span className="font-manga text-3xl text-red-500 tracking-widest">
  漫画 Manga Hub
</span>
```

---

## Step 13 — Genre Filter Chips

Added genre chips above the search bar so users can browse by theme without knowing a specific title.

File changed: `src/services/jikan.ts` — added a genre fetch function:
```ts
// Fetch manga filtered by a genre ID, sorted by popularity
export async function getMangaByGenre(genreId: number, page = 1) {
  const params = new URLSearchParams({
    genres: String(genreId), // Jikan identifies genres by number
    limit: '20',
    page: String(page),
    order_by: 'popularity',
  })
  const res = await fetch(`${BASE_URL}/manga?${params}`)
  if (!res.ok) throw new Error(`Jikan error ${res.status}`)
  return res.json()
}
```

File changed: `src/pages/HomePage.tsx` — genre list and click handler:
```tsx
// Each genre maps to a numeric ID that Jikan recognizes
const GENRES = [
  { id: 1,  name: 'Action' },
  { id: 22, name: 'Romance' },
  { id: 14, name: 'Horror' },
  // ...more genres
]

// Clicking a chip fetches that genre's manga
// Clicking the same chip again clears the filter
async function handleGenreClick(genreId: number) {
  if (activeGenre === genreId) {
    setActiveGenre(null)
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
│   ├── HeaderNav.tsx       -- top nav bar, links, manga logo
│   └── DetailsPanel.tsx    -- slide-over panel with manga info
├── pages/
│   ├── HomePage.tsx        -- search bar, genre chips, results grid
│   └── MyListPage.tsx      -- saved manga with status chips
├── services/
│   └── jikan.ts            -- all API fetch functions
├── store/
│   ├── listSlice.ts        -- Redux actions: add, remove, cycleStatus
│   └── store.ts            -- Redux store and localStorage logic
├── App.tsx                 -- router and page layout
├── main.tsx                -- app entry point, Redux Provider
└── index.css               -- Tailwind directives, halftone, font helpers
```

---

## Step 14 — Trending

Added a Trending button that loads the current top-ranked manga from Jikan's `/top/manga` endpoint. This gives users a way to discover popular titles without needing to search for anything.

File changed: `src/services/jikan.ts` — added a new fetch function:
```ts
// Get top ranked manga from MyAnimeList
export async function getTopManga(page = 1, signal?: AbortSignal) {
  const params = new URLSearchParams({ limit: '20', page: String(page) })
  const res = await fetch(`${BASE_URL}/top/manga?${params}`, { signal })
  if (!res.ok) throw new Error(`Jikan error ${res.status}`)
  return res.json()
}
```

File changed: `src/pages/HomePage.tsx` — added `showTrending` state and a handler:
```tsx
// Clicking Trending loads top manga, clicking again clears it
async function handleTrending() {
  if (showTrending) {
    setShowTrending(false)
    setResults([])
    return
  }
  setShowTrending(true)
  const data = await getTopManga(1)
  setResults(data.data ?? [])
}
```

---

## Step 15 — Score Filter

Added a Min Score dropdown that filters the visible results by rating. It works on the client side — no extra API call is needed — by filtering the results array before rendering.

File changed: `src/pages/HomePage.tsx` — added `minScore` state and filter in the render:
```tsx
// 0 means no filter, otherwise only show manga at or above the selected score
const [minScore, setMinScore] = useState(0)

// Applied when mapping results to cards
results
  .filter(manga => minScore === 0 || (manga.score ?? 0) >= minScore)
  .map(manga => ( ... ))
```

The dropdown options are: All, 6+, 7+, 8+, 9+.

---

## Step 16 — Favorites

Added a heart button to each saved manga card in My List. Clicking it toggles a `favorite` flag stored in Redux alongside the existing status field.

File changed: `src/store/listSlice.ts` — added `favorite` field and `toggleFavorite` action:
```ts
// Added to the SavedManga interface
favorite: boolean

// New reducer action
toggleFavorite(state, action: PayloadAction<number>) {
  const manga = state.items.find(m => m.id === action.payload)
  if (manga) manga.favorite = !manga.favorite
},
```

File changed: `src/pages/MyListPage.tsx` — heart button on each card:
```tsx
<button
  onClick={() => dispatch(toggleFavorite(manga.id))}
  className={manga.favorite ? 'text-red-500' : 'text-gray-600'}
>
  {manga.favorite ? '♥' : '♡'}
</button>
```

---

## Step 17 — Footer

Added a footer component that appears at the bottom of every page with the author handle and contact email.

File created: `src/components/Footer.tsx`

File changed: `src/App.tsx` — added `flex flex-col` to the outer div so the footer is always pushed to the bottom, and wrapped the routes in `flex-1`:
```tsx
<div className="min-h-screen halftone text-white flex flex-col">
  <HeaderNav />
  <div className="flex-1">
    <Routes>...</Routes>
  </div>
  <Footer />
</div>
```

---

## Step 18 — Score Filter (Attempted and Removed)

A "Filter by rating" dropdown was added to let users filter results by minimum score (Good 6+, Great 7+, Excellent 8+, Top Rated 9+).

The implementation used a client-side filter applied to the current page of results before rendering:
```tsx
results
  .filter(manga => minScore === 0 || (manga.score ?? 0) >= minScore)
  .map(manga => ( ... ))
```

The problem was that this only filtered the 20 results currently loaded on the page. The pagination counter still showed the full unfiltered total from Jikan (e.g. "Page 1 of 4114"), which was misleading. Selecting "Top Rated (9+)" would show only 3 cards but the pagination still implied thousands of pages.

Attempts to fix it:
- First tried resetting the page count when a filter was applied , but Jikan does not return a filtered page count.
- Then tried hiding pagination while the filter was active and showing a note ("Showing filtered results from this page only") , but this made the feature feel incomplete and confusing.

The root cause is that accurate score filtering requires a server-side request with Jikan's `min_score` parameter so the API handles the filtering and returns the correct pagination. Client-side filtering of paginated data is not reliable.

The feature was removed. A proper server-side implementation is listed in the README as a future improvement.

---

## All Packages Installed

```bash
# Vite scaffolded these in Step 1
react, react-dom, typescript, vite, @types/react, @types/react-dom

# Step 2 — Tailwind CSS
npm install -D tailwindcss@3 postcss autoprefixer

# Step 3 — React Router
npm install react-router-dom

# Step 8 — Redux
npm install @reduxjs/toolkit react-redux
```
