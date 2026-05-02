# Task: Center Rail On Current Date

**Owner:** react-dev
**Source issue:** Issue #7 - Base on top features create first PRD
**Source plan:** `docs/plans/react/daily-card-rail.md`
**Source PRD:** `docs/product/daily-card-rail.md`

## Goal
Make the home-page rail derive its visible cards from the user's local current date and re-center on the current system date whenever the home route is entered.

## Scope
- Add the date derivation needed for the rail to render today as the centered card on initial `/` load.
- Ensure visible adjacent cards are computed as the previous and next calendar days relative to the centered date.
- Reset the centered date to the current system date each time the home route mounts again after navigation away from `/`.
- Reuse or extend shared date utilities only when the helper belongs in `ui/src/lib/utils.ts`.

## Acceptance Criteria
- [ ] On initial load of `/`, the centered card represents the user's current local calendar date.
- [ ] The adjacent visible cards represent exactly one calendar day before and after the centered card.
- [ ] Navigating away from `/` and returning remounts the home experience centered on the then-current system date.
- [ ] Date headers continue to render in a human-readable format consistent across all visible cards.

## Out of Scope
- Previous and next button interactions.
- Swipe gesture interactions.
- Today-specific badges, borders, or return-to-today affordances.

## Dependencies
- `docs/tasks/react/daily-card-rail/01-home-rail-shell.md`

## Verification
- Run `pnpm lint` from `ui/`.
- Run `pnpm build` from `ui/`.
- In `pnpm dev`, verify the centered card matches the device date on first load and after leaving and returning to `/`.

## Notes for react-dev
- Follow the `react-architect` skill's React architecture standards.
- Follow `react-dev/DESIGN.md`.
- Do not modify `src/components/ui/` manually.
