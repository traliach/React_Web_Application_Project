import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Three possible reading statuses
export type Status = 'Plan to Read' | 'Reading' | 'Completed'

// Shape of one saved manga
export interface SavedManga {
  id: number
  title: string
  image: string
  status: Status
}

// Shape of the list state
interface ListState {
  items: SavedManga[]
}

const initialState: ListState = { items: [] }

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    // Add manga if not saved
    addToList(state, action: PayloadAction<Omit<SavedManga, 'status'>>) {
      const exists = state.items.find(m => m.id === action.payload.id)
      if (!exists) {
        state.items.push({ ...action.payload, status: 'Plan to Read' })
      }
    },
    // Remove manga by ID
    removeFromList(state, action: PayloadAction<number>) {
      state.items = state.items.filter(m => m.id !== action.payload)
    },
    // Rotate to next status
    cycleStatus(state, action: PayloadAction<number>) {
      const manga = state.items.find(m => m.id === action.payload)
      if (!manga) return
      const cycle: Status[] = ['Plan to Read', 'Reading', 'Completed']
      const next = (cycle.indexOf(manga.status) + 1) % cycle.length
      manga.status = cycle[next]
    },
  },
})

// Export actions for use in components
export const { addToList, removeFromList, cycleStatus } = listSlice.actions
export default listSlice.reducer
