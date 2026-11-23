// Photo galleries that are not tied to a single event.
// (Each event's own photos live with the event in events.ts.)
//
// HOW IT WORKS
// 1. Put original photographs in the matching folder:
//      photo-originals/introduction-gallery/   -> introGallery below
//      photo-originals/leadership-gallery/     -> leadershipGallery below
// 2. Run `npm run photos`. It prints a ready-made line for each photograph.
// 3. Paste those lines into the list below and fill in `alt` and `caption`.
//    For Supabase images, upload the optimised copy to the public portfolio bucket
//    and use its public URL as `src`. Keep captions and ordering here.
//
// ORDER: photographs appear in the order they are listed here. To rearrange, move a line.
// To remove one from the page, delete its line.
//
// Each entry:
//   src       local path or public URL to the optimised copy
//   alt       a plain description for people who cannot see the photo
//   caption   optional text shown under the photo and in the enlarged view
//   position  optional; which part to keep in view when the thumbnail is cropped,
//             e.g. 'center top' to keep faces at the top in frame. The enlarged view
//             always shows the whole photograph.

import type { Image } from './types'

/** Chapter 02, About. You participating, building, speaking or working with others. Aim for 4 to 6. */
export const introGallery: Image[] = [
  { src: '/images/introduction-gallery/img-1798.jpg', alt: 'Yusri in a magenta orientation leader shirt, waving outside a campus building with other students', position: 'center top' },
  { src: '/images/introduction-gallery/sd-induction-day.jpg', alt: 'Yusri in a suit standing beside a speaker holding a microphone in a lecture theatre' },
  { src: '/images/introduction-gallery/canva-download-4.jpg', alt: 'Yusri holding a sign that reads "I\'m here to HELP" in a campus hallway' },
  { src: '/images/introduction-gallery/cc-og-excobod-gang.jpg', alt: 'Yusri and a group of committee members in suits making playful hand gestures in a classroom' },
  { src: '/images/introduction-gallery/sd-induction-2-casual.jpg', alt: 'Yusri with a large group of students in matching magenta shirts cheering in a classroom' },
  { src: '/images/introduction-gallery/ad-night-2024-bros.jpg', alt: 'Yusri and five friends in formal wear posing together at an evening event', position: 'center top' },
]

/**
 * Chapter 04. Photographs across your clubs and organisations. Aim for 4 to 8.
 * Write each caption as: organisation, occasion, then your role or contribution.
 * Example caption: "Taylor's Orientation Leaders, March 2025 intake. I led the welcome briefing as president."
 */
export const leadershipGallery: Image[] = [
  { src: '/images/leadership-gallery/excobod-24-25-group-pic.jpg', alt: 'The 2024/25 executive board in suits, seated on outdoor steps holding signs and cameras' },
  { src: '/images/leadership-gallery/sd-cc.jpg', alt: 'A row of committee members in suits raising light sticks at the TOL 25/26 commissioning ceremony' },
  { src: '/images/leadership-gallery/canva-download.jpg', alt: 'Committee members in suits posing on chairs and standing in a garden courtyard' },
  { src: '/images/leadership-gallery/canva-download-1.jpg', alt: 'An orientation group sitting together on a hall floor with a "Group 4" sign' },
  { src: '/images/leadership-gallery/canva-download-2.jpg', alt: 'Orientation leaders in black jackets holding numbered group signs in a sports hall' },
  { src: '/images/leadership-gallery/set-team-2024.jpg', alt: 'The 2024 team in black shirts holding gift bags in a classroom' },
  { src: '/images/leadership-gallery/sd-induction-3-casual.jpg', alt: 'Three orientation leaders in magenta shirts handing out light sticks' },
  { src: '/images/leadership-gallery/tusc-24-25-group.jpg', alt: 'The 2024/25 student council in suits, posing with arms crossed on outdoor steps' },
  { src: '/images/leadership-gallery/cw-24-25.jpg', alt: 'Ten members of the 2024/25 campus welfare committee in suits, in a studio group portrait' },
  { src: '/images/leadership-gallery/aot-2.jpg', alt: 'The organising team in black shirts on stage in front of a screen reading ImagineHack 2026' },
  { src: '/images/leadership-gallery/aot-3.jpg', alt: 'A large group of ImagineHack 2026 participants and organisers in a hall, under the event screen' },
  { src: '/images/leadership-gallery/aot-4.jpg', alt: 'A speaker in a white shirt addressing the room with a microphone, beside a lectern' },
  { src: '/images/leadership-gallery/aot.jpg', alt: 'A group of friends making peace signs on a campus staircase', position: 'center 60%' },
]
