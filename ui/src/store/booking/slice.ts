import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AppRootState } from '@/store'

interface BookingState {
  selectedDate: string | null
  selectedSlotStart: string | null
}

const initialState: BookingState = {
  selectedDate: null,
  selectedSlotStart: null,
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
    resetBookingSelection: () => initialState,
  },
})

export const { resetBookingSelection, setSelectedDate, setSelectedSlotStart } = bookingSlice.actions
export const selectSelectedDate = (state: AppRootState) => state.booking.selectedDate
export const selectSelectedSlotStart = (state: AppRootState) => state.booking.selectedSlotStart
export default bookingSlice.reducer
