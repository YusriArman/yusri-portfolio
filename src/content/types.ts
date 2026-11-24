// Shapes for the content files. You rarely need to edit this file;
// edit profile.ts, projects.ts, leadership.ts, events.ts, galleries.ts and site.ts instead.

export type Link = {
  label: string
  href: string
}

export type Image = {
  /** Path under /public (e.g. "/images/projects/elysium/preview.jpg") or a public HTTPS image URL. */
  src: string
  /** Describe the image for screen readers. */
  alt: string
  caption?: string
  /** Optional personal context shown only in the enlarged viewer. */
  note?: string
  /** "cover" fills the frame (default). "contain" shows the whole image, e.g. a logo. */
  fit?: 'cover' | 'contain'
  /** Background colour behind a "contain" image. */
  background?: string
  /** Which part of a cropped photo to keep in view, e.g. "center top" or "30% 50%". Default is the centre. */
  position?: string
}

export type Project = {
  /** Lowercase, hyphens only. Also the image folder name under /public/images/projects/. */
  slug: string
  title: string
  /** One line: where and when it was built, with whom. */
  context: string
  /** What it is. One sentence. */
  summary: string
  /** The problem it had to solve. One or two sentences. Leave out if you have nothing verified to say. */
  problem?: string
  /** What you personally did. One or two short items. */
  contribution: string[]
  /** What happened as a result. One sentence, real facts only. Leave out if unknown. */
  outcome?: string
  /** Secondary technical detail, shown inside an expandable "More technical detail" block. */
  details?: string[]
  tech: string[]
  /** Preview image, or null to show a typographic tile instead. */
  image: Image | null
  links: Link[]
}

export type Role = {
  title: string
  /** e.g. "2024 to 2025" */
  period: string
  /** One or two substantive contributions. */
  contributions: string[]
  /** Set on exactly one role to show it first, large. */
  featured?: boolean
  /** Optional photograph. Only shown on the featured role. */
  photo?: Image
  /** Optional pointer to more detail elsewhere on the page, e.g. { label: 'See the event', href: '#events' }. */
  link?: Link
}

export type Organisation = {
  name: string
  roles: Role[]
}

export type Event = {
  /** Lowercase, hyphens only. Also the photo folder name under /public/images/events/. */
  slug: string
  title: string
  organisation: string
  role: string
  period: string
  /** One sentence on what the event was. */
  summary: string
  /** What you personally did. */
  contributions: string[]
  /** What happened as a result. Real facts only. */
  outcomes: string[]
  /** Optional pointer, e.g. to the project the event ran on. */
  link?: Link
  /** Large landscape photo, or null to leave it out. */
  featuredPhoto: Image | null
  /** Zero or more photos, shown in this order. The strip is hidden when empty. */
  gallery: Image[]
}

/** A song on the site's soundtrack. Nothing plays; the card only shows it. */
export type Song = {
  title: string
  artist: string
  /** Optional cover art. Without one, the card shows a coloured tile with the song's first letter. */
  cover?: Image
  /** Track length as "m:ss", e.g. "3:46". Leave out if unsure; the times are hidden until it is set. */
  duration?: string
  /** Set while a song is still a stand-in, so it is easy to find and replace. */
  placeholder?: boolean
}

/** A line from a favourite book, shown when the bookmark is pulled. */
export type Quote = {
  text: string
  book: string
  /** Who says it, if anyone. */
  character?: string
  placeholder?: boolean
}
