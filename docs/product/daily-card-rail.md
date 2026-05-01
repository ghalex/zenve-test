# PRD: Daily Card Rail

## Overview

The Daily Card Rail is the first core feature for Zenve. It gives the Daily Planner a horizontal sequence of day cards with today centered on entry, creating the app's primary navigation model for planning ahead and reviewing past days without leaving the main screen.

## Problem

Zenve's shell exists, but the user currently has no way to orient around days or move through time inside the app. For a day-based todo product, this blocks the main user flow before todo creation even begins. The Daily Planner needs a fast way to open the app, land on today, and move one day backward or forward without dealing with menus, tabs, or calendar pickers.

## Users

- **Daily Planner** - an individual who organises personal or work tasks day-by-day and values simplicity over feature richness.

## Goals

- Users land on today's day card on initial app load in 100% of normal sessions.
- Users can move to the previous or next day in a single interaction from the home screen.

## Non-Goals

- Todo creation, editing, completion, or deletion inside a day card
- Visual emphasis patterns reserved for the separate Today Focus Indicator feature
- Week view, month view, date picker, or jump-to-date navigation
- Keyboard navigation between day cards

## Requirements

### Functional

- The home screen displays a horizontal rail of day cards.
- On initial load of the home screen, the centered card represents the current system date.
- Each day card header displays the corresponding date in a human-readable format.
- The user can move the centered card backward by one calendar day and forward by one calendar day.
- The user can navigate with explicit previous and next controls.
- The user can navigate with a horizontal swipe gesture on touch devices.
- Returning to the home screen re-centers the rail on the current system date.
- On mobile, one day card is fully visible at a time.
- On wider viewports, the centered day card remains primary while adjacent day cards are partially visible.

### Non-Functional

- The UI follows `.zenve/agents/react-dev/DESIGN.md` for visual constraints and interaction density.
- Navigation between adjacent days completes without a full-page reload.
- Day labels use the user's local calendar date derived from the device clock.
- The rail remains usable on common mobile and desktop viewport sizes.

## User Stories

## Story: Daily Card Rail

**As a** Daily Planner,
**I want** to see a horizontal rail of day cards with today's card centered on screen,
**so that** I can instantly orient myself to the current day and browse adjacent days.

### Acceptance Criteria

- [ ] The home page displays a horizontal rail of day cards.
- [ ] The centered card on initial home page load represents the current system date.
- [ ] Each visible day card shows a date header in a human-readable format.
- [ ] Activating the previous control moves the centered card back by exactly one calendar day.
- [ ] Activating the next control moves the centered card forward by exactly one calendar day.
- [ ] Swiping horizontally on a touch device moves the centered card by exactly one calendar day in the swipe direction.
- [ ] Leaving the home page and returning to it centers the rail on the current system date.
- [ ] On mobile viewports, one day card is fully visible at a time.
- [ ] On wider viewports, the centered day card is fully visible and adjacent day cards are partially visible.

### Out of scope

- Todo item interactions inside a day card
- A distinct "Today" badge, special border, or "Back to Today" action
- Week, month, or agenda layouts
- Date picker or arbitrary jump navigation

### Notes

- This is the foundational layout for all later todo interactions.
- Empty day cards are acceptable in this story because todo management is covered by a separate PRD.

## Open Questions

- None.

## Appendix

- Source priority: `.zenve/agents/pm/PRODUCT.md` -> `## Current Priorities`
- Related planning artifact: `docs/product/top-5-features.md`
- For this MVP, the product requirement is adjacent-day navigation with no user-facing hard stop defined in the PRD.
