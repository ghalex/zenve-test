# React Plan: Daily Card Rail

## Source
- Issue: Issue #7 - Base on top features create first PRD
- PM comment: RUN_OK created `docs/product/daily-card-rail.md` as the first PRD and bounded scope to rail navigation only
- PRD: `docs/product/daily-card-rail.md`
- Related backend contract: None

## Summary
Replace the current placeholder home screen with a horizontal day-card rail that opens centered on the user's current local date, supports one-day movement in either direction, and preserves the existing operator-dashboard visual language. The first implementation only needs empty day cards plus rail navigation behavior; todo rendering and the separate Today Focus Indicator remain out of scope.

## Existing Frontend Context
- `ui/src/routes.tsx` defines a single `/` route that renders `ui/src/pages/home.tsx`
- `ui/src/pages/home.tsx` is still starter content inside `AppShell`, so the home route can be repurposed without route changes
- `ui/src/components/common/app-shell.tsx` already provides the framed page shell and top status header
- `ui/src/lib/utils.ts` already exports `formatOperatorDate(date)` for operator-style date headers
- `ui/src/index.css` already establishes the dark grid panel background and zero-radius theme expected by the design guide
- `ui/src/store/app/slice.ts` only contains app snapshot metadata; no day-rail state or feature folder exists yet
- React architecture rules still apply, but this repo's SPA root is `ui/src/` rather than repo-root `src/`
- `react-dev/DESIGN.md` requires `rounded-none`, dashed borders, dense monospace metadata, semantic-only accents, and no animation library usage

## Proposed UX Flow
1. The user opens `/` and lands in the existing shell with today's day card centered in the rail.
2. The user reads the visible date header and moves one day backward or forward using explicit rail controls.
3. On touch devices, the user swipes horizontally to move exactly one day per gesture while the rail keeps one full card in view on mobile and partial adjacent cards on wider screens.
4. If the user leaves `/` and comes back later in the same session, the home screen centers on the current system date again.

## State and Data
- Server data: None
- Client state: Route-local centered-date state plus transient swipe/drag tracking; no shared backend-backed state is required for this PRD
- Forms: None

## Task Breakdown
1. `docs/tasks/react/daily-card-rail/01-home-rail-shell.md` - Replace the starter home content with a day-rail page shell and empty day-card presentation surface.
2. `docs/tasks/react/daily-card-rail/02-current-date-centering.md` - Add local-date derivation and route-entry centering behavior for the rail.
3. `docs/tasks/react/daily-card-rail/03-adjacent-day-controls.md` - Wire explicit previous and next controls to one-day navigation.
4. `docs/tasks/react/daily-card-rail/04-swipe-and-responsive-rail.md` - Add touch swipe movement and responsive one-card vs peek layout behavior.

## Risks / Open Questions
- [ ] The React architecture guidance assumes a top-level `src/` tree, but this repo keeps the SPA under `ui/src/`; all dev tasks should apply the same structure rules within `ui/src/`.
