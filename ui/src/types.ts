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

export interface BookingSlot {
  start: string
  end: string
}

export interface BookingSlotsResponse {
  date: string
  timezone: string
  slots: BookingSlot[]
}

export interface CreateBookingRequest {
  workspaceSlug: string
  eventSlug: string
  slotStart: string
  guest: {
    name: string
    email: string
  }
  note?: string
}

export interface CreateBookingResponse {
  booking: {
    id: string
    workspaceSlug: string
    eventSlug: string
    startsAt: string
    endsAt: string
    timezone: string
    guest: {
      name: string
      email: string
    }
    note?: string
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
