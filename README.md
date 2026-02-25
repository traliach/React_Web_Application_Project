# 漫画 Manga Hub

A manga discovery and personal tracking app built with React.
Search any manga by title or genre, view details, and save titles to a personal reading list.

Built as the SBA 320H React Web Application Project at Per Scholas.

---

## Development Notes

For a full step-by-step breakdown of every decision, installation, and code change made during this project, see [DEVELOPMENT_NOTES.md](./DEVELOPMENT_NOTES.md).

---

## Live Link

**https://meek-fenglisu-25bc7e.netlify.app**

---

## Technologies Used

| Technology | Purpose in this project |
|---|---|
| React 19 | Builds the UI using components |
| TypeScript | Adds types so errors are caught early |
| Vite | Runs the dev server and builds the app |
| Tailwind CSS | Styles elements using utility class names |
| Redux Toolkit | Stores the saved manga list globally |
| React Redux | Connects Redux state to React components |
| React Router v7 | Switches between pages without reloading |
| Jikan API | Free manga data, no API key required |
| localStorage | Saves the list even after a page refresh |
| Google Fonts (Bangers) | Manga-style display font |

---

## Features

- Live search — results load as you type
- Genre filter chips — browse by Action, Romance, Horror, Fantasy, and more
- Details panel — click any card to see the cover, genres, score, author, and synopsis
- My List — save manga and track reading status
- Status cycling — click the chip to move through: Plan to Read, Reading, Completed
- Pagination — move through result pages with Prev and Next buttons
- Persistent list — the saved list stays in the browser after a refresh
- Loading skeletons — placeholder cards show while data is loading
- Error banner — shows a message and a Retry button if a request fails
- Manga theme — red and black color scheme, Bangers font, halftone background, 漫画 logo
- Trending — browse the current top-ranked manga with one click
- Favorites — heart button on saved manga in My List
- Score filter — filter any results by minimum score (6+, 7+, 8+, 9+)
- Responsive layout — works on desktop and mobile
- Footer — built-by credit with contact info on every page

---

## How to Use

1. Type a manga name in the search box. Results appear as you type.
2. Or click a genre chip like Action or Romance to browse by theme.
3. Or click Trending to see the current top-ranked manga.
4. Use the Min Score dropdown to filter results by rating.
5. Click any manga card to open the details panel.
6. Click Add to My List to save it.
7. Go to My List, click the heart to mark a favorite, and click the status chip to update progress.
8. Click Remove to delete a title from the list.

---

## Run This Project Locally

Make sure Node.js is installed first.

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/React_Web_Application_Project.git

# Go into the project folder
cd React_Web_Application_Project

# Install all packages
npm install

# Start the development server
npm run dev
```

Then open `http://localhost:5173` in your browser.

---

## Known Issues

- Jikan rate limit — the API allows about one request per second. Typing very fast may briefly show no results. Pausing for a moment will fix it.
- Local only — the saved list lives in the browser. Clearing browser data will erase it.
- Ongoing manga — some chapter counts show as N/A because the series is still publishing.

---

---

Built by @traliach

---

## What I Would Add Next

- Search within My List
- Sort saved list by score or title
- Track reading progress per volume or chapter
- User accounts with a cloud-saved list
- Trending page with real-time data
