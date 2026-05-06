# React Plan: Guest Timezone Selection

## Source
- Issue: #31 `Invent a new feature for our app`
- PM comment: `RUN_OK: Added PRD for guest timezone selection and updated PM product context and memory`
- PRD: `docs/product/guest-timezone-selection.md`
- Related backend contract: `docs/product/guest-timezone-selection.md` (`GET /public/booking-links/{workspaceSlug}/{eventSlug}`, `GET /public/booking-links/{workspaceSlug}/{eventSlug}/slots?date=YYYY-MM-DD&timezone=Area/City`, `POST /public/bookings`)

## Summary
Extend the existing public booking flow so guests see a detected display timezone on load, can switch that timezone before choosing a slot, and keep the same display timezone visible through slot selection, booking form context, and booking confirmation. The frontend should preserve the current route and editorial booking layout while ensuring slot data, selected-slot state, and confirmation details stay consistent after timezone changes.

## Existing Frontend Context
- Public guest route already exists at `ui/src/routes.tsx` on `/:workspaceSlug/:eventSlug` and renders `ui/src/pages/public-booking-page.tsx`.
- The booking page already uses RTK Query in `ui/src/store/booking/api.ts` plus client booking state in `ui/src/store/booking/slice.ts` for selected date, selected slot, and guest form fields.
- Shared booking contracts live in `ui/src/types.ts`, and mock public-booking data lives in `ui/src/lib/mock-booking.ts`.
- The current UI shows only the event timezone and fetches slots by date alone; no display-timezone selector or timezone-specific confirmation context exists yet.
- `react-architect` standards still apply: keep server data in RTK Query, client-only state in Redux, route definitions in `ui/src/routes.tsx`, path-alias imports, and no edits to `ui/src/components/ui/`.
- `.zenve/agents/react-dev/DESIGN.md` requires the existing warm editorial booking layout, softly rounded controls, and clear tactile selection states on both desktop and mobile.

## Proposed UX Flow
1. A guest opens the public booking page and sees the host event context plus both the host event timezone and the currently selected display timezone.
2. Before choosing a slot, the guest can open a keyboard-accessible timezone control and switch the display timezone.
3. The page refreshes the visible slot labels for the selected date in the chosen timezone and clears any stale selected slot that no longer matches the current slot list.
4. The guest selects a slot, enters booking details, and sees the chosen display timezone repeated near the selected slot and booking form context.
5. After successful booking, the confirmation panel shows the booked time using the same display timezone the guest used when confirming.

## State and Data
- Server data: booking page context now includes `displayTimezone`; slot requests and responses include `displayTimezone` plus `eventTimezone`; booking creation sends and receives `displayTimezone`.
- Client state: booking Redux state needs a selected display timezone that can initialize from page context, change before booking, and reset selected slot state when timezone changes.
- Forms: no new guest-contact fields; add one timezone-selection control before slot selection with clear labels or offsets and disabled/loading behavior while slot data refreshes.

## Task Breakdown
1. `docs/tasks/react/guest-timezone-selection/01-booking-timezone-data-contract.md` — align frontend types, booking store state, RTK Query args, and mocks with the PRD timezone contract.
2. `docs/tasks/react/guest-timezone-selection/02-booking-timezone-selector-context.md` — add the display-timezone selector and show host-versus-display timezone context in the public booking page UI.
3. `docs/tasks/react/guest-timezone-selection/03-booking-timezone-selection-consistency.md` — enforce slot reset and consistent timezone rendering across selected-slot, submission, and confirmation states.

## Risks / Open Questions
- [ ] None
