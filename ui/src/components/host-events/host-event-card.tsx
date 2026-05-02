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
    <div className="flex flex-col gap-3 border-b border-dashed border-border/60 px-3 py-2 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-emerald-400">
            <span className="size-1.5 animate-pulse bg-emerald-400" />
            live
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">event | {event.id}</span>
        </div>
        <div>
          <h2 className="text-base font-medium text-foreground sm:text-lg">{event.title}</h2>
          <p className="text-[12px] text-muted-foreground">Shareable event type for outbound scheduling.</p>
        </div>
      </div>
      <div className="border border-dashed border-border/60 px-3 py-2">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">public route</p>
        <p className="mt-1 font-mono text-[12px] text-foreground">/{event.id}</p>
      </div>
    </div>
  )

  const renderMeta = () => (
    <div className="grid gap-3 px-3 py-3 md:grid-cols-2">
      <div className="border border-dashed border-border/60 px-3 py-2">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <Clock3 className="size-3" />
          duration
        </div>
        <p className="mt-2 text-[13px] text-foreground">{durationLabel}</p>
      </div>
      <div className="border border-dashed border-border/60 px-3 py-2">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <CalendarRange className="size-3" />
          connected calendar
        </div>
        <p className="mt-2 text-[13px] text-foreground">{event.connectedCalendarLabel}</p>
      </div>
    </div>
  )

  const renderLinkField = () => (
    <div className="border-t border-dashed border-border/60 px-3 py-3">
      <FieldGroup className="gap-2">
        <Field>
          <FieldLabel htmlFor={`public-link-${event.id}`}>Public link</FieldLabel>
          <Input
            id={`public-link-${event.id}`}
            readOnly
            value={event.publicLink}
            className="font-mono text-[12px]"
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
    <article className={cn('border border-dashed border-border/60 bg-card/80', 'relative overflow-hidden')}>
      <div className="absolute inset-y-0 left-0 w-[3px] bg-emerald-400" />
      <div className="ml-[3px]">
        {renderHeader()}
        {renderMeta()}
        {renderLinkField()}
      </div>
    </article>
  )

  return renderMain()
}
