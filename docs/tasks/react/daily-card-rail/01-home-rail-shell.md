# Task: Build Home Rail Shell

**Owner:** react-dev
**Source issue:** Issue #7 - Base on top features create first PRD
**Source plan:** `docs/plans/react/daily-card-rail.md`
**Source PRD:** `docs/product/daily-card-rail.md`

## Goal
Replace the placeholder home-page starter content with the structural UI surface for the daily card rail while keeping the existing shell and design language.

## Scope
- Remove the current starter summary/workspace content from `ui/src/pages/home.tsx`.
- Build the home-page rail composition inside the existing `AppShell`, using a dedicated daily-card-rail feature area under `ui/src/components/` for extracted subcomponents.
- Render empty day-card placeholders that expose a human-readable date header and a body area reserved for later todo content.
- Keep styling aligned with `react-dev/DESIGN.md`, including `rounded-none`, dashed borders, compact spacing, monospace metadata, and no decorative fills beyond semantic accents.

## Acceptance Criteria
- [ ] The `/` route no longer shows the starter scaffold cards or the "Starter workspace online" content.
- [ ] The home page renders a horizontal rail surface inside `AppShell` using feature components rather than defining multiple substantial components inside `ui/src/pages/home.tsx`.
- [ ] Each rendered day card includes a human-readable date header and an empty content area suitable for future todo work.
- [ ] The new layout preserves the existing operator-dashboard design language from `react-dev/DESIGN.md`.

## Out of Scope
- Interactive day navigation logic.
- Swipe gesture handling.
- Todo list inputs, items, or persistence.

## Dependencies
- None

## Verification
- Run `pnpm lint` from `ui/`.
- Run `pnpm build` from `ui/`.
- In `pnpm dev`, confirm `/` shows the rail shell instead of the starter scaffold.

## Notes for react-dev
- Follow the `react-architect` skill's React architecture standards.
- Follow `react-dev/DESIGN.md`.
- Do not modify `src/components/ui/` manually.
