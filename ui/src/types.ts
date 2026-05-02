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

export interface HostContext {
  displayName: string
}

export interface HostEvent {
  id: string
  title: string
  durationMinutes: number
  connectedCalendarLabel: string
  publicLink: string
}

export interface HostEventsPageContext {
  host: HostContext
  events: HostEvent[]
}
