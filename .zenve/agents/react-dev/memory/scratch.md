Completed issue #20 public booking page fix:
- Added mock-backed booking context, slots, and booking submission for `/:workspaceSlug/:eventSlug`.
- Replaced the placeholder booking flow shell with a selectable calendar, time slots, guest form, and confirmation state.
- Verified `pnpm exec tsc --noEmit` and `pnpm build` in `ui/` after installing dependencies in this worktree.
