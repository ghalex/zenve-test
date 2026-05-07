import { Settings2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProfileForm from '@/components/settings/profile-form'
import { Button } from '@/components/ui/button'

export default function SettingsOverview() {
  const renderHero = () => (
    <section className="editorial-hero relative overflow-hidden px-4 py-10 sm:px-6 sm:py-14">
      <div className="absolute inset-x-6 top-6 h-px bg-border/70" />
      <div className="absolute bottom-6 right-6 h-24 w-24 rounded-full border border-primary/10 bg-background/40 blur-3xl" />
      <div className="relative flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="editorial-kicker">settings</span>
            <span className="editorial-eyebrow">host profile controls</span>
          </div>
          <Button asChild variant="ghost" className="rounded-md">
            <Link to="/">Back to events</Link>
          </Button>
        </div>
        <div className="max-w-3xl space-y-3">
          <h1 className="font-editorial text-3xl leading-tight text-foreground sm:text-5xl">Manage the identity behind your booking link.</h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-[15px]">
            Update the name and avatar attached to your scheduling presence now, with room for account controls that will arrive later.
          </p>
        </div>
      </div>
    </section>
  )

  const renderComingSoon = () => (
    <section className="editorial-panel px-5 py-5">
      <div className="flex items-start gap-3">
        <div className="rounded-md border border-border/80 bg-background/80 p-2 text-muted-foreground">
          <Settings2 className="size-4" />
        </div>
        <div className="space-y-2">
          <p className="editorial-eyebrow">more settings coming soon</p>
          <h2 className="font-editorial text-2xl text-foreground">This page is ready to expand.</h2>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Notification, billing, and other account controls are intentionally deferred for this release, but this space is reserved for them.
          </p>
        </div>
      </div>
    </section>
  )

  const renderMain = () => (
    <div className="min-h-screen bg-background text-foreground">
      {renderHero()}
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6">
        <ProfileForm />
        {renderComingSoon()}
      </main>
    </div>
  )

  return renderMain()
}
