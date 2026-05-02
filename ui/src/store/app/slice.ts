import { createSlice } from '@reduxjs/toolkit'
import config from '@/config'
import type { AppRootState } from '@/store'

interface AppState {
  workspaceName: string
}

const initialState: AppState = {
  workspaceName: config.appName,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
})

export const selectWorkspaceName = (state: AppRootState) => state.app.workspaceName
export default appSlice.reducer
