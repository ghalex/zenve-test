export interface BookingPageContextResponse {
  workspace: {
    name: string
    slug: string
  }
  event: {
    name: string
    slug: string
    durationMinutes: number
    timezone: string
    description: string
  }
  bookingWindow: {
    startDate: string
    endDate: string
  }
}
