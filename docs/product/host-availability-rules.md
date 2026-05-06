# PRD: Host Availability Rules

## Overview
Host availability rules let a host define when a specific event can be booked. This gives Zenve a credible scheduling core by ensuring guests only see time slots that match the host's working hours and booking constraints.

## Problem
Hosts need control over when guests can book them. Without host-defined availability, a public booking page either shows unrealistic static slots or forces the host to accept meetings at unsuitable times. This creates mistrust in the booking link and reduces the chance that hosts will keep sharing it.

## Users
- Host
- Guest

## Goals
- Increase the share of public booking links that expose host-approved time slots only.
- Reduce invalid or inconvenient bookings caused by missing notice periods, narrow booking windows, or back-to-back meetings.

## Non-Goals
- Automatic syncing from external calendar availability.
- Team scheduling, pooled availability, or round-robin assignment.
- Custom availability rules that vary by guest, location, or meeting type beyond the selected event.

## Requirements

### Functional
- The product exposes an authenticated host-facing availability settings view for an existing event.
- A host can define weekly availability for each day of the week for that event.
- A host can add more than one available time range within the same day.
- A host can mark a day as unavailable for that event.
- A host can set a minimum notice period before a guest can book a slot.
- A host can set how far into the future the event remains bookable.
- A host can set buffer time before and after each booked meeting for that event.
- A host can save updated availability rules and see the saved values when reopening the event availability view.
- Public available slot responses for that event reflect the saved weekly availability, notice period, booking window, and buffers.

### Non-Functional
- The availability settings flow works on mobile and desktop screens.
- Time ranges, toggles, and save actions are keyboard accessible.
- Public slot generation uses the event timezone consistently when applying availability rules.
- Invalid availability inputs are blocked before save and paired with a clear validation message.

## API Contract

### Get event availability rules
- `GET /host/events/{eventId}/availability`
- Auth: required host session
- Purpose: load the current availability rules for one host event
- `200 OK` response:

```json
{
  "eventId": "evt_123",
  "timezone": "America/New_York",
  "weeklyAvailability": [
    {
      "day": "monday",
      "enabled": true,
      "ranges": [
        {
          "start": "09:00",
          "end": "12:00"
        },
        {
          "start": "13:00",
          "end": "17:00"
        }
      ]
    },
    {
      "day": "tuesday",
      "enabled": false,
      "ranges": []
    }
  ],
  "constraints": {
    "minimumNoticeHours": 24,
    "bookingWindowDays": 30,
    "bufferBeforeMinutes": 15,
    "bufferAfterMinutes": 15
  }
}
```
- `401 Unauthorized`: host is not signed in
- `403 Forbidden`: host cannot access this event
- `404 Not Found`: event does not exist

### Update event availability rules
- `PUT /host/events/{eventId}/availability`
- Auth: required host session
- Purpose: save weekly availability and booking constraints for one host event
- Request body:

```json
{
  "timezone": "America/New_York",
  "weeklyAvailability": [
    {
      "day": "monday",
      "enabled": true,
      "ranges": [
        {
          "start": "09:00",
          "end": "12:00"
        },
        {
          "start": "13:00",
          "end": "17:00"
        }
      ]
    },
    {
      "day": "tuesday",
      "enabled": false,
      "ranges": []
    }
  ],
  "constraints": {
    "minimumNoticeHours": 24,
    "bookingWindowDays": 30,
    "bufferBeforeMinutes": 15,
    "bufferAfterMinutes": 15
  }
}
```
- `200 OK` response:

```json
{
  "eventId": "evt_123",
  "timezone": "America/New_York",
  "weeklyAvailability": [
    {
      "day": "monday",
      "enabled": true,
      "ranges": [
        {
          "start": "09:00",
          "end": "12:00"
        },
        {
          "start": "13:00",
          "end": "17:00"
        }
      ]
    },
    {
      "day": "tuesday",
      "enabled": false,
      "ranges": []
    }
  ],
  "constraints": {
    "minimumNoticeHours": 24,
    "bookingWindowDays": 30,
    "bufferBeforeMinutes": 15,
    "bufferAfterMinutes": 15
  }
}
```
- `400 Bad Request`: one or more time ranges or constraint values are invalid
- `401 Unauthorized`: host is not signed in
- `403 Forbidden`: host cannot update this event
- `404 Not Found`: event does not exist

### Get public slots with availability rules applied
- `GET /public/booking-links/{workspaceSlug}/{eventSlug}/slots?date=YYYY-MM-DD`
- Auth: none
- Purpose: return only the valid time slots for the selected date after applying saved event availability rules
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

## UI Spec
- Follow `.zenve/agents/react-dev/DESIGN.md` for the visual language.
- The route is an authenticated host-facing settings flow, not a public guest booking page.
- The availability view is reachable from an existing event-management context.
- The page shows one row or section per weekday with a clear enabled or unavailable state.
- Each enabled day supports multiple time ranges shown in host-readable local time.
- Booking constraints are grouped separately from weekly hours so the host can scan rules quickly.
- The page provides a primary save action and visible confirmation after a successful save.
- Validation feedback appears inline when a time range overlaps, ends before it starts, or a constraint value is outside the allowed range.

## User Stories

## Story: Host sets weekly availability for an event

**As a** Host,
**I want** to define which hours I am available for a specific event,
**so that** guests only see slots I am actually willing to offer.

### Acceptance Criteria

- [ ] The host can enable or disable booking availability for each day of the week for one event.
- [ ] The host can add, edit, and remove multiple time ranges within the same enabled day.
- [ ] Saving valid weekly availability persists the changes and reloading the availability view shows the saved values.
- [ ] Public slot results for the event include only times that fall inside the saved weekly availability.

### Out of scope

- Date-specific overrides such as holidays or one-off exceptions.
- Sharing one weekly schedule across multiple events.
- Automatic import of availability from external calendars.

### Notes

- This story covers recurring weekly availability only.
- Each event manages its own availability in the first release.

## Story: Host sets booking constraints for an event

**As a** Host,
**I want** to control notice periods, booking windows, and meeting buffers,
**so that** my schedule stays realistic and protected from inconvenient bookings.

### Acceptance Criteria

- [ ] The host can set a minimum notice period for the event before a guest can book a slot.
- [ ] The host can set how many days into the future the event is bookable.
- [ ] The host can set buffer time before and after each booked meeting for the event.
- [ ] Public slot results exclude times that violate the saved notice period, booking window, or buffer settings.

### Out of scope

- Limits on the number of meetings per day.
- Different constraints for different guests.
- Travel time or location-aware rules.

### Notes

- This first scope defines the previously open product question about required booking constraints.
- Constraint defaults can be product-defined by engineering if they are shown clearly in the UI.

## Open Questions
- None for this first issue scope.

## Appendix
- Reference issue: `#29`
- Related PRDs: `docs/product/calendar-booking-page.md`, `docs/product/host-event-details.md`
- Rationale: this feature directly improves the North Star metric by making public slots trustworthy enough for hosts to keep sharing Zenve links.
