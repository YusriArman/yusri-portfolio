#!/usr/bin/env node
// Creates optimised copies of the photographs in photo-originals/.
//
//   npm run photos
//
// Originals are only read, never changed or deleted. Optimised JPEGs are written to
// public/images/, resized for the slot they belong to, with camera metadata
// (including any GPS location) removed.
//
// Folder layout it understands:
//   photo-originals/portrait/                     -> public/images/profile/yusri-arman.jpg
//   photo-originals/introduction-gallery/         -> public/images/introduction-gallery/<name>.jpg
//   photo-originals/projects/<slug>/              -> public/images/projects/<slug>/preview.jpg
//   photo-originals/leadership/<name>/            -> public/images/leadership/<name>.jpg
//   photo-originals/leadership-gallery/           -> public/images/leadership-gallery/<name>.jpg
//   photo-originals/events/<slug>/featured/       -> public/images/events/<slug>/featured.jpg
//   photo-originals/events/<slug>/gallery/        -> public/images/events/<slug>/gallery/<name>.jpg
//
// Gallery copies keep the original's name (tidied up), so adding, removing or
// reordering photographs never changes the address of the others. The order on
// the page is set in the content files, not by filenames.

import { mkdir, mkdtemp, readdir, rm, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import slots from '../photo-slots.config.json' with { type: 'json' }

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const originalsDir = path.join(root, 'photo-originals')
const imagesDir = path.join(root, 'public', 'images')
const IMAGE_TYPES = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff', '.heic', '.heif'])
const JPEG_QUALITY = 82

let tempDir = null
const results = []
const galleries = []
const warnings = []

const rel = (file) => path.relative(root, file)
const byName = (a, b) => a.localeCompare(b, undefined, { numeric: true })
const webPath = (file) => '/' + path.relative(path.join(root, 'public'), file).split(path.sep).join('/')
const tidyName = (file) =>
  path
    .basename(file, path.extname(file))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'photo'

async function listImages(dir) {
  if (!existsSync(dir)) return []
  const entries = await readdir(dir, { withFileTypes: true })
  return entries
    .filter((e) => e.isFile() && !e.name.startsWith('.') && IMAGE_TYPES.has(path.extname(e.name).toLowerCase()))
    .map((e) => e.name)
    .sort(byName)
    .map((name) => path.join(dir, name))
}

async function listFolders(dir) {
  if (!existsSync(dir)) return []
  const entries = await readdir(dir, { withFileTypes: true })
  return entries.filter((e) => e.isDirectory()).map((e) => e.name).sort(byName)
}

// iPhone HEIC photos are converted with the Mac's built-in `sips` first.
async function readablePath(file) {
  const ext = path.extname(file).toLowerCase()
  if (ext !== '.heic' && ext !== '.heif') return file
  if (process.platform !== 'darwin') {
    throw new Error(`${rel(file)} is a HEIC photo, which can only be converted on a Mac. Export it as JPEG first.`)
  }
  tempDir ??= await mkdtemp(path.join(tmpdir(), 'portfolio-photos-'))
  const converted = path.join(tempDir, `${path.basename(file)}.jpg`)
  execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '95', file, '--out', converted], { stdio: 'ignore' })
  return converted
}

async function optimise(source, output, slot, fit) {
  const input = await readablePath(source)
  const meta = await sharp(input).metadata()
  const turned = (meta.orientation ?? 1) >= 5
  const sourceWidth = turned ? meta.height : meta.width
  const sourceHeight = turned ? meta.width : meta.height

  await mkdir(path.dirname(output), { recursive: true })
  const info = await sharp(input)
    .rotate() // apply the camera's rotation, then drop the metadata
    .resize({ width: slot.width, height: slot.height, fit, withoutEnlargement: true })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toFile(output)

  const tooSmall = fit === 'outside' ? sourceWidth < slot.width || sourceHeight < slot.height : Math.max(sourceWidth, sourceHeight) < 1200
  if (tooSmall) {
    warnings.push(`${rel(source)} is ${sourceWidth} × ${sourceHeight} px, smaller than recommended for "${slot.label}" (${slot.min}). It may look soft.`)
  }
  results.push({
    slot: slot.label,
    from: rel(source),
    to: webPath(output),
    size: `${info.width} × ${info.height} px, ${Math.round(info.size / 1024)} KB`,
  })
}

