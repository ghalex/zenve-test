# PRD: Login Page

## Status
Blocked pending one product decision: the account-access support path.

## Overview
This feature creates the first user-facing entry point into Zenve: a login page that lets returning operators authenticate and enter the product workspace. It exists to make the core access path explicit, reduce ambiguity for first implementation work, and give frontend and backend agents a shared definition of done.

## Problem
Zenve currently has no defined login experience. Returning users do not have a clear place to enter credentials, cannot distinguish loading from failure, and have no guidance when access fails. Without this page, the core authenticated journey cannot begin.

## Users
- Operator

## Goals
- Give returning operators a single, clear page where they can enter credentials and start an authenticated session.
- Ensure failed login attempts produce a clear error state without leaving the user uncertain about what happened.

## Non-Goals
- User registration or account creation
- Password reset flow implementation
- Multi-factor authentication
- Single sign-on
- Role-based workspace selection after login

## Requirements

### Functional
- The product exposes a public login route that unauthenticated users can access directly.
- The page presents inputs for email and password plus a primary action to sign in.
- The page displays the product name and a short statement that this page is for authenticated access.
- The primary action remains disabled until both required fields contain values.
- Submitting valid-looking input starts an authentication request and presents a visible loading state until the request completes.
- A successful authentication response sends the user to `/dashboard`.
- A failed authentication response keeps the user on the login page and shows a clear error message.
- The page provides a visible support path for users who cannot access their account.

### Non-Functional
- The page follows the visual constraints in `.zenve/agents/react-developer/DESIGN.md`.
- The page is usable on mobile and desktop viewports without horizontal scrolling.
- All interactive elements are keyboard accessible.
- Each field has a persistent text label and the password field masks entered characters.

## UI Spec
- Entry state:
The page contains a login form with email, password, page title, short supporting text, and a primary sign-in action.
- Validation state:
When either field is empty, the sign-in action is disabled.
- Loading state:
When the user submits the form, the primary action communicates progress and duplicate submissions are blocked.
- Error state:
When authentication fails, an error message appears in the form area and previously entered email remains visible.
- Success state:
When authentication succeeds, the user leaves the login page and is redirected to `/dashboard`.
- Support state:
The page includes a visible text path for account access help.

## API Contract
- Endpoint: `POST /auth/login`
- Auth: Public endpoint, no existing session required
- Request body:
```json
{
  "email": "user@example.com",
  "password": "string"
}
```
- Success response: `200 OK`
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "email": "user@example.com",
    "name": "string"
  }
}
```
- Invalid credentials response: `401 Unauthorized`
```json
{
  "message": "Invalid email or password"
}
```
- Unexpected failure response: `500 Internal Server Error`
```json
{
  "message": "Unable to sign in right now"
}
```

## User Stories

## Story: Sign in to Zenve

**As a** Operator,
**I want** to enter my email and password on a login page,
**so that** I can access the authenticated Zenve workspace.

### Acceptance Criteria

- [ ] An unauthenticated user can open the login page directly and see fields for email and password plus a primary sign-in action.
- [ ] The primary sign-in action is disabled when either required field is empty.
- [ ] Submitting the form with both fields filled shows a visible loading state until the authentication request completes.
- [ ] A successful authentication response moves the user from the login page to `/dashboard`.
- [ ] A failed authentication response keeps the user on the login page and shows a clear error message.
- [ ] The page shows a visible support path for users who cannot access their account.

### Out of scope

- Creating new accounts
- Resetting a forgotten password
- Alternative sign-in methods

### Notes

- This story covers the UI entry flow only.
- The visual implementation must follow `.zenve/agents/react-developer/DESIGN.md`.
- Successful login redirects to `/dashboard`.

## Open Questions
- [ ] What support copy or contact method should appear for account access issues?

## Appendix
- Source ticket: issue #1 `Create login page in UI`
