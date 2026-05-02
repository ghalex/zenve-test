import HostEventCard from '@/components/host-events/host-event-card'
import { mockHostEventsPageContext } from '@/lib/mock-host-events'

export default function HostEventsOverview() {
  const hostDisplayName = mockHostEventsPageContext.host.displayName
  const hostEvents = mockHostEventsPageContext.events
  const hasEvents = hostEvents.length > 0

  const renderHero = () => (
    <section className="editorial-hero relative overflow-hidden px-4 py-10 sm:px-6 sm:py-14">
      <div className="absolute inset-x-6 top-6 h-px bg-border/70" />
      <div className="absolute bottom-6 right-6 h-24 w-24 rounded-full border border-primary/10 bg-background/40 blur-3xl" />
      <div className="relative space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="editorial-kicker">
            host
          </span>
          <span className="editorial-eyebrow">curated schedule hub | {hostDisplayName}</span>
        </div>
        <div className="max-w-3xl space-y-3">
          <h1 className="font-editorial text-3xl leading-tight text-foreground sm:text-5xl">
            Your event inventory and public booking links.
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-[15px]">
            Review every hosted event type in one place, confirm duration and calendar routing, and access the exact public URL guests should use.
          </p>
        </div>
      </div>
    </section>
  )

  const renderSummary = () => (
    <section className="flex flex-wrap items-center gap-3 rounded-full border border-border/80 bg-card/80 px-4 py-2 text-sm text-muted-foreground shadow-sm">
      <span className="editorial-eyebrow">events</span>
      <span>{hostEvents.length} configured</span>
      <span className="h-1 w-1 rounded-full bg-border" />
      <span>mock dataset</span>
    </section>
  )

  const renderEventsList = () => (
    <div className="grid gap-4">
      {hostEvents.map((event) => (
        <HostEventCard key={event.id} event={event} />
      ))}
    </div>
  )

  const renderEmptyState = () => (
    <section className="editorial-panel px-4 py-5">
      <div className="editorial-callout">
        <p className="editorial-eyebrow">no events yet</p>
        <p className="mt-2 text-[13px] text-foreground">Skywalker does not have any events in this mock dataset yet.</p>
      </div>
    </section>
  )

  const renderContent = () => (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6">
      {renderSummary()}
      {hasEvents ? renderEventsList() : renderEmptyState()}
    </main>
  )

  const renderMain = () => (
    <div className="min-h-screen bg-background text-foreground">
      {renderHero()}
      {renderContent()}
    </div>
  )

  return renderMain()
}
