# PRD: Settings Page

## Overview
The settings page gives an authenticated host a dedicated place to manage their personal profile information inside Zenve. The first release covers changing display name and avatar so hosts can keep their booking presence accurate, while establishing a stable page that can hold additional account settings later.

## Problem
Hosts need to control how they appear across the product and on shared scheduling surfaces. Without a settings page, a host has no clear in-product place to update their name or avatar, which leads to stale profile details and makes the account area feel incomplete.

## Users
- Host

## Goals
- Let a host update the profile details that affect their identity in Zenve.
- Establish a host-facing settings entry point that can expand without changing the first-release user flow.

## Non-Goals
- Password, email, notification, billing, or team settings.
- Guest-facing settings.
- Multi-section settings navigation beyond what is needed for the first profile page.
- Defining or shipping future settings categories in this issue.

## Requirements

### Functional
- The product exposes an authenticated host-facing settings page.
- The page displays the host's current name in an editable field.
- The name field is required and accepts 1 to 80 characters after trimming leading and trailing whitespace.
- The page displays the host's current avatar if one exists.
- The page lets the host choose a new avatar image from the settings page and replace the current avatar.
- The page lets the host remove the current avatar and return to a default no-avatar state.
- The page provides a single clear save action for profile changes.
- After a successful save, the page shows confirmation that the changes were saved.
- If save fails, the page keeps the host on the settings page and shows an error state.
- The page includes a visible placeholder area for future settings so the surface does not appear unfinished.

### Non-Functional
- The page works on mobile and desktop screens.
- The form is usable with keyboard navigation.
- Text labels and status messages remain understandable without relying on color alone.
- Avatar presentation remains legible when no image is present.

## UI Spec
- Follow `.zenve/agents/frontend-dev/DESIGN.md` for the visual language.
- The route is an authenticated host-facing page, not a guest booking surface.
- The page presents a clear title that tells the host they are in settings.
- The first visible section focuses on profile information only.
- The profile section displays the current avatar state, name field, and the actions needed to update them.
- The save action stays visible without requiring the host to discover hover-only controls.
- The page includes a clearly labeled future-facing area such as "More settings coming soon" so additional settings can be added later without redefining the page purpose.

## API Contract
- `GET /api/settings/profile`
  - Auth: required
  - Response `200`:
    - `{ "name": string, "avatarUrl": string | null }`
- `PUT /api/settings/profile`
  - Auth: required
  - Request body:
    - `{ "name": string, "avatarUrl": string | null }`
  - Response `200`:
    - `{ "name": string, "avatarUrl": string | null, "updatedAt": string }`
  - Response `400`:
    - Invalid profile input.
  - Response `401`:
    - Unauthenticated request.
  - Response `500`:
    - Save failed.

## User Stories

## Story: Host updates profile details in settings

**As a** Host,
**I want** to update my name and avatar from a settings page,
**so that** my scheduling profile reflects who I am.

### Acceptance Criteria

- [ ] The authenticated host can open a settings page that displays their current name and avatar state.
- [ ] The host can change the name value and save it from the same page when the name contains 1 to 80 characters after trimming.
- [ ] The host can add or replace an avatar and save it from the same page.
- [ ] The host can remove an existing avatar and save the no-avatar state.
- [ ] After a successful save, the page displays a success confirmation without leaving the settings page.
- [ ] If the save fails, the page displays an error message and preserves the host's unsaved input on the page.

### Out of scope

- Changing password or email.
- Managing notifications, billing, or integrations.
- Defining behavior for additional settings categories beyond a placeholder.

### Notes

- This issue covers a profile-settings first version of the broader settings area.
- "Other settings in the future" is acknowledged through page structure and messaging, not through additional editable controls in this story.

## Open Questions
- None.

## Appendix
- Reference issue: `#36`
- Source request: "Create a simple settings page for user to change name avatar and other settings in the future"
