import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Image } from '../content/types'

type Library = Record<string, Image[]>
const PhotoContext = createContext<Library | null>(null)
const projectUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, '')
const publicKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

/** One request for the whole page. Local content remains the fallback if setup or loading fails. */
export function PhotoLibrary({ children }: { children: ReactNode }) {
  const [library, setLibrary] = useState<Library | null>(null)

  useEffect(() => {
    if (!projectUrl || !publicKey) return
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 10000)

    async function load() {
      try {
        // Selecting the row also supports optional metadata columns during gradual migrations.
        const query = 'select=*&published=eq.true&order=sort_order.asc,id.asc'
        const response = await fetch(`${projectUrl}/rest/v1/portfolio_photos?${query}`, {
          headers: { apikey: publicKey },
          signal: controller.signal,
          cache: 'no-store',
        })
        if (!response.ok) throw new Error(`Photo library returned ${response.status}`)
        const rows: unknown = await response.json()
        if (!Array.isArray(rows)) throw new Error('Invalid photo library response')
        const next: Library = Object.create(null)
        for (const row of rows) {
          if (typeof row.collection !== 'string' || typeof row.path !== 'string' || typeof row.alt !== 'string') {
            throw new Error('Invalid photo entry')
          }
          const photo: Image = {
            // Dashboard pastes can include invisible trailing spaces or newlines.
            src: `${projectUrl}/storage/v1/object/public/portfolio/${row.path.trim().split('/').map(encodeURIComponent).join('/')}`,
            alt: row.alt,
            caption: row.caption || undefined,
            note: typeof row.note === 'string' ? row.note : undefined,
            position: row.position || undefined,
            fit: row.fit === 'contain' ? 'contain' : 'cover',
          }
          ;(next[row.collection] ??= []).push(photo)
        }
        if (!controller.signal.aborted) setLibrary(next)
      } catch (error) {
        if (!controller.signal.aborted) console.warn('Using local photo content:', error)
      } finally {
        window.clearTimeout(timeout)
      }
    }
    void load()
    return () => {
      controller.abort()
      window.clearTimeout(timeout)
    }
  }, [])

  return <PhotoContext.Provider value={library}>{children}</PhotoContext.Provider>
}

const fileName = (src: string) => decodeURIComponent(src.split('?')[0].split('/').pop() ?? '')

/**
 * Published Supabase photos come first, followed by the local photos from /public that
 * have not been uploaded under the same file name. Single-photo slots use the first one,
 * so a published portrait or featured photo takes over from the local one.
 */
export function usePhotos(collection: string, fallback: Image[]): Image[] {
  const online = useContext(PhotoContext)?.[collection] ?? []
  if (online.length === 0) return fallback
  const uploaded = new Set(online.map((photo) => fileName(photo.src)))
  return [...online, ...fallback.filter((photo) => !uploaded.has(fileName(photo.src)))]
}
