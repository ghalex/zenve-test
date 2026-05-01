# PRD: Top 5 Features - Zenve MVP

## Overview

This PRD defines the five features required to take Zenve from a scaffolded shell to a functional daily todo app. Each feature is scoped as an independent, shippable unit. Together they deliver the core value proposition: a day-centric horizontal timeline for managing todos.

## Problem

Users who want a simple, day-oriented todo list currently have no functionality in the app. The shell is live but there is no way to view days, create todos, or persist data. Without these five features, the product delivers zero user value.

## Users

- **Daily Planner** - an individual who organises personal or work tasks day-by-day and values simplicity over feature richness.

## Goals

- User can open the app, see today's card centered, navigate to other days, and manage todos
- Todos persist across page refreshes without a backend
- The experience is fast, intuitive, and requires no onboarding

## Non-Goals

- No backend API or multi-device sync in this phase
- No authentication or user accounts
- No recurring tasks, tags, or categories
- No drag-to-reorder across different day cards

---

## Feature 1: Daily Card Rail

### Story: Daily Card Rail

**As a** Daily Planner,
**I want** to see a horizontal rail of day-cards with today's card centered on screen,
**so that** I can instantly orient myself to the current day and browse adjacent days.

#### Acceptance Criteria

- [ ] The app displays a horizontal rail of day-cards on the home page
- [ ] Today's card is centered in the viewport on initial load
- [ ] Each card displays the day's date (e.g. "Thu, May 1") as a header
- [ ] The user can navigate to the previous or next day by swiping horizontally or clicking navigation controls
- [ ] Navigating away and returning to the home page re-centers on today's card

#### Out of scope

- Infinite scroll / lazy loading of distant dates
- Week or month view
- Keyboard navigation between cards

#### Notes

- The rail is the foundational layout; all other features render inside a day-card.
- On mobile viewports, only one card is visible at a time. On wider viewports, adjacent cards are partially visible.

---

## Feature 2: Todo CRUD

### Story: Todo CRUD

**As a** Daily Planner,
**I want** to add, edit, complete, and delete todos on any day-card,
**so that** I can track what I need to do and mark progress.

#### Acceptance Criteria

- [ ] Each day-card contains a text input to add a new todo; pressing Enter creates the todo
- [ ] Each todo displays its text and a checkbox to mark it complete
- [ ] Clicking a todo's text enters inline edit mode; pressing Enter saves the edit
- [ ] Each todo has a delete action that removes it from the list after confirmation or an undo affordance
- [ ] Completed todos are visually distinguished (e.g. strikethrough, muted color) and appear below incomplete todos

#### Out of scope

- Due times or priority levels on individual todos
- Bulk actions (complete all, delete all)
- Drag-to-reorder (covered in Feature 5)

#### Notes

- State is managed in the Redux store under a `todos` domain keyed by date string (YYYY-MM-DD).

---

## Feature 3: Local Persistence

### Story: Local Persistence

**As a** Daily Planner,
**I want** my todos to persist when I close or refresh the browser,
**so that** I do not lose my task list.

#### Acceptance Criteria

- [ ] All todos (text, completion status, order, associated date) are persisted to browser localStorage
- [ ] On app load, previously saved todos are hydrated into the Redux store and displayed in the correct day-cards
- [ ] Deleting a todo removes it from both the store and localStorage
- [ ] If localStorage is unavailable or corrupt, the app starts with an empty state and does not crash

#### Out of scope

- IndexedDB, server-side storage, or export/import
- Storage quota management or migration tooling
- Cross-tab synchronization

#### Notes

- A lightweight Redux middleware or `redux-persist` integration handles serialization.

---

## Feature 4: Today Focus Indicator

### Story: Today Focus Indicator

**As a** Daily Planner,
**I want** today's card to be visually distinct from past and future cards,
**so that** I always know which card represents the current day.

#### Acceptance Criteria

- [ ] Today's card has a distinct border or accent color that no other card uses
- [ ] A "Today" label is visible on today's card header alongside the date
- [ ] When the user has navigated away from today, a "Back to Today" button is visible and one click re-centers the rail on today's card

#### Out of scope

- Differentiating past vs. future cards with separate styles
- Animated transitions when returning to today

#### Notes

- The indicator relies solely on comparing the card's date to the system clock date.

---

## Feature 5: Drag-to-Reorder Todos

### Story: Drag-to-Reorder Todos

**As a** Daily Planner,
**I want** to drag and drop todos within a day-card to change their order,
**so that** I can prioritise my tasks visually.

#### Acceptance Criteria

- [ ] The user can long-press or grab a drag handle on a todo to initiate a drag
- [ ] While dragging, a visual placeholder indicates the drop target position
- [ ] Dropping a todo in a new position updates the list order immediately
- [ ] The new order is persisted (survives page refresh via Feature 3)

#### Out of scope

- Dragging todos between different day-cards
- Keyboard-based reordering
- Sorting todos automatically by any property

#### Notes

- Depends on Feature 2 (todos exist) and Feature 3 (order is persisted).

---

## Implementation Order (recommended)

| Order | Feature | Rationale |
|---|---|---|
| 1 | Daily Card Rail | Foundational layout; all other features live inside day-cards |
| 2 | Todo CRUD | Core value; without it the app does nothing |
| 3 | Local Persistence | Prevents data loss; makes the app usable beyond a single session |
| 4 | Today Focus Indicator | Improves orientation; small scope, high UX impact |
| 5 | Drag-to-Reorder | Polish feature; depends on 2 and 3 being complete |

## Open Questions

- [ ] Is data stored only in localStorage, or do we plan IndexedDB for larger datasets?
- [ ] Do completed todos auto-hide after end of day, or stay visible indefinitely?
- [ ] What is the maximum number of past/future days visible in the rail?

## Appendix

- Tech stack: React 19, Vite, TypeScript, Tailwind CSS v4, shadcn/ui, Redux Toolkit
- No backend; all data is client-side in this phase
