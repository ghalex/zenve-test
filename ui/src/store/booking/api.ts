import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import config from '@/config'
import { createMockBooking, findMockBookingContext, findMockBookingSlots } from '@/lib/mock-booking'
import type { BookingPageContextResponse, BookingSlotsResponse, CreateBookingRequest, CreateBookingResponse } from '@/types'

interface GetBookingPageContextArgs {
  workspaceSlug: string
  eventSlug: string
}

interface GetBookingSlotsArgs extends GetBookingPageContextArgs {
  date: string
}

export const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery: fetchBaseQuery({ baseUrl: config.apiBaseUrl }),
  endpoints: (builder) => ({
    getBookingPageContext: builder.query<BookingPageContextResponse, GetBookingPageContextArgs>({
      async queryFn(args, _api, _extraOptions, fetchWithBQ) {
        const mockContext = findMockBookingContext(args.workspaceSlug, args.eventSlug)

        if (mockContext) {
          return { data: mockContext }
        }

        const result = await fetchWithBQ(`/public/booking-links/${args.workspaceSlug}/${args.eventSlug}`)

        if (result.error) {
          return { error: result.error as FetchBaseQueryError }
        }

        return { data: result.data as BookingPageContextResponse }
      },
    }),
    getBookingSlots: builder.query<BookingSlotsResponse, GetBookingSlotsArgs>({
      async queryFn(args, _api, _extraOptions, fetchWithBQ) {
        const mockSlots = findMockBookingSlots(args.workspaceSlug, args.eventSlug, args.date)

        if (mockSlots) {
          return { data: mockSlots }
        }

        const result = await fetchWithBQ(`/public/booking-links/${args.workspaceSlug}/${args.eventSlug}/slots?date=${args.date}`)

        if (result.error) {
          return { error: result.error as FetchBaseQueryError }
        }

        return { data: result.data as BookingSlotsResponse }
      },
    }),
    createBooking: builder.mutation<CreateBookingResponse, CreateBookingRequest>({
      async queryFn(args, _api, _extraOptions, fetchWithBQ) {
        const mockContext = findMockBookingContext(args.workspaceSlug, args.eventSlug)

        if (mockContext) {
          const mockBooking = createMockBooking(args)

          if (!mockBooking) {
            return {
              error: {
                status: 409,
                data: {
                  message: 'The selected slot is no longer available. Choose another time.',
                },
              } as FetchBaseQueryError,
            }
          }

          return { data: mockBooking }
        }

        const result = await fetchWithBQ({
          url: '/public/bookings',
          method: 'POST',
          body: args,
        })

        if (result.error) {
          return { error: result.error as FetchBaseQueryError }
        }

        return { data: result.data as CreateBookingResponse }
      },
    }),
  }),
})

export const { useGetBookingPageContextQuery, useGetBookingSlotsQuery, useCreateBookingMutation } = bookingApi
