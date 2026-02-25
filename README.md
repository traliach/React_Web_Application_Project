# 漫画 Manga Hub

A manga discovery and personal tracking app built with React.
Search any manga by title or genre, view details, and save titles to your personal reading list.

> Built as the SBA 320H React Web Application Project at Per Scholas.

---

## 🔗 Live Link

**https://celebrated-sprinkles-1b954a.netlify.app**

---

## 🛠️ Technologies Used

| Technology | What it does in this project |
|---|---|
| **React 19** | Builds the UI using components |
| **TypeScript** | Adds types so we catch errors early |
| **Vite** | Runs the dev server and builds the app |
| **Tailwind CSS** | Styles every element using class names |
| **Redux Toolkit** | Stores the saved manga list globally |
| **React Redux** | Connects Redux state to React components |
| **React Router v7** | Switches between pages without reloading |
| **Jikan API** | Free manga data — no API key needed |
| **localStorage** | Saves your list even after you refresh |
| **Google Fonts (Bangers)** | Gives the app a manga-style font |

---

## ✨ Features

- **Live search** — results appear automatically as you type
- **Genre filter chips** — browse by Action, Romance, Horror, Fantasy and more
- **Details panel** — click any card to see cover, genres, score, author, synopsis
- **My List** — save manga and track reading status
- **Status cycling** — click the chip to rotate: `Plan to Read → Reading → Completed`
- **Pagination** — browse through pages of results with Prev / Next
- **Persistent list** — your list is saved to the browser and survives a refresh
- **Loading skeletons** — animated cards appear while data loads
- **Error banner** — friendly message with a Retry button if something goes wrong
- **Manga theme** — red/black color scheme, Bangers font, halftone background, 漫画 logo

---

## 📖 How to Use

1. **Search** — type a manga name in the search box (results appear as you type)
2. **Browse by genre** — click any chip like ⚔️ Action or 💕 Romance
3. **View details** — click any manga card
4. **Save it** — click **+ Add to My List** inside the panel
5. **Track it** — go to **My List**, click the status chip to update your progress
6. **Remove it** — click the **Remove** button on any saved card

---

## 🚀 Run This Project Locally

> Make sure you have **Node.js** installed first.

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/React_Web_Application_Project.git

# 2. Go into the project folder
cd React_Web_Application_Project

# 3. Install all packages
npm install

# 4. Start the development server
npm run dev
```

Then open `http://localhost:5173` in your browser.

---

## ⚠️ Known Issues

- **Jikan rate limit** — the API allows ~1 request per second. Typing very fast may briefly show no results. Just pause for a moment and they'll appear.
- **Local only** — your saved list lives in your browser. Clearing browser data will erase it.
- **Ongoing manga** — some chapter counts show as N/A because the manga is still publishing.

---

## 🔮 What I Would Add Next

- Search within My List
- Sort results by score or title
- Track progress per volume/chapter
- User accounts with cloud-saved lists
