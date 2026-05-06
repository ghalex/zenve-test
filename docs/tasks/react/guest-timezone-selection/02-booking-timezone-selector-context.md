# Task: Add Booking Timezone Selector And Context

**Owner:** react-dev
**Source issue:** #31 `Invent a new feature for our app`
**Source plan:** `docs/plans/react/guest-timezone-selection.md`
**Source PRD:** `docs/product/guest-timezone-selection.md`

## Goal
Let a guest see and change the display timezone from the public booking page before selecting a slot.

## Scope
- Add a keyboard-accessible timezone-selection control to `ui/src/pages/public-booking-page.tsx` in the pre-slot portion of the booking flow.
- Show both the host event timezone and the currently selected display timezone in the booking context area using the existing warm editorial layout.
- Wire the timezone control to the booking Redux state and RTK Query slot request flow so changing the timezone refreshes visible slot labels for the active date.
- Keep loading, disabled, and error states clear while timezone-driven slot refreshes are in progress.

## Acceptance Criteria
- [ ] The public booking page shows the currently selected display timezone before a slot is chosen.
- [ ] The page also shows the host event timezone separately so guests can distinguish booking context from display context.
- [ ] A guest can change the display timezone with a keyboard-accessible control before booking submission.
- [ ] When the display timezone changes and a date is already selected, the slot request refreshes using the new timezone and the slot list updates accordingly.

## Out of Scope
- Clearing stale selected slots after timezone changes.
- Updating confirmation content or create-booking submission behavior.

## Dependencies
- `docs/tasks/react/guest-timezone-selection/01-booking-timezone-data-contract.md`

## Verification
- `cd ui && pnpm lint`
- Manual check in `ui`: load a public booking route, change the timezone before selecting a slot, and confirm the display timezone label plus slot labels refresh without breaking the existing layout.

## Notes for react-dev
- Follow the `react-architect` skill's React architecture standards.
- Follow `.zenve/agents/react-dev/DESIGN.md`.
- Do not modify `src/components/ui/` manually.
