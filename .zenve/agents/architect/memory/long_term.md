# 2026-05-07
- UI source lives under `ui/src/`, not top-level `src/`. Why: the project root has a `ui/` directory containing the React app with its own `package.json`.
- Plans are written to `docs/plans/`. Why: architect output convention per AGENTS.md.
- shadcn style is `new-york` with `pnpm` as package manager. Why: needed for correct install commands in plans.
- Auth state (selectCurrentUser, signOut) lives in `ui/src/store/auth/slice.ts`. Why: frequently referenced when planning layout/nav changes.
- DESIGN.md at `ui/DESIGN.md` is a pointer to `.zenve/agents/frontend-dev/DESIGN.md` for authoritative design tokens. Why: dev agent needs to know the real source of design truth.
