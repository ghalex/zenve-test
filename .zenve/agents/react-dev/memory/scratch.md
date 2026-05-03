Completed issue #25 Supabase auth integration:
- Added `@supabase/supabase-js`, a typed `auth` Redux slice, and `src/lib/supabase.ts` for browser client setup.
- Added `/auth` with a warm editorial sign-in/sign-up form adapted from the requested shadcn `login-03` block.
- Guarded `/` behind `PrivateRoute`, kept public booking routes open, and added sign-out from the host overview.
- Verified `pnpm build` in `ui/`; Vite reported a non-blocking large chunk warning.
