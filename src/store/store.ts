import { configureStore } from '@reduxjs/toolkit'
import listReducer from './listSlice'

function loadList() {
  try {
    const raw = localStorage.getItem('mangaList')
    return raw ? { list: JSON.parse(raw) } : undefined
  } catch {
    return undefined
  }
}

export const store = configureStore({
  reducer: { list: listReducer },
  preloadedState: loadList(),
})

store.subscribe(() => {
  localStorage.setItem('mangaList', JSON.stringify(store.getState().list))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
