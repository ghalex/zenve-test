import type {
  BookingPageContextResponse,
  BookingSlotsResponse,
  CreateBookingRequest,
  CreateBookingResponse,
} from '@/types'

interface MockBookingFixture {
  context: BookingPageContextResponse
  slotsByDate: Record<string, BookingSlotsResponse['slots']>
}

const mockBookingFixtures: Record<string, MockBookingFixture> = {
  'skywalker/intro-call-30': {
    context: {
      workspace: {
        name: 'Skywalker',
        slug: 'skywalker',
      },
      event: {
        name: '30 min intro call',
        slug: 'intro-call-30',
        durationMinutes: 30,
        timezone: 'America/New_York',
        description: 'A short introductory meeting to discuss goals, timing, and next steps.',
      },
      bookingWindow: {
        startDate: '2026-05-01',
        endDate: '2026-05-31',
      },
    },
    slotsByDate: {
      '2026-05-05': [
        { start: '2026-05-05T09:00:00-04:00', end: '2026-05-05T09:30:00-04:00' },
        { start: '2026-05-05T11:00:00-04:00', end: '2026-05-05T11:30:00-04:00' },
        { start: '2026-05-05T14:30:00-04:00', end: '2026-05-05T15:00:00-04:00' },
      ],
      '2026-05-08': [
        { start: '2026-05-08T10:00:00-04:00', end: '2026-05-08T10:30:00-04:00' },
        { start: '2026-05-08T13:00:00-04:00', end: '2026-05-08T13:30:00-04:00' },
      ],
      '2026-05-12': [
        { start: '2026-05-12T09:30:00-04:00', end: '2026-05-12T10:00:00-04:00' },
        { start: '2026-05-12T15:00:00-04:00', end: '2026-05-12T15:30:00-04:00' },
      ],
      '2026-05-15': [
        { start: '2026-05-15T09:00:00-04:00', end: '2026-05-15T09:30:00-04:00' },
        { start: '2026-05-15T10:00:00-04:00', end: '2026-05-15T10:30:00-04:00' },
        { start: '2026-05-15T13:30:00-04:00', end: '2026-05-15T14:00:00-04:00' },
      ],
      '2026-05-21': [
        { start: '2026-05-21T08:30:00-04:00', end: '2026-05-21T09:00:00-04:00' },
        { start: '2026-05-21T12:00:00-04:00', end: '2026-05-21T12:30:00-04:00' },
      ],
      '2026-05-27': [
        { start: '2026-05-27T10:30:00-04:00', end: '2026-05-27T11:00:00-04:00' },
        { start: '2026-05-27T16:00:00-04:00', end: '2026-05-27T16:30:00-04:00' },
      ],
    },
  },
}

const bookedSlotStarts = new Set<string>()

function getFixtureKey(workspaceSlug: string, eventSlug: string) {
  return `${workspaceSlug}/${eventSlug}`
}

export function findMockBookingContext(workspaceSlug: string, eventSlug: string) {
  return mockBookingFixtures[getFixtureKey(workspaceSlug, eventSlug)]?.context
}

export function findMockBookingSlots(workspaceSlug: string, eventSlug: string, date: string) {
  const fixture = mockBookingFixtures[getFixtureKey(workspaceSlug, eventSlug)]

  if (!fixture) {
    return null
  }

  return {
    date,
    timezone: fixture.context.event.timezone,
    slots: (fixture.slotsByDate[date] ?? []).filter((slot) => !bookedSlotStarts.has(slot.start)),
  }
}

export function findMockAvailableDates(workspaceSlug: string, eventSlug: string) {
  const fixture = mockBookingFixtures[getFixtureKey(workspaceSlug, eventSlug)]

  if (!fixture) {
    return null
  }

  return Object.entries(fixture.slotsByDate)
    .filter(([, slots]) => slots.some((slot) => !bookedSlotStarts.has(slot.start)))
    .map(([date]) => date)
}

export function createMockBooking(request: CreateBookingRequest): CreateBookingResponse | null {
  const fixture = mockBookingFixtures[getFixtureKey(request.workspaceSlug, request.eventSlug)]

  if (!fixture) {
    return null
  }

  const slot = Object.values(fixture.slotsByDate)
    .flat()
    .find((item) => item.start === request.slotStart)

  if (!slot || bookedSlotStarts.has(slot.start)) {
    return null
  }

  bookedSlotStarts.add(slot.start)

  return {
    booking: {
      id: `bk_${slot.start.replace(/[^0-9]/g, '').slice(0, 12)}`,
      workspaceSlug: request.workspaceSlug,
      eventSlug: request.eventSlug,
      startsAt: slot.start,
      endsAt: slot.end,
      timezone: fixture.context.event.timezone,
      guest: request.guest,
      note: request.note,
    },
  }
}
