// Event highlights, in this order. This section is about leadership and delivery;
// the software side of Elysium lives in projects.ts.
//
// Photos: put the original files in photo-originals/events/<slug>/featured/ and
// photo-originals/events/<slug>/gallery/, then run `npm run photos`. It writes
// optimised copies to /public/images/events/<slug>/ as featured.jpg and gallery-01.jpg,
// gallery-02.jpg, and so on.
//
// To show the featured photo, replace `featuredPhoto: null` with:
//   featuredPhoto: { src: '/images/events/orientation-party-2026/featured.jpg', alt: 'Describe the photo', caption: 'Optional caption' },
// To show gallery photos, add entries to `gallery` like:
//   { src: '/images/events/orientation-party-2026/gallery-01.jpg', alt: 'Describe the photo', caption: 'Optional caption' },
// If a photo crops badly, add `position: 'center top'` (or similar) to keep the right part in view.

import type { Event } from './types'

export const events: Event[] = [
  {
    slug: 'orientation-party-2026',
    title: 'Orientation Party 2026: Elysium',
    organisation: "Taylor's Orientation Leaders",
    role: 'Project Manager',
    period: '2026',
    summary: "Taylor's University's largest orientation event, attended by 1,200 freshmen.",
    contributions: [
      'Planned and executed the event from start to finish.',
      'Liaised with the PA team, the decoration team and the performers.',
      'Coordinated registration and ticket collection through the Elysium platform.',
    ],
    outcomes: ['1,200 freshmen attended.'],
    link: { label: 'See the Elysium platform', href: '#project-elysium' },
    featuredPhoto: null,
    gallery: [],
  },
]
