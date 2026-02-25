# Manga Hub

A manga discovery and tracking app built with React, Redux Toolkit, and the Jikan API.

## Live Link

_Add your Netlify URL here after deploying_

## Technologies Used

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Redux Toolkit + React Redux
- React Router v7
- Jikan API (unofficial MyAnimeList REST API)

## Approach

Built as a single-page application with three views:

- **Search** — live search with debounce, cover grid, pagination
- **Details panel** — slide-over with genres, score, author, synopsis
- **My List** — saved manga with status cycling (Plan to Read → Reading → Completed)

State is managed with Redux Toolkit. The list persists across page refreshes via `localStorage`.

## Usage

1. Type any manga title in the search box — results appear automatically
2. Click a card to open the details panel
3. Click **+ Add to My List** to save it
4. Go to **My List** to manage saved titles and cycle their status

## Unsolved Problems

- Jikan API has a rate limit (1 req/s); rapid typing may occasionally return empty results
- No user authentication — list is local to the browser only

## Setup

```bash
npm install
npm run dev
```
