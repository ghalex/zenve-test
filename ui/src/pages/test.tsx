import { Button } from '@/components/ui/button'

export default function TestPage() {
  const renderMain = () => (
    <main className="min-h-screen px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-3xl justify-center">
        <section className="editorial-panel w-full max-w-xl space-y-6 px-6 py-8 text-center sm:px-8">
          <div className="space-y-3">
            <p className="editorial-kicker">test page</p>
            <h1 className="font-editorial text-4xl leading-tight text-foreground">UI smoke test surface</h1>
            <p className="text-sm leading-6 text-muted-foreground sm:text-[15px]">
              This route exists for quick visual checks while iterating on components.
            </p>
          </div>
          <div className="flex justify-center">
            <Button size="lg">Click me</Button>
          </div>
        </section>
      </div>
    </main>
  )

  return renderMain()
}
