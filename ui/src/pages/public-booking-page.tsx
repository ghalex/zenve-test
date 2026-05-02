import { skipToken } from '@reduxjs/toolkit/query'
import { CalendarDays, Clock3, MapPin, RefreshCcw } from 'lucide-react'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn, formatBookingWindow, formatDurationMinutes, getErrorStatus } from '@/lib/utils'
import { useGetBookingPageContextQuery } from '@/store/booking'

export default function PublicBookingPage() {
  const { workspaceSlug, eventSlug } = useParams<{ workspaceSlug: string; eventSlug: string }>()
  const queryArgs = workspaceSlug && eventSlug ? { workspaceSlug, eventSlug } : skipToken
  const { data, error, isError, isLoading, isFetching, refetch } = useGetBookingPageContextQuery(queryArgs)
  const errorStatus = getErrorStatus(error)
  const bookingWindowLabel = useMemo(() => {
    if (!data) {
      return ''
    }

    return formatBookingWindow(data.bookingWindow.startDate, data.bookingWindow.endDate)
  }, [data])

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
      {renderContextCard()}
      <Card className="gap-0 border-dashed bg-card/80 py-0">
        <CardContent className="space-y-3 px-0 py-0 text-[12px]">
          <div className="border-b border-dashed border-border/60 px-3 py-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">flow | pending steps</p>
          </div>
          <div className="space-y-3 px-3 py-3">
            <div className="border-l-[3px] border-muted pl-2">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">01 | choose date</p>
              <p>Date selection will load bookable slots inside the published booking window.</p>
            </div>
            <div className="border-l-[3px] border-muted pl-2">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">02 | choose time</p>
              <p>Time options stay locked until a valid date is selected.</p>
            </div>
            <div className="border-l-[3px] border-muted pl-2">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">03 | guest details</p>
              <p>Contact fields remain disabled until the guest chooses a slot.</p>
            </div>
          </div>
        </CardContent>
      </Card>
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
