import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AppShellProps {
  title: string
  children: ReactNode
  className?: string
}

export default function AppShell({ title, children, className }: AppShellProps) {
  const renderHeader = () => (
    <header className="border-b border-dashed border-border/60 px-3 py-2">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Zenve control surface</p>
          <h1 className="font-mono text-sm uppercase tracking-[0.2em] text-foreground">{title}</h1>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-emerald-400">
          <span className="size-2 animate-pulse bg-emerald-400" />
          <span>Live</span>
        </div>
      </div>
    </header>
  )

  const renderMain = () => (
    <div className={cn('mx-auto flex min-h-screen w-full max-w-6xl flex-col border-x border-dashed border-border/60 bg-card/70', className)}>
      {renderHeader()}
      <main className="panel-grid flex-1 px-3 py-3">{children}</main>
    </div>
  )

  return renderMain()
}