async function single(folder, output, slot) {
  const files = await listImages(folder)
  if (files.length === 0) return
  if (files.length > 1) {
    warnings.push(`${rel(folder)}/ holds ${files.length} images but this slot shows one. Used ${path.basename(files[0])}.`)
  }
  await optimise(files[0], output, slot, 'outside')
}

async function gallery(folder, outputDir, slot, listName) {
  const files = await listImages(folder)
  if (files.length === 0) return
  const written = new Set()
  for (const file of files) {
    let name = tidyName(file)
    for (let n = 2; written.has(`${name}.jpg`); n += 1) name = `${tidyName(file)}-${n}`
    written.add(`${name}.jpg`)
    await optimise(file, path.join(outputDir, `${name}.jpg`), { ...slot, label: slot.label }, 'inside')
  }
  // Remove copies whose original is no longer in the folder.
  for (const name of await readdir(outputDir)) {
    if (name.endsWith('.jpg') && !written.has(name)) await rm(path.join(outputDir, name))
  }
  galleries.push({ listName, lines: [...written].map((name) => webPath(path.join(outputDir, name))) })
}

async function main() {
  if (!existsSync(originalsDir)) {
    console.log('No photo-originals/ folder found. Nothing to do.')
    return
  }

  await single(path.join(originalsDir, 'portrait'), path.join(imagesDir, 'profile', 'yusri-arman.jpg'), slots.portrait)

  await gallery(
    path.join(originalsDir, 'introduction-gallery'),
    path.join(imagesDir, 'introduction-gallery'),
    slots.introGallery,
    '`introGallery` in src/content/galleries.ts',
  )
  await gallery(
    path.join(originalsDir, 'leadership-gallery'),
    path.join(imagesDir, 'leadership-gallery'),
    slots.leadershipGallery,
    '`leadershipGallery` in src/content/galleries.ts',
  )

  for (const slug of await listFolders(path.join(originalsDir, 'projects'))) {
    await single(path.join(originalsDir, 'projects', slug), path.join(imagesDir, 'projects', slug, 'preview.jpg'), slots.project)
  }

  for (const name of await listFolders(path.join(originalsDir, 'leadership'))) {
    await single(path.join(originalsDir, 'leadership', name), path.join(imagesDir, 'leadership', `${name}.jpg`), slots.leadership)
  }

  for (const slug of await listFolders(path.join(originalsDir, 'events'))) {
    const eventDir = path.join(originalsDir, 'events', slug)
    await single(path.join(eventDir, 'featured'), path.join(imagesDir, 'events', slug, 'featured.jpg'), slots.eventFeatured)
    await gallery(
      path.join(eventDir, 'gallery'),
      path.join(imagesDir, 'events', slug, 'gallery'),
      slots.eventGallery,
      `\`gallery\` of the "${slug}" event in src/content/events.ts`,
    )
  }

  if (tempDir) await rm(tempDir, { recursive: true, force: true })

  if (results.length === 0) {
    console.log('No photographs found in photo-originals/. Add files to its folders and run this again.')
    return
  }

  console.log(`Optimised ${results.length} photograph${results.length === 1 ? '' : 's'}:\n`)
  for (const r of results) {
    console.log(`  ${r.slot}`)
    console.log(`    from  ${r.from}`)
    console.log(`    to    ${r.to}  (${r.size})`)
  }
  if (warnings.length > 0) {
    console.log('\nWorth checking:')
    for (const w of warnings) console.log(`  - ${w}`)
  }
  if (galleries.length > 0) {
    console.log('\nGallery lines. Copy the ones that are new into the list named, then fill in alt and caption:')
    for (const g of galleries) {
      console.log(`\n  ${g.listName}`)
      for (const src of g.lines) console.log(`    { src: '${src}', alt: '', caption: '' },`)
    }
  }
  console.log('\nOriginals were not changed. See CONTENT-CHECKLIST.md for where each photograph is used.')
}

main().catch((error) => {
  console.error(`Could not finish: ${error.message}`)
  process.exitCode = 1
})
