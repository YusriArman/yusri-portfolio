// Lines from favourite books, shown one at a time when the bookmark in About is pulled.
// Each pull picks a different one at random. Add as many as you like.
//
// Each entry:
//   text       the quote, exactly as you remember it from the book
//   book       the title, e.g. 'Lord of the Mysteries'
//   character  optional: who says it

import type { Quote } from './types'

export const quotes: Quote[] = [
  // Placeholders: replace these with your favourite lines.
  { text: 'Your favourite line from Lord of the Mysteries goes here.', book: 'Lord of the Mysteries', placeholder: true },
  { text: 'Your favourite line from Omniscient Reader goes here.', book: "Omniscient Reader's Viewpoint", placeholder: true },
  { text: 'A line from another book you love goes here.', book: 'Another favourite', placeholder: true },
]
