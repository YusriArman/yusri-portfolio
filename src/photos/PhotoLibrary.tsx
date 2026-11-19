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
        const query = 'select=collection,path,alt,caption,position,fit&published=eq.true&order=sort_order.asc,id.asc'
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

/** An empty published collection intentionally hides its photos; errors use local content. */
export function usePhotos(collection: string, fallback: Image[]): Image[] {
  const library = useContext(PhotoContext)
  return library === null ? fallback : (library[collection] ?? [])
}
