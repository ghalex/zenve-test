# PRD: Calendar Booking Page

## Overview
The calendar booking page is the first public scheduling surface in Zenve. It lets a guest open a host's booking link, review bookable dates, choose a time slot, enter contact information, and create a meeting in one flow.

## Problem
Guests need a fast way to reserve time with a host without email back-and-forth. Today the product has only a scaffolded frontend shell, so there is no public page where a guest can see available dates, choose a valid time, or submit their details to book a meeting.

## Users
- Host
- Guest

## Goals
- Let a guest complete a meeting booking from a public booking link in a single session.
- Reduce booking friction by exposing only valid dates and valid times for the selected date.

## Non-Goals
- Guest rescheduling or cancellation after the booking is created.
- Host-side availability editing or event type management.
- Payment collection, calendar integrations, reminders, or video conferencing links.

## Requirements

### Functional
- The product exposes a public booking page for a specific host and event type.
- The page shows the host or event context needed for a guest to confirm they are booking the right meeting.
- The page shows a calendar view with only dates that have at least one available time slot.
- When a guest selects a date, the page shows the available time slots for that date.
- A guest can select one time slot before submitting the booking form.
- The booking form collects guest name and guest email.
- The booking form can optionally collect a short note from the guest.
- When the booking is submitted successfully, the meeting is stored and the page shows a confirmation state.
- If the selected slot becomes unavailable before submission completes, the page blocks booking creation and tells the guest to choose another time.

### Non-Functional
- The public booking page works on mobile and desktop screens.
- Interactive elements on the calendar, time slot list, and booking form are keyboard accessible.
- All times shown to the guest are labeled with the timezone used for booking.
- The booking submission response is clear enough that the guest can confirm whether the meeting was created or not.

## API Contract

### Public booking page details
- `GET /public/booking-links/{workspaceSlug}/{eventSlug}`
- Auth: none
- Purpose: load page context for the public booking page
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
  "bookingWindow": {
    "startDate": "2026-05-01",
    "endDate": "2026-06-30"
  }
}
```
- `404 Not Found`: workspace slug or event slug does not resolve to a public booking page

### Available slots for a date
- `GET /public/booking-links/{workspaceSlug}/{eventSlug}/slots?date=YYYY-MM-DD`
- Auth: none
- Purpose: return valid time slots for the selected date
- `200 OK` response:

```json
{
  "date": "2026-05-15",
  "timezone": "America/New_York",
  "slots": [
    {
      "start": "2026-05-15T09:00:00-04:00",
      "end": "2026-05-15T09:30:00-04:00"
    },
    {
      "start": "2026-05-15T10:00:00-04:00",
      "end": "2026-05-15T10:30:00-04:00"
    }
  ]
}
```
- `400 Bad Request`: date is missing or invalid
- `404 Not Found`: booking page does not exist

### Create booking
- `POST /public/bookings`
- Auth: none
- Purpose: create a meeting booking for a selected public slot
- Request body:

```json
{
  "workspaceSlug": "zenve-demo",
  "eventSlug": "intro-call-30",
  "slotStart": "2026-05-15T09:00:00-04:00",
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
    "timezone": "America/New_York",
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
- The route is a public guest-facing page, not an authenticated host dashboard.
- The page displays event name, duration, and timezone near the calendar so the guest can confirm context before selecting a slot.
- The primary flow is ordered: select date, select time, complete contact form, confirm booking.
- The time-slot list stays hidden or disabled until a date is selected.
- The booking form stays hidden or disabled until a time slot is selected.
- The submit action stays disabled until required fields are valid and a time slot is selected.
- Validation errors are shown inline for required fields.
- The confirmation state displays the booked date, booked time, timezone, guest name, and guest email.

## User Stories

## Story: Guest books a meeting from a public link

**As a** Guest,
**I want** to pick a date and time from a host's public booking page and submit my contact details,
**so that** I can reserve a meeting without messaging the host back and forth.

### Acceptance Criteria

- [ ] The public booking page loads host or event context, a calendar, and a timezone label for a valid booking link.
- [ ] Selecting a date loads and displays only the available time slots for that date.
- [ ] A guest can select one available time slot and then enter name and email before submitting the booking.
- [ ] Submitting a valid booking creates one meeting and shows a confirmation state with the booked date, time, timezone, guest name, and guest email.
- [ ] If the selected slot is unavailable at submission time, the guest sees a clear error and the meeting is not created.

### Out of scope

- Rescheduling or cancelling an existing booking.
- Collecting payment or conferencing details.
- Multi-attendee meetings.

### Notes

- This issue covers the first guest booking flow only.
- Developer tasks for frontend and backend can split from this PRD, but they must preserve this end-to-end flow.

## Open Questions
- None for this first issue scope.

## Appendix
- Reference issue: `#12`
- Reference mockup: user-provided screenshot showing a left-side calendar, available times, and a right-side contact form.
