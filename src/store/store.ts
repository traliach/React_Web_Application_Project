import { configureStore } from '@reduxjs/toolkit'
import listReducer from './listSlice'

// Load list from storage
function loadList() {
  try {
    const raw = localStorage.getItem('mangaList')
    return raw ? { list: JSON.parse(raw) } : undefined
  } catch {
    return undefined
  }
}

// Build Redux store
export const store = configureStore({
  reducer: { list: listReducer },
  // Start with saved list
  preloadedState: loadList(),
})

// Save list after changes
store.subscribe(() => {
  localStorage.setItem('mangaList', JSON.stringify(store.getState().list))
})

// App-wide store types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
