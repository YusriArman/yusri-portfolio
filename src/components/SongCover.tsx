import type { Song } from '../content/types'
import './SongCover.css'

/** Cover art, or a coloured tile with the song's first letter when there is none. */
export function SongCover({ song, className = '' }: { song: Song; className?: string }) {
  return song.cover ? (
    <img className={`song-cover ${className}`} src={song.cover.src} alt="" loading="lazy" />
  ) : (
    <span className={`song-cover song-cover--tile ${className}`} aria-hidden="true">
      {song.title.charAt(0)}
    </span>
  )
}
