import { CalendarRange, Clock3, Link2 } from 'lucide-react'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { cn, formatDurationMinutes } from '@/lib/utils'
import type { HostEvent } from '@/types'

interface HostEventCardProps {
  event: HostEvent
}

export default function HostEventCard({ event }: HostEventCardProps) {
  const durationLabel = formatDurationMinutes(event.durationMinutes)

  const renderHeader = () => (
    <div className="flex flex-col gap-3 border-b border-border/70 px-4 py-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="editorial-kicker gap-1.5">
            <span className="size-1.5 rounded-full bg-primary" />
            live
          </span>
          <span className="editorial-eyebrow">event id | {event.id}</span>
        </div>
        <div>
          <h2 className="font-editorial text-xl text-foreground sm:text-2xl">{event.title}</h2>
          <p className="mt-1 text-[13px] leading-6 text-muted-foreground">Shareable event type for outbound scheduling.</p>
        </div>
      </div>
      <div className="editorial-metric min-w-40">
        <p className="editorial-eyebrow">public route</p>
        <p className="mt-2 font-mono text-[12px] text-foreground">/{event.id}</p>
      </div>
    </div>
  )

  const renderMeta = () => (
    <div className="grid gap-3 px-4 py-4 md:grid-cols-2">
      <div className="editorial-metric">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
          <Clock3 className="size-3" />
          duration
        </div>
        <p className="mt-2 text-[13px] text-foreground">{durationLabel}</p>
      </div>
      <div className="editorial-metric">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
          <CalendarRange className="size-3" />
          connected calendar
        </div>
        <p className="mt-2 text-[13px] text-foreground">{event.connectedCalendarLabel}</p>
      </div>
    </div>
  )

  const renderLinkField = () => (
    <div className="border-t border-border/70 px-4 py-4">
      <FieldGroup className="gap-2">
        <Field>
          <FieldLabel htmlFor={`public-link-${event.id}`}>Public link</FieldLabel>
          <Input
            id={`public-link-${event.id}`}
            readOnly
            value={event.publicLink}
            className="rounded-lg bg-background/70 font-mono text-[12px]"
          />
          <FieldDescription>
            <span className="inline-flex items-center gap-2">
              <Link2 className="size-3" />
              Select and share the full booking URL directly from this field.
            </span>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </div>
  )

  const renderMain = () => (
    <article className={cn('editorial-panel', 'relative overflow-hidden')}>
      <div className="absolute inset-y-0 left-0 w-[3px] bg-primary/75" />
      <div className="ml-[3px]">
        {renderHeader()}
        {renderMeta()}
        {renderLinkField()}
      </div>
    </article>
  )

  return renderMain()
}
