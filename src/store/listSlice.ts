import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Reading status options
export type Status = 'Plan to Read' | 'Reading' | 'Completed'

// One saved manga item
export interface SavedManga {
  id: number
  title: string
  image: string
  status: Status
  favorite: boolean
}

// List state type
interface ListState {
  items: SavedManga[]
}

const initialState: ListState = { items: [] }

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    // Add manga if new
    addToList(state, action: PayloadAction<Omit<SavedManga, 'status' | 'favorite'>>) {
      const exists = state.items.find(m => m.id === action.payload.id)
      if (!exists) {
        state.items.push({ ...action.payload, status: 'Plan to Read', favorite: false })
      }
    },
    // Toggle favorite on/off
    toggleFavorite(state, action: PayloadAction<number>) {
      const manga = state.items.find(m => m.id === action.payload)
      if (manga) manga.favorite = !manga.favorite
    },
    // Remove manga by id
    removeFromList(state, action: PayloadAction<number>) {
      state.items = state.items.filter(m => m.id !== action.payload)
    },
    // Move to next status
    cycleStatus(state, action: PayloadAction<number>) {
      const manga = state.items.find(m => m.id === action.payload)
      if (!manga) return
      const cycle: Status[] = ['Plan to Read', 'Reading', 'Completed']
      const next = (cycle.indexOf(manga.status) + 1) % cycle.length
      manga.status = cycle[next]
    },
  },
})

// Export action creators
export const { addToList, removeFromList, cycleStatus, toggleFavorite } = listSlice.actions
export default listSlice.reducer
