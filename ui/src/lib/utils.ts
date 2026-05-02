import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDurationMinutes(minutes: number) {
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
