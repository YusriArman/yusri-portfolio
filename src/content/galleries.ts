// Photo galleries that are not tied to a single event.
// (Each event's own photos live with the event in events.ts.)
//
// HOW IT WORKS
// 1. Put original photographs in the matching folder:
//      photo-originals/introduction-gallery/   -> introGallery below
//      photo-originals/leadership-gallery/     -> leadershipGallery below
// 2. Run `npm run photos`. It prints a ready-made line for each photograph.
// 3. Paste those lines into the list below and fill in `alt` and `caption`.
//
// ORDER: photographs appear in the order they are listed here. To rearrange, move a line.
// To remove one from the page, delete its line.
//
// Each entry:
//   src       path to the optimised copy (printed by `npm run photos`)
//   alt       a plain description for people who cannot see the photo
//   caption   optional text shown under the photo and in the enlarged view
//   position  optional; which part to keep in view when the thumbnail is cropped,
//             e.g. 'center top' to keep faces at the top in frame. The enlarged view
//             always shows the whole photograph.

import type { Image } from './types'

/** Chapter 02, About. You participating, building, speaking or working with others. Aim for 4 to 6. */
export const introGallery: Image[] = [
  // { src: '/images/introduction-gallery/your-file.jpg', alt: 'Describe the photo', caption: 'Optional caption' },
]

/**
 * Chapter 04. Photographs across your clubs and organisations. Aim for 4 to 8.
 * Write each caption as: organisation, occasion, then your role or contribution.
 * Example caption: "Taylor's Orientation Leaders, March 2025 intake. I led the welcome briefing as president."
 */
export const leadershipGallery: Image[] = [
  // { src: '/images/leadership-gallery/your-file.jpg', alt: 'Describe the photo', caption: 'Organisation, occasion. My role.' },
]
