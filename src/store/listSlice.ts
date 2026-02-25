import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type Status = 'Plan to Read' | 'Reading' | 'Completed'

export interface SavedManga {
  id: number
  title: string
  image: string
  status: Status
}

interface ListState {
  items: SavedManga[]
}

const initialState: ListState = { items: [] }

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addToList(state, action: PayloadAction<Omit<SavedManga, 'status'>>) {
      const exists = state.items.find(m => m.id === action.payload.id)
      if (!exists) {
        state.items.push({ ...action.payload, status: 'Plan to Read' })
      }
    },
    removeFromList(state, action: PayloadAction<number>) {
      state.items = state.items.filter(m => m.id !== action.payload)
    },
    cycleStatus(state, action: PayloadAction<number>) {
      const manga = state.items.find(m => m.id === action.payload)
      if (!manga) return
      const cycle: Status[] = ['Plan to Read', 'Reading', 'Completed']
      const next = (cycle.indexOf(manga.status) + 1) % cycle.length
      manga.status = cycle[next]
    },
  },
})

export const { addToList, removeFromList, cycleStatus } = listSlice.actions
export default listSlice.reducer
