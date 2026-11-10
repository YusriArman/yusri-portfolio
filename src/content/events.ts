// Events and leadership roles shown in the Events section, in this order.
// To add one: copy an entry, change every field, and put its photos in
// /public/images/events/<slug>/.

import type { Event } from './types'

export const events: Event[] = [
  {
    slug: 'orientation-party-2026',
    title: 'Orientation Party 2026: Elysium',
    organisation: "Taylor's Orientation Leaders",
    role: 'Project Manager',
    period: '2026',
    summary:
      "Taylor's University's largest orientation event, attended by 1,200 freshmen.",
    contributions: [
      'Planned and executed the event from start to finish.',
      'Liaised with the PA team, decoration team and performers.',
      'Built the front end of the Elysium ticketing platform the registration ran on.',
    ],
    outcomes: [
      '1,200 freshmen attended.',
      '1,500 ticket collection slots and a 500-person waitlist handled through Elysium.',
    ],
    featuredPhoto: null,
    gallery: [],
    missing: [
      'One featured photograph of the event (landscape, at least 2000px wide)',
      'Three to six gallery photos',
      'Event date and venue',
    ],
  },
]
