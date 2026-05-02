import HostEventCard from '@/components/host-events/host-event-card'
import { mockHostEventsPageContext } from '@/lib/mock-host-events'

export default function HostEventsOverview() {
  const hostDisplayName = mockHostEventsPageContext.host.displayName
  const hostEvents = mockHostEventsPageContext.events
  const hasEvents = hostEvents.length > 0

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
      <div className="relative space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="border border-emerald-500/40 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-emerald-400">
            host
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">operator | {hostDisplayName}</span>
        </div>
        <div className="max-w-3xl space-y-3">
          <h1 className="text-2xl font-medium tracking-tight text-white sm:text-4xl">Your event inventory and public booking links.</h1>
          <p className="max-w-2xl text-[13px] text-white/70">
            Review every hosted event type in one place, confirm duration and calendar routing, and access the exact public URL guests should use.
          </p>
        </div>
      </div>
    </section>
  )

  const renderSummary = () => (
    <section className="flex flex-wrap items-center gap-2 border-y border-dashed border-border/60 bg-muted/30 px-3 py-2 text-[12px] text-muted-foreground">
      <span className="font-mono text-[10px] uppercase tracking-widest">events</span>
      <span className="font-mono text-[10px] uppercase tracking-widest">|</span>
      <span className="font-mono">{hostEvents.length} configured</span>
      <span className="font-mono text-[10px] uppercase tracking-widest">|</span>
      <span className="font-mono">mock dataset</span>
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
    <section className="border border-dashed border-border/60 bg-card/80 px-3 py-4">
      <div className="border-l-[3px] border-muted pl-2">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">no events yet</p>
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
