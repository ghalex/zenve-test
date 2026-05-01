import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { AppShell } from '@/components/common'
import { formatOperatorDate } from '@/lib/utils'
import { selectAppSnapshot } from '@/store/app'
import { useAppSelector } from '@/store/hooks'

const STARTER_ITEMS = [
  {
    label: 'Routing',
    detail: 'Browser router is mounted and ready for route expansion.',
    status: 'OK',
  },
  {
    label: 'State',
    detail: 'Redux Toolkit store is configured with typed selector hooks.',
    status: 'OK',
  },
  {
    label: 'Styling',
    detail: 'Tailwind v4 and shadcn primitives are wired for new screens.',
    status: 'OK',
  },
] as const

export default function HomePage() {
  const snapshot = useAppSelector(selectAppSnapshot)
  const todayLabel = formatOperatorDate(new Date())

  const renderSummaryCards = () => (
    <div className="grid gap-3 md:grid-cols-3">
      {STARTER_ITEMS.map((item) => (
        <Card key={item.label} className="rounded-none border-dashed bg-card/90">
          <CardHeader className="gap-2 px-3 py-2">
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle className="font-mono text-xs uppercase tracking-widest">{item.label}</CardTitle>
                <CardDescription className="pt-1 text-[12px] text-muted-foreground">{item.detail}</CardDescription>
              </div>
              <span className="border border-emerald-500/60 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-emerald-400">{item.status}</span>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  )

  const renderWorkspaceCard = () => (
    <Card className="rounded-none border-dashed bg-card/90">
      <CardHeader className="gap-2 px-3 py-2">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span>{todayLabel}</span>
          <span>|</span>
          <span>Env {snapshot.environment}</span>
          <span>|</span>
          <span className="text-emerald-400">{snapshot.status}</span>
        </div>
        <CardTitle className="font-mono text-sm uppercase tracking-[0.2em]">Starter workspace online</CardTitle>
        <CardDescription className="text-[12px] text-muted-foreground">
          This is the initial SPA shell for Zenve. Add routes, store domains, and feature components from this baseline.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 px-3 py-3">
        <div className="grid gap-3 md:grid-cols-[1.4fr_0.6fr]">
          <div className="border-l-[3px] border-emerald-500 bg-background/50 px-3 py-3">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Next build target</p>
            <p className="pt-2 text-[13px] text-foreground">
              Implement the daily todo rail with today centered and horizontal card swapping.
            </p>
          </div>
          <div className="flex flex-col justify-between gap-3 border border-dashed border-border/60 px-3 py-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Command</p>
              <p className="pt-2 font-mono text-[12px] text-foreground">pnpm dev</p>
            </div>
            <Button className="rounded-none font-mono text-[10px] uppercase tracking-widest">UI Scaffold Ready</Button>
          </div>
        </div>
        <Separator className="bg-border/60" />
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Add feature folders under `src/components/` and route files under `src/pages/`.
        </p>
      </CardContent>
    </Card>
  )

  const renderMain = () => (
    <AppShell title={snapshot.title}>
      <section className="space-y-3">
        {renderSummaryCards()}
        {renderWorkspaceCard()}
      </section>
    </AppShell>
  )

  return renderMain()
}
