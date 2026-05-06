Completed issue #31 guest-timezone-selection task `01-booking-timezone-data-contract`:
- Updated booking types, RTK Query args, Redux booking state, and mock booking contracts for `displayTimezone` plus `eventTimezone`.
- Added minimal public booking page wiring to initialize and pass the selected display timezone without changing visible UI scope.
- Verified `pnpm lint` and `pnpm build` in `ui/`; build still reports the existing non-blocking chunk-size warning.
