// Event highlights, in this order. This section is about planning, coordination,
// delivery and outcomes; the software side of Elysium lives in projects.ts.
//
// PHOTOS: put the originals in
//   photo-originals/events/<slug>/featured/   one wide photograph
//   photo-originals/events/<slug>/gallery/    three to six more
// then run `npm run photos`. It prints a ready-made line for each photograph.
//
// Featured photo: replace `featuredPhoto: null` with
//   featuredPhoto: { src: '/images/events/orientation-party-2026/featured.jpg', alt: 'Describe the photo', caption: 'Optional caption' },
// Gallery: paste the printed lines into `gallery` and fill in `alt` and `caption`.
// Photographs appear in the order listed. To rearrange, move a line.
// If a thumbnail crops badly, add `position: 'center top'` (or similar). The enlarged
// view always shows the whole photograph.

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
    featuredPhoto: { src: '/images/events/orientation-party-2026/featured.jpg', alt: 'Group photo of the Orientation Party 2026 crew in a hall, in front of a screen showing the Elysium logo' },
    gallery: [
      { src: '/images/events/orientation-party-2026/gallery/op-3.jpg', alt: 'Light-up letters spelling Elysium on the floor of the venue' },
      { src: '/images/events/orientation-party-2026/gallery/op-2.jpg', alt: 'An orchestra performing on stage behind a row of stage lights' },
      { src: '/images/events/orientation-party-2026/gallery/op-4.jpg', alt: 'A band performing in front of a large screen as the audience watches' },
      { src: '/images/events/orientation-party-2026/gallery/op-1.jpg', alt: 'Freshmen in the crowd watching the stage under bright lights' },
      { src: '/images/events/orientation-party-2026/gallery/op-5.jpg', alt: 'A packed hall of students seen from beside the stage' },
      { src: '/images/events/orientation-party-2026/gallery/flashmob-end.jpg', alt: 'Students gathered in front of a screen reading "The End" at the close of the night' },
    ],
  },
]
