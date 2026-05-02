import { configureStore } from '@reduxjs/toolkit'
import { appReducer } from '@/store/app'
import { bookingApi, bookingReducer } from '@/store/booking'

export const store = configureStore({
  reducer: {
    app: appReducer,
    booking: bookingReducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bookingApi.middleware),
})

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
