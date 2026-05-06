# Task: Align Public Booking Timezone Data Contract

**Owner:** react-dev
**Source issue:** #31 `Invent a new feature for our app`
**Source plan:** `docs/plans/react/guest-timezone-selection.md`
**Source PRD:** `docs/product/guest-timezone-selection.md`

## Goal
Update the public-booking frontend data layer so it can request, store, and submit the guest-selected display timezone described in the PRD.

## Scope
- Extend shared booking types in `ui/src/types.ts` for `displayTimezone` on page context, slots responses, booking creation requests, and booking confirmation responses, while preserving the canonical event timezone fields from the PRD.
- Update `ui/src/store/booking/api.ts` so slot queries include the selected timezone parameter and booking creation sends the selected display timezone.
- Update `ui/src/store/booking/slice.ts` to track the selected display timezone in Redux and provide selectors/actions needed by the page.
- Update `ui/src/lib/mock-booking.ts` so the mock booking page supports the new timezone-aware contract used by the existing public route.

## Acceptance Criteria
- [ ] The frontend booking types match the timezone-related request and response fields documented in `docs/product/guest-timezone-selection.md`.
- [ ] Slot-fetching queries can be called with both `date` and `timezone` without adding local component fetch state.
- [ ] Booking creation payloads include the selected `displayTimezone` field.
- [ ] The booking Redux domain exposes client state for the currently selected display timezone.

## Out of Scope
- Rendering a timezone selector or new timezone copy on the public booking page.
- Reworking booking-page layout, confirmation layout, or styling.

## Dependencies
- Backend responses must follow the PRD contract in `docs/product/guest-timezone-selection.md`.

## Verification
- `cd ui && pnpm lint`
- Inspect `ui/src/types.ts`, `ui/src/store/booking/api.ts`, `ui/src/store/booking/slice.ts`, and `ui/src/lib/mock-booking.ts` to confirm the timezone fields and query args are wired consistently.

## Notes for react-dev
- Follow the `react-architect` skill's React architecture standards.
- Follow `.zenve/agents/react-dev/DESIGN.md`.
- Do not modify `src/components/ui/` manually.
