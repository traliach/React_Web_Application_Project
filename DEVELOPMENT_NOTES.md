# Manga Hub — Development Notes

A full record of every major step, installation, and decision made during this project.

---

## Step 1 — Project Scaffold

**What we did:** Created a new Vite + React + TypeScript app inside the existing git repo.

**Commands run:**
```bash
cd React_Web_Application_Project
npm create vite@latest . -- --template react-ts
npm install
```

**Why:** Vite gives us a fast dev server and modern build tool. TypeScript adds type safety.

---

## Step 2 — Tailwind CSS Setup

**What we did:** Installed Tailwind CSS v3 and configured it to scan our source files.

**Commands run:**
```bash
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

**Files changed:**
- `tailwind.config.js` — added content paths `["./index.html", "./src/**/*.{ts,tsx}"]`
- `src/index.css` — replaced all default CSS with the three Tailwind directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Step 3 — React Router

**What we did:** Added client-side routing with three pages.

**Command run:**
```bash
npm install react-router-dom
```

**Files created:**
- `src/pages/HomePage.tsx` — search and results page (`/`)
- `src/pages/MyListPage.tsx` — saved list page (`/my-list`)
- `src/components/HeaderNav.tsx` — top navigation bar

**File changed:**
- `src/App.tsx` — wrapped app in `<BrowserRouter>` with `<Routes>`

---

## Step 4 — API Choice: Jikan (Unofficial MyAnimeList)

**What we did:** Chose Jikan over Kitsu after testing both APIs live.

**Why Jikan won:**
- Returns the correct top result (e.g. "Naruto" for a Naruto search)
- Includes author, genres, score, chapter count, publish dates
- Free, no API key required
- Simple REST API

**Command run:** _(none — just created the file)_

**File created:**
- `src/services/jikan.ts` — all fetch functions live here:
  - `searchManga(query, page)` — search by text
  - `getMangaById(id)` — fetch one manga's full details
  - `getMangaByGenre(genreId, page)` — browse by genre

---

## Step 5 — Search Page with Live Results

**What we did:** Wired the search input to the Jikan API with debounce.

**Key concepts used:**
- `useState` — track query, results, loading, error, page
- `useEffect` — run search 500ms after user stops typing (debounce)
- `async/await` + `try/catch/finally` — handle API calls safely

---

## Step 6 — Pagination

**What we did:** Added Prev / Next buttons using Jikan's `page` and `last_visible_page` fields.

---

## Step 7 — Details Slide-Over Panel

**What we did:** Clicking a manga card fetches full details and shows a panel sliding in from the right.

**File created:**
- `src/components/DetailsPanel.tsx`

---

## Step 8 — Redux Toolkit (State Management)

**What we did:** Added Redux to manage the saved manga list globally across all pages.

**Command run:**
```bash
npm install @reduxjs/toolkit react-redux
```

**Files created:**
- `src/store/listSlice.ts` — three actions:
  - `addToList` — save a manga (default status: Plan to Read)
  - `removeFromList` — remove by ID
  - `cycleStatus` — rotate Plan to Read → Reading → Completed
- `src/store/store.ts` — configures the Redux store

**File changed:**
- `src/main.tsx` — wrapped app in `<Provider store={store}>`

---

## Step 9 — localStorage Persistence

**What we did:** The saved list now survives page refreshes.

**How it works (in `store.ts`):**
- `loadList()` reads from `localStorage` before the store is created (`preloadedState`)
- `store.subscribe()` saves the list to `localStorage` after every change

---

## Step 10 — My List Page

**What we did:** Built the My List page showing all saved manga with status chips and remove buttons.

---

## Step 11 — Loading Skeletons + Error Banner + Empty State

**What we did:** Added UI feedback for every loading/error/empty scenario.

- **Skeletons** — 8 animated grey cards show while results load
- **Error banner** — red banner with a Retry button on API failure
- **Empty state** — message shown when search returns no results
- **Debounce fix** — live search clears results when input is empty

---

## Step 12 — Manga Theme UI

**What we did:** Redesigned the UI with a manga aesthetic.

**Changes:**
- Added **Bangers** font (Google Fonts) for headings and buttons
- Changed color scheme from indigo → **red/black**
- Added **halftone dot background** (CSS `radial-gradient`)
- Added **red border-bottom** on the header
- Cards now have a **red hover border + glow**
- Details panel has a **red left border**
- Empty list shows a large **漫画** kanji watermark
- 漫画 kanji added to the logo and page title

---

## Step 13 — Genre Filter Chips

**What we did:** Added genre chips above the search bar so users can browse by theme.

**Genres added:** Action, Adventure, Comedy, Drama, Fantasy, Romance, Mystery, Horror, Supernatural, Shounen

**How it works:**
- Each chip maps to a Jikan genre ID
- Clicking a chip calls `getMangaByGenre(genreId)` and shows results
- Clicking the active chip again clears the filter
- Typing in the search box automatically clears the genre filter

---

## Final File Structure

```
src/
├── components/
│   ├── HeaderNav.tsx       # Top nav bar
│   └── DetailsPanel.tsx    # Slide-over details
├── pages/
│   ├── HomePage.tsx        # Search + genre filter
│   └── MyListPage.tsx      # Saved list
├── services/
│   └── jikan.ts            # All API calls
├── store/
│   ├── listSlice.ts        # Redux slice
│   └── store.ts            # Redux store + localStorage
├── App.tsx                 # Routes
├── main.tsx                # App entry point
└── index.css               # Tailwind + custom styles
```

---

## All npm Packages Installed

| Package | Version | Purpose |
|---|---|---|
| react | 19 | UI library |
| react-dom | 19 | DOM rendering |
| typescript | latest | Type safety |
| vite | 8 beta | Build tool |
| tailwindcss | 3 | Utility CSS |
| postcss | latest | CSS processing |
| autoprefixer | latest | CSS vendor prefixes |
| react-router-dom | latest | Client routing |
| @reduxjs/toolkit | latest | State management |
| react-redux | latest | Redux + React bridge |
