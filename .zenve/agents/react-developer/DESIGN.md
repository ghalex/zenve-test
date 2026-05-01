# Design System

> Replace this file with your project's visual language. The agent will follow whatever is defined here.

## Aesthetic

Industrial control panel / operator dashboard — utilitarian, high-density, no decorative elements.

## Corners & Borders

- All cards, panels, dialogs, and buttons use `rounded-none` — no border-radius on structural elements
- Dividers use dashed borders: `border-dashed border-border/60`
- Pipe `|` separators in meta/info strips

## Typography

- `font-mono` for metadata, slugs, timestamps, and status labels
- `tracking-widest text-[10px] uppercase` on status badges
- Body text: `text-[12px]`–`text-[13px]`

## Spacing & Density

- Compact padding: `px-3 py-1.5`, `py-2`
- High information density — prefer small text over large whitespace

## Color

Semantic status colors only — no decorative fills:
- Active / success → `emerald`
- Paused / warning → `amber`
- Error → `red`
- Inactive / off → `muted`

## Buttons

- Size: `size="xs" className="rounded-none"` everywhere
- Never mix `xs` and `sm` buttons in the same UI context
- Toolbar rows: `bg-muted/30 rounded-none` with hairline dividers between actions

## Status Indicators

- Colored left-edge bars (`w-[3px]`) on cards
- Monospace all-caps labels: `LIVE`, `HOLD`, `ERR`, `OFF`
- Pulsing dot alongside live status labels

## Animation

- No animation libraries (no framer-motion)
- CSS `animate-pulse` only for live status indicators

## Decorative Panel Pattern (Dark Hero / Auth / Onboarding)

For full-height decorative right-panels on split-layout pages:

**Background grid:**
```tsx
<div className="absolute inset-0" style={{
  backgroundImage: `
    linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
  `,
  backgroundSize: '48px 48px',
}} />
```

**Plus-corner SVG box** (file-local helper, never exported):
```tsx
const PlusCorner = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x - 6}, ${y - 6})`}>
    <line x1="6" y1="2" x2="6" y2="10" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
    <line x1="2" y1="6" x2="10" y2="6" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
  </g>
)
```

**Radial vignette:**
```tsx
<div className="absolute inset-0" style={{
  background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)',
}} />
```

**Rules:**
- Always `bg-black` — never inherit theme background
- Two decorative SVG boxes minimum: one top-left, one bottom-right
- Keep `PlusCorner` as a file-local component, not exported
