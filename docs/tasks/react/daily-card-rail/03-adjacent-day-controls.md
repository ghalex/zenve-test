# Task: Add Adjacent Day Controls

**Owner:** react-dev
**Source issue:** Issue #7 - Base on top features create first PRD
**Source plan:** `docs/plans/react/daily-card-rail.md`
**Source PRD:** `docs/product/daily-card-rail.md`

## Goal
Allow users to move the centered card backward or forward by exactly one calendar day using explicit rail controls on the home page.

## Scope
- Add visible previous and next controls within the rail UI using existing shadcn button primitives and the project's compact toolbar styling.
- Wire each control so one activation moves the centered date by exactly one calendar day in the expected direction.
- Keep navigation within the SPA without full-page reloads and update the visible date headers immediately after each interaction.
- Preserve the PRD boundary by avoiding today badges, jump navigation, or non-adjacent movement.

## Acceptance Criteria
- [ ] A previous control and a next control are visible on the home-page rail.
- [ ] Activating the previous control moves the centered card back by exactly one calendar day.
- [ ] Activating the next control moves the centered card forward by exactly one calendar day.
- [ ] Navigation updates the visible cards without a full-page reload.
- [ ] The control styling matches the dense control-panel button rules in `react-dev/DESIGN.md`.

## Out of Scope
- Swipe gesture handling.
- Keyboard navigation.
- Any arbitrary jump-to-date or back-to-today action.

## Dependencies
- `docs/tasks/react/daily-card-rail/02-current-date-centering.md`

## Verification
- Run `pnpm lint` from `ui/`.
- Run `pnpm build` from `ui/`.
- In `pnpm dev`, click each control repeatedly and confirm the centered date changes one day at a time in the correct direction.

## Notes for react-dev
- Follow the `react-architect` skill's React architecture standards.
- Follow `react-dev/DESIGN.md`.
- Do not modify `src/components/ui/` manually.
