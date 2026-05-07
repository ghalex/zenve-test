# Long-Term Memory

- The host settings page lives at `/settings` inside `ui/` and is protected by `PrivateRoute`.
- Settings profile data uses `settingsApi` with a local mock fallback when the backend route is unavailable or the frontend has no API base URL.
- Avatar uploads use Supabase Storage in the `avatars` bucket when configured, and fall back to an in-browser data URL during mock development.
