import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AppRootState } from '@/store'

interface BookingState {
  selectedDate: string | null
  selectedSlotStart: string | null
  selectedDisplayTimezone: string | null
  guestName: string
  guestEmail: string
  guestNote: string
}

const initialState: BookingState = {
  selectedDate: null,
  selectedSlotStart: null,
  selectedDisplayTimezone: null,
  guestName: '',
  guestEmail: '',
  guestNote: '',
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string | null>) => {
      state.selectedDate = action.payload
      state.selectedSlotStart = null
    },
    setSelectedSlotStart: (state, action: PayloadAction<string | null>) => {
      state.selectedSlotStart = action.payload
    },
    setSelectedDisplayTimezone: (state, action: PayloadAction<string | null>) => {
      state.selectedDisplayTimezone = action.payload
    },
    setGuestName: (state, action: PayloadAction<string>) => {
      state.guestName = action.payload
    },
    setGuestEmail: (state, action: PayloadAction<string>) => {
      state.guestEmail = action.payload
    },
    setGuestNote: (state, action: PayloadAction<string>) => {
      state.guestNote = action.payload
    },
    resetBookingSelection: () => initialState,
  },
})

export const {
  resetBookingSelection,
  setSelectedDate,
  setSelectedSlotStart,
  setSelectedDisplayTimezone,
  setGuestName,
  setGuestEmail,
  setGuestNote,
} = bookingSlice.actions
export const selectSelectedDate = (state: AppRootState) => state.booking.selectedDate
export const selectSelectedSlotStart = (state: AppRootState) => state.booking.selectedSlotStart
export const selectSelectedDisplayTimezone = (state: AppRootState) => state.booking.selectedDisplayTimezone
export const selectGuestName = (state: AppRootState) => state.booking.guestName
export const selectGuestEmail = (state: AppRootState) => state.booking.guestEmail
export const selectGuestNote = (state: AppRootState) => state.booking.guestNote
export default bookingSlice.reducer
