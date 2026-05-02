const STRIP_ITEMS = ['react 19', 'vite', 'redux toolkit', 'react router', 'shadcn/ui']

export default function OperationsStrip() {
  const renderItems = () => (
    <div className="flex flex-wrap items-center gap-2 text-[12px] text-muted-foreground">
      {STRIP_ITEMS.map((item) => (
        <span key={item} className="font-mono">
          {item}
        </span>
      ))}
    </div>
  )

  const renderMain = () => (
    <div className="flex flex-wrap items-center gap-2 border-y border-dashed border-border/60 bg-muted/30 px-3 py-2">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">stack</span>
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">|</span>
      {renderItems()}
    </div>
  )

  return renderMain()
}
