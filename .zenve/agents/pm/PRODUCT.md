# Product: Zenve

## Vision

Zenve lets people share a booking link tied to their availability so meetings can be scheduled without back-and-forth messaging.

## North Star Metric

Weekly completed bookings through Zenve scheduling links.

## Target Users

| Persona | Description | Primary need |
|---|---|---|
| Host | A professional sharing a booking link so others can reserve time. | Publish availability and receive confirmed meetings with low setup effort. |
| Guest | A person booking time with a host through a shared link. | Pick a valid time quickly and submit contact details without confusion. |

## Key Metrics / KPIs

- Booking completion rate from public booking page visit to confirmed meeting.
- Median time for a guest to complete a booking.
- Weekly active hosts with at least one published scheduling link.

## Implemented Features

<!-- Append-only log of shipped features. Never delete entries. -->
- _Nothing shipped yet._

## Current Priorities

- [MUST] Public booking page where a guest selects a date, chooses a time, enters contact information, and creates a meeting.
- [SHOULD] Booking confirmation state that clearly confirms the reserved slot and submitted contact details.
- [SHOULD] Host-facing flow to publish a shareable scheduling link backed by availability.
- [COULD] Guest reschedule and cancellation flow from a confirmation link.

## Future / Deferred

<!-- Ideas acknowledged but not committed. -->
- Team scheduling, pooled availability, and round-robin assignment.
- Payments and paid appointment types.

## Open Questions

- [ ] What booking confirmation information must be shown immediately after a meeting is created?
- [ ] What host-defined constraints on bookable windows, notice periods, and buffer times are required in the first release?
