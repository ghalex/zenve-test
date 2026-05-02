# PRD: Host Event Details

## Overview
The host event details flow lets a host open an existing event and edit the core scheduling settings that affect what guests can book. This gives hosts a way to correct outdated event information without recreating the event from scratch.

## Problem
Hosts need to keep their scheduling links accurate as their meeting offerings change. Today the first host events page is read-only, so a host cannot update an event title, switch the connected calendar, or change the meeting duration after an event has been created.

## Users
- Host

## Goals
- Let a host update the core details of an existing event in one edit flow.
- Reduce the need for hosts to recreate an event when only a few settings change.

## Non-Goals
- Creating a new event.
- Deleting an event.
- Editing advanced availability rules such as notice periods, buffers, or date ranges.
- Editing guest booking form questions, reminders, payments, or conferencing settings.

## Requirements

### Functional
- The product exposes an authenticated host-facing event details view for an existing event.
- A host can open the event details view from the host events page by selecting an event.
- The event details view loads the current event values before the host edits them.
- A host can edit the event title.
- A host can edit the event duration in minutes.
- A host can change which connected calendar receives bookings for the event.
- A host can save the updated event details.
- After a successful save, the host sees the updated values in the event details view and on the host events page.
- If required fields are empty or invalid, the product blocks saving and shows a clear validation message.
- If the event does not exist or is not accessible to the signed-in host, the product shows a not found or access-denied state instead of the edit form.

### Non-Functional
- The event details flow works on mobile and desktop screens.
- Form controls, validation messages, and save actions are keyboard accessible.
- Saving updated event details returns a visible success or failure state within the same host flow.

## API Contract

### Get event details
- `GET /host/events/{eventId}`
- Auth: required host session
- Purpose: load the existing values for one host event
- `200 OK` response:

```json
{
  "event": {
    "id": "evt_123",
    "title": "Intro Call",
    "durationMinutes": 30,
    "calendarId": "cal_abc",
    "calendarLabel": "Work Calendar",
    "publicLink": "https://zenve.test/zenve-demo/intro-call"
  }
}
```
- `401 Unauthorized`: host is not signed in
- `403 Forbidden`: host cannot access this event
- `404 Not Found`: event does not exist

### List connected calendars
- `GET /host/calendars`
- Auth: required host session
- Purpose: return the calendars that the signed-in host can assign to an event
- `200 OK` response:

```json
{
  "calendars": [
    {
      "id": "cal_abc",
      "label": "Work Calendar"
    },
    {
      "id": "cal_xyz",
      "label": "Personal Calendar"
    }
  ]
}
```
- `401 Unauthorized`: host is not signed in

### Update event details
- `PATCH /host/events/{eventId}`
- Auth: required host session
- Purpose: save updated core details for one host event
- Request body:

```json
{
  "title": "Customer Intro Call",
  "durationMinutes": 45,
  "calendarId": "cal_xyz"
}
```
- `200 OK` response:

```json
{
  "event": {
    "id": "evt_123",
    "title": "Customer Intro Call",
    "durationMinutes": 45,
    "calendarId": "cal_xyz",
    "calendarLabel": "Personal Calendar",
    "publicLink": "https://zenve.test/zenve-demo/intro-call"
  }
}
```
- `400 Bad Request`: one or more fields are missing or invalid
- `401 Unauthorized`: host is not signed in
- `403 Forbidden`: host cannot update this event
- `404 Not Found`: event does not exist

## UI Spec
- Follow `.zenve/agents/react-dev/DESIGN.md` for the visual language.
- The route is an authenticated host-facing edit flow, not a public guest booking page.
- Selecting an event from the host events page opens a dedicated event details view.
- The view shows the current event title, duration, connected calendar, and public link context before any edits are saved.
- The public link is visible as reference context but is not editable in this first scope.
- The editable fields in this first scope are title, duration, and connected calendar.
- The view provides a primary save action and a clear way to leave without saving.
- Validation feedback appears next to the relevant field or in direct form context before a save completes.
- After a successful save, the host remains in a host-management context with visible confirmation that the event was updated.

## User Stories

## Story: Host edits an existing event

**As a** Host,
**I want** to open an existing event and update its core details,
**so that** guests book the correct meeting setup without me recreating the event.

### Acceptance Criteria

- [ ] Selecting an event from the host events page opens an event details view for that event.
- [ ] The event details view loads the current title, duration, connected calendar, and public link for the selected event.
- [ ] A host can change the event title, duration, and connected calendar and save those changes in one flow.
- [ ] After a successful save, the updated values are shown in the event details view and on the host events page.
- [ ] If a required field is empty or invalid, the save action does not complete and the host sees a validation message.

### Out of scope

- Editing advanced availability constraints.
- Editing the public booking link.
- Creating or deleting events.

### Notes

- The issue wording references editing "title, calendar, time block, etc". For this first scope, "time block" is defined as event duration.
- This PRD intentionally limits the first edit flow to core event metadata so the story remains ready for development.

## Open Questions
- None for this first issue scope.

## Appendix
- Reference issue: `#17`
- Related PRD: `docs/product/host-events-page.md`
