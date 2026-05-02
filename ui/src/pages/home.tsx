import { BookingIntakeCard, OperationsStrip } from '@/components/common'
import { useAppSelector } from '@/store/hooks'
import { selectWorkspaceName } from '@/store/app'

export default function HomePage() {
  const workspaceName = useAppSelector(selectWorkspaceName)

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
            live
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">workspace | {workspaceName}</span>
        </div>
        <div className="max-w-3xl space-y-3">
          <h1 className="text-2xl font-medium tracking-tight text-white sm:text-4xl">
            Scheduling shell for publishing availability and collecting meetings.
          </h1>
          <p className="max-w-2xl text-[13px] text-white/70">
            The new frontend app is scaffolded in <code>ui/</code> with routing, Redux state, Tailwind v4,
            and shadcn primitives ready for feature work.
          </p>
        </div>
      </div>
    </section>
  )

  const renderContent = () => (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6">
      <OperationsStrip />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)]">
        <BookingIntakeCard />
        <section className="border border-dashed border-border/60 bg-card/70">
          <div className="border-b border-dashed border-border/60 px-3 py-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">next steps</p>
          </div>
          <div className="space-y-3 px-3 py-3 text-[12px]">
            <div className="border-l-[3px] border-emerald-400 pl-2">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">01 | routes</p>
              <p>Add authenticated and public flows as product requirements land.</p>
            </div>
            <div className="border-l-[3px] border-amber-400 pl-2">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">02 | store</p>
              <p>Introduce RTK Query domains for availability, event types, and bookings.</p>
            </div>
            <div className="border-l-[3px] border-red-400 pl-2">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">03 | backend contract</p>
              <p>Wire forms after API shapes for links, slots, and confirmations are defined.</p>
            </div>
          </div>
        </section>
      </div>
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
