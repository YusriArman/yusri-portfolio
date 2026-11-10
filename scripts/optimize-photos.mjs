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
//   photo-originals/projects/<slug>/              -> public/images/projects/<slug>/preview.jpg
//   photo-originals/leadership/<name>/            -> public/images/leadership/<name>.jpg
//   photo-originals/events/<slug>/featured/       -> public/images/events/<slug>/featured.jpg
//   photo-originals/events/<slug>/gallery/        -> public/images/events/<slug>/gallery-01.jpg, -02, ...

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
const warnings = []

const rel = (file) => path.relative(root, file)
const byName = (a, b) => a.localeCompare(b, undefined, { numeric: true })

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
    to: '/' + path.relative(path.join(root, 'public'), output).split(path.sep).join('/'),
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

async function gallery(folder, outputDir, slot) {
  const files = await listImages(folder)
  if (files.length === 0) return
  // Clear earlier gallery copies so removed or reordered originals do not leave strays.
  if (existsSync(outputDir)) {
    for (const name of await readdir(outputDir)) {
      if (/^gallery-\d+\.jpg$/.test(name)) await rm(path.join(outputDir, name))
    }
  }
  let n = 1
  for (const file of files) {
    await optimise(file, path.join(outputDir, `gallery-${String(n).padStart(2, '0')}.jpg`), slot, 'inside')
    n += 1
  }
}

async function main() {
  if (!existsSync(originalsDir)) {
    console.log('No photo-originals/ folder found. Nothing to do.')
    return
  }

  await single(path.join(originalsDir, 'portrait'), path.join(imagesDir, 'profile', 'yusri-arman.jpg'), slots.portrait)

  for (const slug of await listFolders(path.join(originalsDir, 'projects'))) {
    await single(path.join(originalsDir, 'projects', slug), path.join(imagesDir, 'projects', slug, 'preview.jpg'), slots.project)
  }

  for (const name of await listFolders(path.join(originalsDir, 'leadership'))) {
    await single(path.join(originalsDir, 'leadership', name), path.join(imagesDir, 'leadership', `${name}.jpg`), slots.leadership)
  }

  for (const slug of await listFolders(path.join(originalsDir, 'events'))) {
    const eventDir = path.join(originalsDir, 'events', slug)
    await single(path.join(eventDir, 'featured'), path.join(imagesDir, 'events', slug, 'featured.jpg'), slots.eventFeatured)
    await gallery(path.join(eventDir, 'gallery'), path.join(imagesDir, 'events', slug), slots.eventGallery)
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
  console.log('\nOriginals were not changed. Next: reference the "to" paths in src/content/ (see CONTENT-CHECKLIST.md).')
}

main().catch((error) => {
  console.error(`Could not finish: ${error.message}`)
  process.exitCode = 1
})
