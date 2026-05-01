# Product: Zenve

## Vision

Zenve is a minimal daily todo app that gives each day its own card, arranged in a horizontal timeline with today always centered, so users can plan ahead and review the past with a single swipe.

## North Star Metric

**Daily Active Users who complete at least one todo per day.** This measures both engagement (opening the app) and utility (actually using it to track tasks).

## Target Users

| Persona | Description | Primary need |
|---|---|---|
| Daily Planner | Individual who organises personal or work tasks day-by-day. Values simplicity over feature richness. | Quickly capture and check off todos for today without navigating complex project structures. |

## Key Metrics / KPIs

- % of sessions where at least one todo is created or completed
- Average todos completed per user per day
- Day-over-day retention (user returns the next calendar day)

## Implemented Features

<!-- Append-only log of shipped features. Never delete entries. -->
- SPA scaffold (React 19, Vite, Tailwind v4, shadcn/ui, Redux Toolkit) - baseline shell with routing and store

## Current Priorities

<!-- MoSCoW-labelled backlog. Keep this list short and ordered. -->
1. `[MUST]` **Daily Card Rail** - horizontal timeline of day-cards with today centered and swipe/navigation to adjacent days
2. `[MUST]` **Todo CRUD** - add, edit, complete, and delete todos within a day card
3. `[MUST]` **Local Persistence** - todos survive page refresh via browser storage
4. `[SHOULD]` **Today Focus Indicator** - clear visual emphasis on the current day card so the user always knows where "now" is
5. `[SHOULD]` **Drag-to-Reorder Todos** - reorder todos within a day card via drag-and-drop

## Future / Deferred

- Recurring / repeating todos
- Multi-day / spanning tasks
- Tags or categories for todos
- Dark / light theme toggle (shell supports dark; light mode deferred)
- Backend sync / multi-device support
- Keyboard shortcuts for power users
- Weekly / monthly summary views

## Open Questions

- [ ] Is data stored only in localStorage, or do we plan IndexedDB for larger datasets?
- [ ] Do completed todos auto-hide after end of day, or stay visible indefinitely?
- [ ] What is the maximum number of past/future days visible in the rail?
