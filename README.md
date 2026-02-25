# 漫画 Manga Hub

A manga discovery and personal tracking app. Search any manga by title or browse by genre, view details, and save titles to your personal list with reading status tracking.

## Live Link

_Add your Netlify URL here after deploying_

---

## Technologies Used

| Technology | Purpose |
|---|---|
| React 19 + TypeScript | UI components and type safety |
| Vite | Build tool and dev server |
| Tailwind CSS | Styling and responsive layout |
| Redux Toolkit | Global state management |
| React Redux | Connect Redux to React components |
| React Router v7 | Client-side page routing |
| Jikan API (unofficial MAL) | Free manga data (no API key needed) |
| localStorage | Persist saved list across page refreshes |
| Google Fonts (Bangers) | Manga-style typography |

---

## Features

- **Live search** — results appear as you type (debounced 500ms)
- **Genre filter chips** — browse by Action, Romance, Horror, Fantasy and more
- **Details slide-over panel** — cover, genres, score, author, synopsis
- **My List** — save manga with status: Plan to Read → Reading → Completed
- **Pagination** — Prev / Next through all results
- **Persistent list** — saved to localStorage, survives page refresh
- **Loading skeletons** — animated placeholders while fetching
- **Error banner** — user-friendly error message with Retry button
- **Manga theme** — halftone background, Bangers font, red/black color scheme

---

## Approach

Built as a single-page application with three views:

1. **Search / Home (`/`)** — live search bar + genre chips, responsive card grid, pagination
2. **Details Panel** — slide-over triggered by card click, shows full manga info
3. **My List (`/my-list`)** — grid of saved titles, click status chip to cycle it, remove button

State is split into:
- `listSlice` — saved manga items, add/remove, status cycle
- Local component state — search query, results, loading, pagination

---

## Usage Instructions

1. Type any manga title in the search box — results load automatically
2. Or click a **genre chip** (Action, Romance, etc.) to browse by theme
3. Click any manga card to open the details panel
4. Click **+ Add to My List** to save it
5. Navigate to **My List** to see saved titles
6. Click the colored status chip to cycle: `Plan to Read → Reading → Completed`
7. Click **Remove** to delete from your list

---

## Setup (Run Locally)

```bash
git clone https://github.com/YOUR_USERNAME/React_Web_Application_Project.git
cd React_Web_Application_Project
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Unsolved Problems / Known Issues

- Jikan API has a rate limit (~1 req/sec). Typing very fast may briefly return empty results.
- List data is stored locally per browser — no user accounts or cloud sync.
- `chapters` field is sometimes `null` for ongoing manga (displayed as N/A).

---

## Future Improvements

- Add a search within My List
- Add sort options (by score, alphabetical)
- Add volume/chapter progress tracking
- Deploy with persistent backend (database + user auth)
