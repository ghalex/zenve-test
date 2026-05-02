import type { HostEventsPageContext } from '@/types'

export const mockHostEventsPageContext: HostEventsPageContext = {
  host: {
    displayName: 'Skywalker',
  },
  events: [
    {
      id: 'intro-call-30',
      title: '30 min intro call',
      durationMinutes: 30,
      connectedCalendarLabel: 'Google Calendar | Primary',
      publicLink: 'https://zenve.app/skywalker/intro-call-30',
    },
    {
      id: 'team-sync-60',
      title: '1 hour team sync',
      durationMinutes: 60,
      connectedCalendarLabel: 'Google Calendar | Sales',
      publicLink: 'https://zenve.app/skywalker/team-sync-60',
    },
    {
      id: 'deep-dive-120',
      title: '2 hour deep dive',
      durationMinutes: 120,
      connectedCalendarLabel: 'Outlook | Advisory',
      publicLink: 'https://zenve.app/skywalker/deep-dive-120',
    },
  ],
}
