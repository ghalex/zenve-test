# Task: Add Swipe And Responsive Rail Behavior

**Owner:** react-dev
**Source issue:** Issue #7 - Base on top features create first PRD
**Source plan:** `docs/plans/react/daily-card-rail.md`
**Source PRD:** `docs/product/daily-card-rail.md`

## Goal
Make the daily card rail usable on touch devices with one-day swipe navigation and responsive card visibility that matches the PRD on mobile and wider screens.

## Scope
- Add native touch or pointer gesture handling so a horizontal swipe moves the centered card by exactly one calendar day in the swipe direction.
- Prevent accidental multi-day jumps from a single gesture.
- Tune the rail layout so mobile viewports show one full card at a time.
- Tune the rail layout so wider viewports keep the centered card primary while adjacent cards remain partially visible.

## Acceptance Criteria
- [ ] On touch-capable devices, a left or right horizontal swipe moves the centered card by exactly one calendar day in the corresponding direction.
- [ ] A single swipe cannot skip multiple dates.
- [ ] Mobile-sized viewports show one full day card at a time.
- [ ] Wider viewports show the centered card fully with adjacent cards partially visible.
- [ ] The implementation does not add an animation library and stays within the existing CSS/Tailwind stack.

## Out of Scope
- Todo rendering inside day cards.
- Keyboard navigation.
- Distinct today indicator styling or back-to-today actions.

## Dependencies
- `docs/tasks/react/daily-card-rail/03-adjacent-day-controls.md`

## Verification
- Run `pnpm lint` from `ui/`.
- Run `pnpm build` from `ui/`.
- In `pnpm dev`, verify swipe behavior with device emulation or touch hardware and confirm mobile vs desktop card visibility expectations.

## Notes for react-dev
- Follow the `react-architect` skill's React architecture standards.
- Follow `react-dev/DESIGN.md`.
- Do not modify `src/components/ui/` manually.
