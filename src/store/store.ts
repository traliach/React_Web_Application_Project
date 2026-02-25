import { configureStore } from '@reduxjs/toolkit'
import listReducer from './listSlice'

// Load saved list from browser
function loadList() {
  try {
    const raw = localStorage.getItem('mangaList')
    return raw ? { list: JSON.parse(raw) } : undefined
  } catch {
    return undefined
  }
}

// Create the Redux store
export const store = configureStore({
  reducer: { list: listReducer },
  // Start with saved data
  preloadedState: loadList(),
})

// Save list on every change
store.subscribe(() => {
  localStorage.setItem('mangaList', JSON.stringify(store.getState().list))
})

// Types used across the app
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
