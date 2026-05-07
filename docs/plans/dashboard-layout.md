# Plan: Dashboard Layout with Sidebar

## Issue
The host app (authenticated pages) needs a dashboard layout with a sidebar on the left and content on the right. The public booking page and auth page keep their current full-width layout. Reference: shadcn `sidebar-07` block.

## Context
- Current layout: each page (`host-events-overview.tsx`, `settings-overview.tsx`) renders its own full-bleed hero with inline navigation links ("Settings", "Back to events") and a "Sign out" button. There is no shared layout shell.
- Routes are defined in `ui/src/routes.tsx` using React Router with `<PrivateRoute>` / `<PublicRoute>` guards.
- No sidebar, sheet, or skeleton shadcn components are installed yet. The project uses `pnpm` (not npm/npx).
- shadcn style: `new-york`, icon library: `lucide`, path alias: `@/`.
- Auth state is in `ui/src/store/auth/slice.ts` with `selectCurrentUser` and `signOut`.

## Changes

1. **Install the shadcn sidebar-07 block**
   - Run: `pnpm dlx shadcn@latest add sidebar-07` from the `ui/` directory
   - This installs `ui/src/components/ui/sidebar.tsx` (plus dependencies like `sheet.tsx`, `skeleton.tsx`, `tooltip.tsx` if missing) and block-level components (e.g. `app-sidebar.tsx`, `nav-main.tsx`, `nav-user.tsx`, `team-switcher.tsx`)
   - After installing, verify which files were added under `ui/src/components/` and `ui/src/components/ui/`

2. **Create the app sidebar component**
   - File: `ui/src/components/dashboard/app-sidebar.tsx`
   - Replace the example/placeholder content from the sidebar-07 block with Zenve-specific navigation
   - Navigation items: **Events** (links to `/`, icon: `CalendarDays`) and **Settings** (links to `/settings`, icon: `Settings2`)
   - Sidebar header: display "Zenve" as a text label (no logo asset exists)
   - Sidebar footer: display the signed-in user info from `selectCurrentUser` (email) and a "Sign out" action that dispatches `signOut` from `@/store/auth`
   - Delete any unused block files from the install (e.g. `nav-projects.tsx`, `team-switcher.tsx`) that are not needed

3. **Create the barrel export for dashboard components**
   - File: `ui/src/components/dashboard/index.ts`
   - Export `AppSidebar` and `DashboardLayout` (created in the next step)

4. **Create the dashboard layout component**
   - File: `ui/src/components/dashboard/dashboard-layout.tsx`
   - Uses `SidebarProvider`, `AppSidebar`, and `SidebarInset` from the sidebar primitives
   - Renders `<Outlet />` from React Router inside `SidebarInset` so child routes appear in the content area
   - This is the shared shell for all authenticated host pages

5. **Update routes to use the dashboard layout**
   - File: `ui/src/routes.tsx`
   - Wrap the `/` and `/settings` private routes inside a parent `<Route element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>` layout route
   - The `/` and `/settings` routes become nested `<Route index ...>` and `<Route path="settings" ...>` children (remove their individual `<PrivateRoute>` wrappers since the parent handles auth)
   - `/auth` (PublicRoute) and `/:workspaceSlug/:eventSlug` (public booking) remain top-level routes outside the layout — they keep their current full-width layout
   - The catch-all `*` redirect stays top-level

6. **Refactor host-events-overview to remove redundant chrome**
   - File: `ui/src/components/host-events/host-events-overview.tsx`
   - Remove the "Settings" link button (sidebar nav handles this now)
   - Remove the "Sign out" button and its `signOut` dispatch (sidebar footer handles this now)
   - Simplify the hero section: keep the page title and description but remove the navigation/action buttons row
   - Remove the `signOut` and `selectCurrentUser` imports if no longer used

7. **Refactor settings-overview to remove redundant chrome**
   - File: `ui/src/components/settings/settings-overview.tsx`
   - Remove the "Back to events" link button (sidebar nav handles this now)
   - Simplify the hero section: keep the page title and description but remove the navigation button row

8. **Update page components for layout compatibility**
   - Files: `ui/src/pages/home.tsx`, `ui/src/pages/settings.tsx`
   - No structural changes needed — these already render their overview components which will now appear inside `SidebarInset` via the layout route
   - Verify that the overview components no longer render their own `min-h-screen` wrapper (the dashboard layout handles the full-height shell). If `host-events-overview.tsx` or `settings-overview.tsx` still have `min-h-screen bg-background text-foreground` on their outer div, remove it — the layout provides these

## Considerations
- The sidebar collapses to a sheet overlay on mobile (sidebar-07 supports this out of the box). Keep this default behavior.
- The sidebar header shows "Zenve" as plain text since no logo/brand asset exists. If a logo is added later, update the sidebar header.
- The `editorial-hero` sections on host pages may need padding/width adjustments once they render inside `SidebarInset` instead of full viewport width. The dev agent should visually verify the hero does not look too wide or misaligned in the narrower content area.
- The public booking page (`public-booking-page.tsx`) and auth page are not touched — they keep their existing full-width, no-sidebar layout.
- `selectCurrentUser` usage moves from `host-events-overview.tsx` to `app-sidebar.tsx`. The settings page never used it directly.

## Verification
- Navigate to `/` while authenticated: sidebar is visible on the left with "Events" and "Settings" nav items; host events content renders in the right content area
- Navigate to `/settings` while authenticated: same sidebar is visible; settings content renders in the right content area
- Click "Events" in the sidebar from `/settings`: navigates to `/`
- Click "Settings" in the sidebar from `/`: navigates to `/settings`
- Click "Sign out" in the sidebar footer: user is signed out and redirected to `/auth`
- Navigate to `/:workspaceSlug/:eventSlug` (public booking page): no sidebar, original full-width layout intact
- Navigate to `/auth`: no sidebar, original full-width layout intact
- Resize browser to mobile width: sidebar collapses and is accessible via a toggle/sheet
