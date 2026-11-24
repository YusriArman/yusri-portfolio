import type { CSSProperties } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { songs, soundtrack } from '../content/songs'
import { useActiveSection } from '../motion/useActiveSection'
import { DURATION } from '../motion/settings'
import { SongCover } from './SongCover'
import './NowPlaying.css'

// Kept outside the component so the hook sees the same list on every render.
const sectionIds = soundtrack.map((chapter) => chapter.sectionId)

/**
 * The site's one song player, inside the nav capsule. It shows the song of the chapter
 * you are reading, and the thin bar fills as you scroll through that chapter.
 * Nothing plays. Hovering swaps the title for the artist.
 */
export function NowPlaying() {
  const { id, progress } = useActiveSection(sectionIds)
  const chapter = soundtrack.find((entry) => entry.sectionId === id) ?? soundtrack[0]
  const song = songs[chapter.key]

  return (
    <div className="now-playing" style={{ '--progress': progress } as CSSProperties}>
      <span className="sr-only">
        Now playing: {song.title} by {song.artist}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={chapter.key}
          className="now-playing__song"
          aria-hidden="true"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: DURATION.quick }}
        >
          <SongCover song={song} className="now-playing__cover" />
          <span className="now-playing__text">
            <span className="now-playing__title">{song.title}</span>
            <span className="now-playing__artist">{song.artist}</span>
          </span>
        </motion.span>
      </AnimatePresence>
      <span className="now-playing__bar" aria-hidden="true" />
    </div>
  )
}
