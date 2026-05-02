import { AuthForm } from '@/components/auth'

export default function AuthPage() {
  const renderHero = () => (
    <section className="space-y-5">
      <span className="editorial-kicker">scheduling access</span>
      <div className="space-y-3">
        <h1 className="font-editorial text-4xl leading-tight text-foreground sm:text-5xl">
          Sign in to manage events, links, and booking availability.
        </h1>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-[15px]">
          This host-facing workspace now authenticates with Supabase, while public booking links remain open for guests.
        </p>
      </div>
    </section>
  )

  const renderAside = () => (
    <div className="editorial-panel border-border/80 bg-card/85 px-5 py-5">
      <p className="editorial-eyebrow">what changed</p>
      <div className="mt-3 space-y-3 text-sm leading-6 text-muted-foreground">
        <p>Email/password sign-in now uses your configured Supabase project URL and publishable key.</p>
        <p>New accounts can sign up from this screen and will follow whatever confirmation flow Supabase Auth is configured to require.</p>
      </div>
    </div>
  )

  const renderMain = () => (
    <main className="min-h-screen px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,440px)] lg:items-center">
        <section className="space-y-6">
          {renderHero()}
          {renderAside()}
        </section>
        <section>
          <AuthForm />
        </section>
      </div>
    </main>
  )

  return renderMain()
}
