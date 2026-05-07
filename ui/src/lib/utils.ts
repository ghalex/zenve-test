import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function toDateKey(date: Date) {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDurationMinutes(minutes: number) {
  if (minutes % 60 === 0) {
    const hours = minutes / 60

    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`
  }

  return `${minutes} min`
}

export function formatBookingWindow(startDate: string, endDate: string) {
  const start = new Date(`${startDate}T00:00:00`)
  const end = new Date(`${endDate}T00:00:00`)

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).formatRange(start, end)
}

export function getErrorStatus(error: unknown) {
  if (typeof error === 'object' && error !== null && 'status' in error) {
    return error.status
  }

  return null
}

export function getBookingCalendarDates(startDate: string, endDate: string) {
  const start = new Date(`${startDate}T00:00:00`)
  const end = new Date(`${endDate}T00:00:00`)
  const dates: string[] = []

  while (start <= end) {
    dates.push(toDateKey(start))
    start.setDate(start.getDate() + 1)
  }

  return dates
}

export function getCalendarWeekdayOffset(date: string) {
  return new Date(`${date}T00:00:00`).getDay()
}

export function formatCalendarMonth(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`))
}

export function formatCalendarDayNumber(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
  }).format(new Date(`${date}T00:00:00`))
}

export function formatCalendarWeekday(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
  }).format(new Date(`${date}T00:00:00`))
}

export function formatSelectedDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  }).format(new Date(`${date}T00:00:00`))
}

export function formatSlotTime(timestamp: string) {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(timestamp))
}

export function formatSlotTimeRange(start: string, end: string) {
  return `${formatSlotTime(start)} - ${formatSlotTime(end)}`
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidDisplayName(name: string) {
  const trimmedName = name.trim()

  return trimmedName.length >= 1 && trimmedName.length <= 80
}

export function getDisplayInitials(name: string) {
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  return initials || 'ZN'
}

export function getErrorMessage(error: unknown, fallbackMessage = 'Something went wrong.') {
  if (error instanceof Error && error.message) {
    return error.message
  }

  if (
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    typeof error.data === 'object' &&
    error.data !== null &&
    'message' in error.data &&
    typeof error.data.message === 'string'
  ) {
    return error.data.message
  }

  if (typeof error === 'object' && error !== null && 'message' in error && typeof error.message === 'string') {
    return error.message
  }

  return fallbackMessage
}
