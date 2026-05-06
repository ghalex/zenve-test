# PRD: Guest Timezone Selection

## Overview
Guest timezone selection lets a person viewing a public booking page see available meeting times in their own timezone and switch to another timezone before booking. This reduces time-conversion mistakes and makes Zenve more trustworthy for meetings scheduled across cities or countries.

## Problem
Guests often book meetings with hosts in a different timezone. In the current product direction, the booking page labels one timezone, but a guest still has to mentally convert that schedule into their local time. That extra step creates hesitation, increases the risk of booking the wrong slot, and can reduce booking completion for distributed teams, consultants, and job seekers.

## Users
- Guest
- Host

## Goals
- Reduce timezone-related confusion during public booking.
- Increase completed bookings for meetings where the guest and host are in different timezones.

## Non-Goals
- Automatic timezone conflict detection after a booking is created.
- Per-event rules that restrict which guest timezones can be used.
- Calendar sync, daylight-saving education, or travel-mode scheduling.

## Requirements

### Functional
- The public booking page detects a default guest-visible timezone when the page loads.
- The page shows which timezone is currently being used to display available dates and time slots.
- A guest can change the display timezone before selecting a slot.
- When the display timezone changes, the available times refresh in the newly selected timezone.
- The selected slot, booking form context, and confirmation state all use the same selected timezone for display.
- The booking record preserves the event timezone and also stores the timezone the guest used when confirming the booking.

### Non-Functional
- Timezone selection works on mobile and desktop screens.
- The timezone control is keyboard accessible and usable without hover interactions.
- Timezone labels use recognizable names or offsets so the guest can distinguish similar timezones.
- The booking page avoids showing contradictory times in different parts of the flow after a timezone change.

## API Contract

### Public booking page details
- `GET /public/booking-links/{workspaceSlug}/{eventSlug}`
- Auth: none
- Purpose: load page context including the host event timezone and the guest-visible default timezone
- `200 OK` response:

```json
{
  "workspace": {
    "name": "Zenve Demo",
    "slug": "zenve-demo"
  },
  "event": {
    "name": "Intro Call",
    "slug": "intro-call-30",
    "durationMinutes": 30,
    "timezone": "America/New_York",
    "description": "A short introductory meeting."
  },
  "displayTimezone": "Europe/London",
  "bookingWindow": {
    "startDate": "2026-05-01",
    "endDate": "2026-06-30"
  }
}
```
- `404 Not Found`: workspace slug or event slug does not resolve to a public booking page

### Available slots for a date in a selected timezone
- `GET /public/booking-links/{workspaceSlug}/{eventSlug}/slots?date=YYYY-MM-DD&timezone=Area/City`
- Auth: none
- Purpose: return valid time slots for the selected date rendered in the requested display timezone
- `200 OK` response:

```json
{
  "date": "2026-05-15",
  "eventTimezone": "America/New_York",
  "displayTimezone": "Europe/London",
  "slots": [
    {
      "start": "2026-05-15T14:00:00+01:00",
      "end": "2026-05-15T14:30:00+01:00"
    },
    {
      "start": "2026-05-15T15:00:00+01:00",
      "end": "2026-05-15T15:30:00+01:00"
    }
  ]
}
```
- `400 Bad Request`: date or timezone is missing or invalid
- `404 Not Found`: booking page does not exist

### Create booking with guest-selected timezone context
- `POST /public/bookings`
- Auth: none
- Purpose: create a meeting booking and preserve which timezone the guest used while booking
- Request body:

```json
{
  "workspaceSlug": "zenve-demo",
  "eventSlug": "intro-call-30",
  "slotStart": "2026-05-15T14:00:00+01:00",
  "displayTimezone": "Europe/London",
  "guest": {
    "name": "Alex Johnson",
    "email": "alex@example.com"
  },
  "note": "Looking forward to discussing onboarding."
}
```
- `201 Created` response:

```json
{
  "booking": {
    "id": "bk_123",
    "workspaceSlug": "zenve-demo",
    "eventSlug": "intro-call-30",
    "startsAt": "2026-05-15T09:00:00-04:00",
    "endsAt": "2026-05-15T09:30:00-04:00",
    "eventTimezone": "America/New_York",
    "displayTimezone": "Europe/London",
    "guest": {
      "name": "Alex Johnson",
      "email": "alex@example.com"
    },
    "note": "Looking forward to discussing onboarding."
  }
}
```
- `400 Bad Request`: required fields are missing or invalid
- `404 Not Found`: workspace slug or event slug does not resolve to a public booking page
- `409 Conflict`: selected slot is no longer available

## UI Spec
- Follow `.zenve/agents/react-dev/DESIGN.md` for the visual language.
- The route remains the public guest-facing booking page.
- The page shows both the host event timezone and the currently selected display timezone in clear booking context.
- The timezone selector is visible before the guest chooses a time slot.
- Changing the timezone updates the visible slot labels before the guest submits the form.
- The selected timezone remains visible near the chosen slot, within the booking form context, and in the confirmation state.
- If a timezone change makes a previously selected slot invalid for the current date view, the page clears the selected slot and requires the guest to choose again.

## User Stories

## Story: Guest books in their own timezone

**As a** Guest,
**I want** to view available meeting times in my own timezone and switch timezones if needed,
**so that** I can book the correct slot without doing manual time conversion.

### Acceptance Criteria

- [ ] The public booking page shows the timezone currently used to display available times before the guest selects a slot.
- [ ] The guest can change the display timezone from the booking page before submitting the booking.
- [ ] After the guest changes the display timezone, the visible slot times update to that timezone consistently across the slot list and selected-slot context.
- [ ] When the booking is confirmed, the confirmation state shows the booked time using the same display timezone the guest used while booking.

### Out of scope

- Sending follow-up emails in multiple timezones.
- Rescheduling or cancelling an existing booking.
- Detecting the guest's physical travel changes after the page has loaded.

### Notes

- This feature extends the public booking flow in `docs/product/calendar-booking-page.md`.
- The product still needs one canonical event timezone for host configuration and booking storage.

## Open Questions
- None for this first issue scope.

## Appendix
- Reference issue: `#31`
- Related PRD: `docs/product/calendar-booking-page.md`
- Rationale: timezone clarity is a direct booking-conversion feature because it reduces a common source of hesitation and booking errors in self-serve scheduling.
