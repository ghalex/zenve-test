import { createSlice } from '@reduxjs/toolkit'
import type { AppRootState } from '@/store'
import type { AppSnapshot } from '@/types'

interface AppState {
  snapshot: AppSnapshot
}

const initialState: AppState = {
  snapshot: {
    title: 'Zenve',
    environment: 'local',
    status: 'ready',
  },
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
})

export const selectAppSnapshot = (state: AppRootState) => state.app.snapshot
export const appReducer = appSlice.reducer
