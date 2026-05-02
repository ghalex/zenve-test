# PRD: Host Events Page

## Overview
The host events page is the first authenticated host-facing scheduling surface in Zenve. It lets a host review all of their existing event types in one place and see the public booking link for each event before backend data is available.

## Problem
Hosts need a simple way to confirm which meeting types they offer and which public links they can share. Today there is no host page that lists event types, so a host cannot quickly review their offerings or copy the correct booking link without relying on implementation knowledge.

## Users
- Host

## Goals
- Let a host see all configured event types from one page.
- Let a host identify the shareable public link for each event without leaving the page.

## Non-Goals
- Creating, editing, deleting, or reordering event types.
- Real backend persistence or live calendar integration data.
- Availability editing, booking analytics, or guest management.

## Requirements

### Functional
- The product exposes a host-facing page that lists the host's events from mock data.
- Each event entry displays the event title.
- Each event entry displays the event duration in a host-readable format.
- Each event entry displays the connected calendar label for that event.
- Each event entry displays the public booking link for that event.
- The page supports multiple event entries in a single list view.
- If there are no events in the mock dataset, the page shows an empty state that tells the host they have no events yet.

### Non-Functional
- The page works on mobile and desktop screens.
- The event list content is readable without relying on hover-only interactions.
- Public links are presented as selectable text or a clear interactive control so a host can access the full link.

## UI Spec
- Follow `.zenve/agents/react-dev/DESIGN.md` for the visual language.
- The route is an authenticated host-facing page, not a public guest booking page.
- The page presents a clear page title that tells the host they are viewing their events.
- Each event appears as a distinct row or card in a scannable list.
- Each event entry displays four pieces of information together: title, duration, connected calendar, and public link.
- The public link is visually identifiable as the shareable booking URL for that event.
- If the list is empty, the page replaces the list with a dedicated empty state message.

## User Stories

## Story: Host reviews all events and their public links

**As a** Host,
**I want** to see all of my events and their public booking links on one page,
**so that** I can confirm what meeting types I offer and share the correct link.

### Acceptance Criteria

- [ ] The host events page renders a list of events from mock data.
- [ ] Every event in the list displays a title, a duration, a connected calendar label, and a public link.
- [ ] The page displays more than one event consistently when the mock dataset contains multiple events.
- [ ] When the mock dataset is empty, the page shows an empty state instead of a blank list.

### Out of scope

- Editing event details.
- Creating new events.
- Replacing mock data with backend data.

### Notes

- This issue covers a read-only first version of the host events page.
- Backend APIs and persistence are deferred until host event management is defined.

## Open Questions
- [ ] What host action is required next from this page after viewing a public link: copy, open, edit, or create a new event?

## Appendix
- Reference issue: `#15`
- Source request: "As a host I want to be able to see all my events" with event title, duration, connected calendar, and a public link for each event.
