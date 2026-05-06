# Task: Keep Booking Timezone State Consistent Through Confirmation

**Owner:** react-dev
**Source issue:** #31 `Invent a new feature for our app`
**Source plan:** `docs/plans/react/guest-timezone-selection.md`
**Source PRD:** `docs/product/guest-timezone-selection.md`

## Goal
Ensure the selected display timezone stays consistent across slot selection, booking submission, and confirmation, including invalidation of stale slot choices after timezone changes.

## Scope
- Clear the selected slot when a timezone change makes the current slot selection stale for the active date view.
- Keep the selected display timezone visible near the selected-slot summary, within the guest-details step, and in the confirmation state.
- Update booking submission wiring so the confirmation state renders the same display timezone the guest used when confirming.
- Preserve the existing conflict path so a stale or unavailable slot still blocks booking creation and prompts the guest to choose again.

## Acceptance Criteria
- [ ] If the guest changes timezone after selecting a slot, the page clears the stale slot selection and requires a new choice before submission.
- [ ] The selected-slot summary and guest-details context show the same display timezone as the active slot list.
- [ ] Successful booking confirmation displays the booked time using the guest-selected display timezone, not only the host event timezone.
- [ ] Slot-unavailable error handling still prevents booking creation and leaves the guest in a recoverable state.

## Out of Scope
- Sending timezone-specific emails or modifying post-booking communications.
- Rescheduling, cancellation, or host-side event settings.

## Dependencies
- `docs/tasks/react/guest-timezone-selection/01-booking-timezone-data-contract.md`
- `docs/tasks/react/guest-timezone-selection/02-booking-timezone-selector-context.md`

## Verification
- `cd ui && pnpm lint`
- `cd ui && pnpm build`
- Manual check in `ui`: select a date and slot, switch the display timezone, confirm the slot selection resets, then complete a booking and verify the confirmation uses the same display timezone shown during selection.

## Notes for react-dev
- Follow the `react-architect` skill's React architecture standards.
- Follow `.zenve/agents/react-dev/DESIGN.md`.
- Do not modify `src/components/ui/` manually.
