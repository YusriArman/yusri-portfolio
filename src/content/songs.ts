// The site's soundtrack: one song per chapter. Nothing plays; each chapter shows a
// "now playing" card, and the mini player in the corner follows the chapter you are reading.
//
// To change a chapter's song, edit its line. To add cover art, put the image in
// /public/images/songs/ and add:  cover: { src: '/images/songs/file.jpg', alt: '' }
// (alt stays empty because the title and artist are written right beside it).
// duration is optional; add it as "m:ss" to show the time under the bar.

import type { Song } from './types'

export const songs: Record<'opening' | 'about' | 'projects' | 'leadership' | 'events', Song> = {
  opening: { title: 'Seasons', artist: 'wave to earth' },
  about: { title: 'About You', artist: 'The 1975' },
  projects: { title: 'Multo', artist: 'Cup of Joe' },
  leadership: { title: 'Night Changes', artist: 'One Direction' },
  // Placeholder: pick a song for the events chapter.
  events: { title: 'Your events song', artist: 'Add it in songs.ts', placeholder: true },
}

export type ChapterKey = keyof typeof songs

/** The chapters in page order, with the id of each chapter's section. */
export const soundtrack: { key: ChapterKey; sectionId: string }[] = [
  { key: 'opening', sectionId: 'contact' },
  { key: 'about', sectionId: 'about' },
  { key: 'projects', sectionId: 'projects' },
  { key: 'leadership', sectionId: 'leadership' },
  { key: 'events', sectionId: 'events' },
]
