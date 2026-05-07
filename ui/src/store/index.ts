import { configureStore } from '@reduxjs/toolkit'
import { appReducer } from '@/store/app'
import { authReducer } from '@/store/auth'
import { bookingApi, bookingReducer } from '@/store/booking'
import { settingsApi } from '@/store/settings'

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    booking: bookingReducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bookingApi.middleware, settingsApi.middleware),
})

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
