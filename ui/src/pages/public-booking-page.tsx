import { skipToken } from '@reduxjs/toolkit/query'
import { CalendarDays, Clock3, MapPin, RefreshCcw } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { findMockAvailableDates } from '@/lib/mock-booking'
import {
  cn,
  formatBookingWindow,
  formatCalendarDayNumber,
  formatCalendarMonth,
  formatCalendarWeekday,
  formatDurationMinutes,
  formatSelectedDate,
  formatSlotTimeRange,
  getBookingCalendarDates,
  getCalendarWeekdayOffset,
  getErrorStatus,
  isValidEmail,
} from '@/lib/utils'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  resetBookingSelection,
  selectGuestEmail,
  selectGuestName,
  selectGuestNote,
  selectSelectedDate,
  selectSelectedSlotStart,
  setGuestEmail,
  setGuestName,
  setGuestNote,
  setSelectedDate,
  setSelectedSlotStart,
  useCreateBookingMutation,
  useGetBookingPageContextQuery,
  useGetBookingSlotsQuery,
} from '@/store/booking'
import type { BookingSlot } from '@/types'

export default function PublicBookingPage() {
  const { workspaceSlug, eventSlug } = useParams<{ workspaceSlug: string; eventSlug: string }>()
  const dispatch = useAppDispatch()
  const selectedDate = useAppSelector(selectSelectedDate)
  const selectedSlotStart = useAppSelector(selectSelectedSlotStart)
  const guestName = useAppSelector(selectGuestName)
  const guestEmail = useAppSelector(selectGuestEmail)
  const guestNote = useAppSelector(selectGuestNote)
  const routeParams = workspaceSlug && eventSlug ? { workspaceSlug, eventSlug } : null
  const queryArgs = routeParams ?? skipToken
  const { data, error, isError, isLoading, isFetching, refetch } = useGetBookingPageContextQuery(queryArgs)
  const slotsQueryArgs = queryArgs !== skipToken && selectedDate ? { ...queryArgs, date: selectedDate } : skipToken
  const { data: slotsData, error: slotsError, isError: isSlotsError, isFetching: isSlotsFetching } = useGetBookingSlotsQuery(slotsQueryArgs)
  const [createBooking, { data: bookingConfirmation, error: createBookingError, isLoading: isCreatingBooking }] =
    useCreateBookingMutation()
  const errorStatus = getErrorStatus(error)
  const slotsErrorStatus = getErrorStatus(slotsError)
  const createBookingErrorStatus = getErrorStatus(createBookingError)
  const bookingWindowLabel = useMemo(() => {
    if (!data) {
      return ''
    }

    return formatBookingWindow(data.bookingWindow.startDate, data.bookingWindow.endDate)
  }, [data])
  const bookingCalendarDates = useMemo(() => {
    if (!data) {
      return []
    }

    return getBookingCalendarDates(data.bookingWindow.startDate, data.bookingWindow.endDate)
  }, [data])
  const bookingMonthLabel = useMemo(() => {
    if (!data) {
      return ''
    }

    return formatCalendarMonth(data.bookingWindow.startDate)
  }, [data])
  const availableDates = useMemo(() => {
    if (!workspaceSlug || !eventSlug) {
      return null
    }

    return findMockAvailableDates(workspaceSlug, eventSlug)
  }, [eventSlug, workspaceSlug])
  const availableDateSet = useMemo(() => {
    return availableDates ? new Set(availableDates) : null
  }, [availableDates])
  const selectedSlot = useMemo(() => {
    return slotsData?.slots.find((slot) => slot.start === selectedSlotStart) ?? null
  }, [selectedSlotStart, slotsData])
  const nameError = useMemo(() => {
    if (!guestName.trim()) {
      return 'Enter your name.'
    }

    return ''
  }, [guestName])
  const emailError = useMemo(() => {
    if (!guestEmail.trim()) {
      return 'Enter your email.'
    }

    if (!isValidEmail(guestEmail.trim())) {
      return 'Enter a valid email address.'
    }

    return ''
  }, [guestEmail])
  const isFormReady = useMemo(() => {
    return Boolean(selectedSlot && !nameError && !emailError)
  }, [emailError, nameError, selectedSlot])

  useEffect(() => {
    dispatch(resetBookingSelection())
  }, [dispatch, eventSlug, workspaceSlug])

  const renderHero = () => (
    <section className="relative overflow-hidden border-b border-dashed border-border/60 bg-black px-4 py-6 sm:px-6">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)',
        }}
      />
      <div className="absolute left-4 top-4 h-18 w-18 border border-white/20" />
      <div className="absolute bottom-4 right-4 h-18 w-18 border border-white/20" />
      <div className="relative flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="border border-emerald-500/40 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-emerald-400">
            public
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">
            booking link | {workspaceSlug}/{eventSlug}
          </span>
        </div>
        <div className="max-w-3xl space-y-2">
          <h1 className="text-2xl font-medium tracking-tight text-white sm:text-4xl">Book a meeting without back-and-forth.</h1>
          <p className="max-w-2xl text-[13px] text-white/70">
            Review the event context first. Date, time, and guest details will unlock in the next steps of this flow.
          </p>
        </div>
      </div>
    </section>
  )

  const renderCalendarDay = (date: string) => {
    const isAvailable = availableDateSet ? availableDateSet.has(date) : true
    const isSelected = selectedDate === date

    return (
      <Button
        key={date}
        type="button"
        variant={isSelected ? 'default' : 'outline'}
        size="xs"
        className={cn(
          'h-auto min-h-18 flex-col items-start gap-1 rounded-none px-2 py-2 text-left',
          !isAvailable && 'border-dashed opacity-40',
        )}
        disabled={!isAvailable || isCreatingBooking}
        aria-pressed={isSelected}
        onClick={() => dispatch(setSelectedDate(date))}
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{formatCalendarWeekday(date)}</span>
        <span className="text-sm text-foreground">{formatCalendarDayNumber(date)}</span>
      </Button>
    )
  }

  const renderSlotButton = (slot: BookingSlot) => {
    const isSelected = selectedSlotStart === slot.start

    return (
      <Button
        key={slot.start}
        type="button"
        variant={isSelected ? 'default' : 'outline'}
        size="xs"
        className="justify-start rounded-none px-3 py-2 font-mono text-[12px]"
        aria-pressed={isSelected}
        disabled={isCreatingBooking}
        onClick={() => dispatch(setSelectedSlotStart(slot.start))}
      >
        {formatSlotTimeRange(slot.start, slot.end)}
      </Button>
    )
  }

  const renderLoading = () => (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
      <Card className="gap-0 border-dashed bg-card/80 py-0">
        <CardContent className="space-y-4 px-0 py-0">
          <div className="border-b border-dashed border-border/60 px-3 py-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">status | loading context</p>
          </div>
          <div className="space-y-3 px-3 py-3 text-[12px]">
            <div className="h-4 w-32 animate-pulse bg-muted/50" />
            <div className="h-10 w-full animate-pulse bg-muted/40" />
            <div className="h-10 w-full animate-pulse bg-muted/40" />
            <div className="h-28 w-full animate-pulse bg-muted/40" />
          </div>
        </CardContent>
      </Card>
      <Card className="gap-0 border-dashed bg-card/80 py-0">
        <CardContent className="space-y-3 px-0 py-0 text-[12px]">
          <div className="border-b border-dashed border-border/60 px-3 py-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">checkpoint | request pending</p>
          </div>
          <div className="space-y-3 px-3 py-3">
            <p className="text-muted-foreground">Loading event context from the public booking link.</p>
            <div className="border-l-[3px] border-amber-400 pl-2">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">next</p>
              <p>Date and time controls stay locked until this request completes.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderNotFound = () => (
    <Card className="gap-0 border-dashed bg-card/80 py-0">
      <CardContent className="space-y-3 px-0 py-0 text-[12px]">
        <div className="border-b border-dashed border-border/60 px-3 py-2">
          <p className="font-mono text-[10px] uppercase tracking-widest text-red-400">err | booking page not found</p>
        </div>
        <div className="space-y-3 px-3 py-3">
          <div className="border-l-[3px] border-red-400 pl-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">404</p>
            <p>This booking link does not map to a public event. Check the URL or ask the host for a fresh link.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderCalendarCard = () => {
    const weekdayOffset = data ? getCalendarWeekdayOffset(data.bookingWindow.startDate) : 0
    const calendarLeadingCells = Array.from({ length: weekdayOffset }, (_, index) => (
      <div key={`blank-${index}`} className="border border-dashed border-border/30 bg-muted/10" />
    ))

    return (
      <Card className="gap-0 border-dashed bg-card/80 py-0">
        <CardContent className="space-y-4 px-0 py-0 text-[12px]">
          <div className="border-b border-dashed border-border/60 px-3 py-2">
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">01 | choose date</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-foreground">{bookingMonthLabel}</p>
            </div>
          </div>
          <div className="space-y-3 px-3 py-3">
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((label) => (
                <div key={label} className="px-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {label}
                </div>
              ))}
              {calendarLeadingCells}
              {bookingCalendarDates.map(renderCalendarDay)}
            </div>
            <p className="text-[12px] text-muted-foreground">Only dates with available mock slots can be selected.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderSlotsCard = () => {
    const renderSlotState = () => {
      if (!selectedDate) {
        return (
          <div className="border-l-[3px] border-muted pl-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">waiting</p>
            <p>Select a date on the calendar to load bookable times.</p>
          </div>
        )
      }

      if (isSlotsFetching) {
        return (
          <div className="space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">loading slots</p>
            <div className="h-8 w-full animate-pulse bg-muted/40" />
            <div className="h-8 w-full animate-pulse bg-muted/40" />
          </div>
        )
      }

      if (isSlotsError) {
        return (
          <div className="border-l-[3px] border-red-400 pl-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-red-400">err | {String(slotsErrorStatus ?? 'slots')}</p>
            <p>We could not load times for this date. Pick another date or retry in a moment.</p>
          </div>
        )
      }

      if (!slotsData?.slots.length) {
        return (
          <div className="border-l-[3px] border-amber-400 pl-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-amber-400">hold | no slots</p>
            <p>No mock times are available on {formatSelectedDate(selectedDate)}. Choose another date.</p>
          </div>
        )
      }

      return <div className="grid gap-2">{slotsData.slots.map(renderSlotButton)}</div>
    }

    return (
      <Card className="gap-0 border-dashed bg-card/80 py-0">
        <CardContent className="space-y-3 px-0 py-0 text-[12px]">
          <div className="border-b border-dashed border-border/60 px-3 py-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">02 | choose time</p>
          </div>
          <div className="space-y-3 px-3 py-3">
            <p className="text-muted-foreground">{selectedDate ? formatSelectedDate(selectedDate) : 'Select a date first.'}</p>
            {renderSlotState()}
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderBookingFormCard = () => {
    const renderFormStatus = () => {
      if (!selectedSlot) {
        return (
          <div className="border-l-[3px] border-muted pl-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">locked</p>
            <p>Guest details unlock after a time is selected.</p>
          </div>
        )
      }

      return (
        <div className="border-l-[3px] border-emerald-400 pl-2">
          <p className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">selected slot</p>
          <p>
            {selectedDate ? formatSelectedDate(selectedDate) : ''} | {formatSlotTimeRange(selectedSlot.start, selectedSlot.end)}
          </p>
        </div>
      )
    }

    return (
      <Card className="gap-0 border-dashed bg-card/80 py-0">
        <CardContent className="space-y-3 px-0 py-0 text-[12px]">
          <div className="border-b border-dashed border-border/60 px-3 py-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">03 | guest details</p>
          </div>
          <div className="space-y-3 px-3 py-3">
            {renderFormStatus()}
            <FieldGroup className="gap-4">
              <Field>
                <FieldLabel htmlFor="guest-name">Name</FieldLabel>
                <Input
                  id="guest-name"
                  value={guestName}
                  disabled={!selectedSlot || isCreatingBooking}
                  aria-invalid={Boolean(selectedSlot && nameError)}
                  onChange={(event) => dispatch(setGuestName(event.target.value))}
                />
                <FieldError>{selectedSlot ? nameError : ''}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="guest-email">Email</FieldLabel>
                <Input
                  id="guest-email"
                  type="email"
                  value={guestEmail}
                  disabled={!selectedSlot || isCreatingBooking}
                  aria-invalid={Boolean(selectedSlot && emailError)}
                  onChange={(event) => dispatch(setGuestEmail(event.target.value))}
                />
                <FieldError>{selectedSlot ? emailError : ''}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="guest-note">Note</FieldLabel>
                <textarea
                  id="guest-note"
                  value={guestNote}
                  disabled={!selectedSlot || isCreatingBooking}
                  onChange={(event) => dispatch(setGuestNote(event.target.value))}
                  className={cn(
                    'min-h-24 w-full rounded-none border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none',
                    'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
                    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30',
                  )}
                />
                <FieldDescription>Optional context for the host before the call.</FieldDescription>
              </Field>
            </FieldGroup>
            {createBookingErrorStatus === 409 ? (
              <div className="border-l-[3px] border-red-400 pl-2">
                <p className="font-mono text-[10px] uppercase tracking-widest text-red-400">err | slot unavailable</p>
                <p>The selected slot is no longer available. Choose another time.</p>
              </div>
            ) : null}
            <div>
              <Button
                type="button"
                size="xs"
                className="rounded-none"
                disabled={!isFormReady || isCreatingBooking || !routeParams || !selectedSlot}
                onClick={() => {
                  if (!routeParams || !selectedSlot) {
                    return
                  }

                  void createBooking({
                    workspaceSlug: routeParams.workspaceSlug,
                    eventSlug: routeParams.eventSlug,
                    slotStart: selectedSlot.start,
                    guest: {
                      name: guestName.trim(),
                      email: guestEmail.trim(),
                    },
                    note: guestNote.trim() || undefined,
                  })
                }}
              >
                {isCreatingBooking ? 'Saving booking...' : 'Confirm booking'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderConfirmationCard = () => {
    if (!bookingConfirmation) {
      return null
    }

    return (
      <Card className="gap-0 border-dashed bg-card/80 py-0">
        <CardContent className="space-y-3 px-0 py-0 text-[12px]">
          <div className="border-b border-dashed border-border/60 px-3 py-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">live | booking confirmed</p>
          </div>
          <div className="space-y-3 px-3 py-3">
            <div className="border-l-[3px] border-emerald-400 pl-2">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">confirmation</p>
              <p>
                {formatSelectedDate(bookingConfirmation.booking.startsAt.slice(0, 10))} |{' '}
                {formatSlotTimeRange(bookingConfirmation.booking.startsAt, bookingConfirmation.booking.endsAt)} |{' '}
                {bookingConfirmation.booking.timezone}
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="border border-dashed border-border/60 px-3 py-2">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">guest</p>
                <p className="mt-2 text-[13px] text-foreground">{bookingConfirmation.booking.guest.name}</p>
              </div>
              <div className="border border-dashed border-border/60 px-3 py-2">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">email</p>
                <p className="mt-2 text-[13px] text-foreground">{bookingConfirmation.booking.guest.email}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderError = () => (
    <Card className="gap-0 border-dashed bg-card/80 py-0">
      <CardContent className="space-y-3 px-0 py-0 text-[12px]">
        <div className="border-b border-dashed border-border/60 px-3 py-2">
          <p className="font-mono text-[10px] uppercase tracking-widest text-red-400">err | context unavailable</p>
        </div>
        <div className="flex flex-col gap-3 px-3 py-3">
          <div className="border-l-[3px] border-red-400 pl-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">request failure</p>
            <p>We could not load the booking page context right now. Retry the request or try again in a moment.</p>
          </div>
          <div>
            <Button className="rounded-none" size="xs" variant="outline" onClick={() => refetch()}>
              <RefreshCcw className="size-3" />
              Retry request
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderContextCard = () => (
    <Card className="gap-0 border-dashed bg-card/80 py-0">
      <CardContent className="space-y-4 px-0 py-0 text-[12px]">
        <div className="border-b border-dashed border-border/60 px-3 py-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">live</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {data?.workspace.name} | {data?.event.slug}
            </span>
            {isFetching ? (
              <span className="font-mono text-[10px] uppercase tracking-widest text-amber-400">refreshing</span>
            ) : null}
          </div>
        </div>
        <div className="space-y-4 px-3 py-3">
          <div className="space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">event</p>
            <h2 className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">{data?.event.name}</h2>
            <p className="max-w-2xl text-[13px] text-muted-foreground">{data?.event.description}</p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="border border-dashed border-border/60 px-3 py-2">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <Clock3 className="size-3" />
                duration
              </div>
              <p className="mt-2 text-[13px] text-foreground">{data ? formatDurationMinutes(data.event.durationMinutes) : ''}</p>
            </div>
            <div className="border border-dashed border-border/60 px-3 py-2">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <MapPin className="size-3" />
                timezone
              </div>
              <p className="mt-2 text-[13px] text-foreground">{data?.event.timezone}</p>
            </div>
            <div className="border border-dashed border-border/60 px-3 py-2">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <CalendarDays className="size-3" />
                booking window
              </div>
              <p className="mt-2 text-[13px] text-foreground">{bookingWindowLabel}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderFlowShell = () => (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
      <div className="space-y-6">
        {renderContextCard()}
        {renderCalendarCard()}
      </div>
      <div className="space-y-6">
        {renderSlotsCard()}
        {renderBookingFormCard()}
        {renderConfirmationCard()}
      </div>
    </div>
  )

  const renderBody = () => {
    if (isLoading) {
      return renderLoading()
    }

    if (isError && errorStatus === 404) {
      return renderNotFound()
    }

    if (isError) {
      return renderError()
    }

    return renderFlowShell()
  }

  const renderMain = () => (
    <div className="min-h-screen bg-background text-foreground">
      {renderHero()}
      <main className={cn('mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6')}>
        {renderBody()}
      </main>
    </div>
  )

  return renderMain()
}
