import { CalendarClock, Link2, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export default function BookingIntakeCard() {
  const renderHeader = () => (
    <CardHeader className="space-y-1 border-b border-dashed border-border/60 px-3 py-2">
      <div className="flex items-center justify-between gap-3">
        <div>
          <CardTitle className="text-sm font-medium">Meeting Link Intake</CardTitle>
          <CardDescription className="text-[12px] text-muted-foreground">
            Capture the first booking surface for hosts and guests.
          </CardDescription>
        </div>
        <span className="inline-flex items-center gap-1 border border-emerald-500/40 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-emerald-400">
          <span className="size-1.5 animate-pulse bg-emerald-400" />
          live
        </span>
      </div>
    </CardHeader>
  )

  const renderHighlights = () => (
    <div className="grid gap-2 border-b border-dashed border-border/60 px-3 py-2 md:grid-cols-3">
      <div className="flex items-start gap-2 border-l-[3px] border-emerald-400 pl-2">
        <CalendarClock className="mt-0.5 size-3.5 text-emerald-400" />
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Slot control</p>
          <p className="text-[12px]">Share precise availability without back-and-forth.</p>
        </div>
      </div>
      <div className="flex items-start gap-2 border-l-[3px] border-amber-400 pl-2">
        <Link2 className="mt-0.5 size-3.5 text-amber-400" />
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Link routing</p>
          <p className="text-[12px]">Single public URL per host with event-level context.</p>
        </div>
      </div>
      <div className="flex items-start gap-2 border-l-[3px] border-emerald-400 pl-2">
        <ShieldCheck className="mt-0.5 size-3.5 text-emerald-400" />
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Confirmation</p>
          <p className="text-[12px]">Keep booking details validated before release.</p>
        </div>
      </div>
    </div>
  )

  const renderForm = () => (
    <CardContent className="px-3 py-3">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="workspace-name">Workspace</FieldLabel>
          <Input id="workspace-name" defaultValue="zenve-demo" />
          <FieldDescription>Public namespace used in scheduling URLs.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="event-name">Event name</FieldLabel>
          <Input id="event-name" defaultValue="intro-call-30" />
          <FieldDescription>Human-readable slug for the first hosted meeting type.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="booking-url">Booking URL preview</FieldLabel>
          <Input id="booking-url" defaultValue="zenve.app/zenve-demo/intro-call-30" readOnly />
          <FieldDescription>Read-only preview for the link users will share externally.</FieldDescription>
        </Field>
        <div className="flex flex-col gap-2 border-t border-dashed border-border/60 pt-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            status | scaffolded shell | route ready
          </p>
          <Button size="sm" className="rounded-none px-3 py-1.5 text-[12px]">
            Review Setup
          </Button>
        </div>
      </FieldGroup>
    </CardContent>
  )

  const renderMain = () => (
    <Card className="border-dashed bg-card/90">
      {renderHeader()}
      {renderHighlights()}
      {renderForm()}
    </Card>
  )

  return renderMain()
}
