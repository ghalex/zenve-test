import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import config from '@/config'
import type { BookingPageContextResponse } from '@/types'

interface GetBookingPageContextArgs {
  workspaceSlug: string
  eventSlug: string
}

export const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery: fetchBaseQuery({ baseUrl: config.apiBaseUrl }),
  endpoints: (builder) => ({
    getBookingPageContext: builder.query<BookingPageContextResponse, GetBookingPageContextArgs>({
      query: ({ workspaceSlug, eventSlug }) => `/public/booking-links/${workspaceSlug}/${eventSlug}`,
    }),
  }),
})

export const { useGetBookingPageContextQuery } = bookingApi
