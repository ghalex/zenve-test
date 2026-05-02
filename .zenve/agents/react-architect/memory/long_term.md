# React Architect Long-Term Memory

- The SPA frontend for this repo lives under `ui/src/`, so repo-wide React architecture rules should be applied within that subtree.
- The current home route is `ui/src/pages/home.tsx` and already sits inside `ui/src/components/common/app-shell.tsx`.
- `react-dev/DESIGN.md` defines an industrial control-panel look with `rounded-none`, dashed borders, dense spacing, monospace metadata, and semantic-only accent color usage.
- `docs/product/daily-card-rail.md` is the first frontend PRD and explicitly excludes todo interactions plus the separate Today Focus Indicator feature.
- Zenve MVP is currently client-side only for the frontend flow; no backend contract is required for the Daily Card Rail PRD.
