# Long-Term Memory

- Zenve's current core flow is a public scheduling experience where a host shares a link and a guest books a meeting without back-and-forth messaging.
- Primary personas are Host and Guest.
- Issue `#12` is scoped as the first public booking page: select date, select time, enter contact information, and create a meeting.
- Issue `#15` is scoped as a read-only host events overview page that uses mock data and shows each event's title, duration, connected calendar, and public link.
- Issue `#17` is scoped as the first host event details flow: a host selects an event and edits title, duration, and connected calendar.
- Issue `#22` established the product visual direction: a MailHog-inspired warm editorial SaaS design system documented for `react-dev`.
- Issue `#29` introduced `docs/product/host-availability-rules.md` as a new core feature recommendation for per-event weekly availability plus booking constraints.
- The first-release availability scope is per-event only and includes weekly hours, minimum notice, booking window days, and before/after buffers.
