// Lines from favourite books, shown one at a time when the bookmark in About is pulled.
// Each pull picks a different one at random. Add as many as you like.
//
// Each entry:
//   text       the quote, exactly as you remember it from the book
//   book       the title, e.g. 'Lord of the Mysteries'
//   character  optional: who says it

import type { Quote } from './types'

const LOTM = 'Lord of the Mysteries'
const ORV = "Omniscient Reader's Viewpoint"

export const quotes: Quote[] = [
  { text: 'Can you accept such an outcome?', book: LOTM },
  { text: "From the beginning, you've been a guardian. You mimicked others until you were mimicked by others.", book: LOTM },
  { text: '“Great master, are you afraid?” “Yes.”', book: LOTM },
  { text: 'Praise the Fool.', book: LOTM },
  { text: 'We are guardians, but also miserable wretches that are constantly fighting against dangers and madness.', book: LOTM },
  { text: "I won't lose too much, just myself.", book: LOTM },

  { text: 'There are three ways to survive in a ruined world. Now, I have forgotten a few, but one thing is certain. The fact that you who are reading these words will survive for sure.', book: ORV },
  { text: 'Tell me, you fool. If I continue to regress, will I ever get to meet you again?', book: ORV },
  { text: '[This story is for just that one reader.]', book: ORV },
  { text: 'It was a really great story, isn’t that right?', book: ORV },
  { text: '[Incarnation Kim Dokja will be killed by the one he loves most.]', book: ORV },
  { text: 'That man is the world I wish to save.', book: ORV },
  { text: 'Your modifier is the Demon King of Salvation.', book: ORV },
]
