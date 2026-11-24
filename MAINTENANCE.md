# Maintenance guide

This site is a single page built with React, Vite and TypeScript. All the words and links live in a few content files, so most updates never touch layout code. When you ask a coding assistant for a change, point it at the file named below and add "keep the existing design unchanged".

## Where to edit things

| To change | Edit this file |
| --- | --- |
| Hero name, opening description, the invitation line under it, About text, education, skills, email, GitHub and LinkedIn links, résumé link | `src/content/profile.ts` |
| Projects (title, summary, what you did, technical detail, technologies, image, links) | `src/content/projects.ts` |
| Leadership and community roles, grouped by organisation | `src/content/leadership.ts` |
| Introduction and leadership photo galleries (order, descriptions, captions) | `src/content/galleries.ts` |
| Event highlights (role, what you did, outcomes, featured photo, gallery) | `src/content/events.ts` |
| Navigation labels, chapter numbers, headings and the sentence under each heading | `src/content/site.ts` |
| Browser-tab title and search description | `index.html` |

Each content file starts with a comment explaining how to add an entry. Adding a project, role or event means copying an existing entry and changing its fields. No new components are needed. Order on the page follows the order in the file.

## Adding and replacing photographs

You supply original files; a script makes the web-ready copies.

1. Put the original photograph in the matching folder inside `photo-originals/`. No resizing, cropping or renaming is needed. `photo-originals/README.md` lists the folders, and `CONTENT-CHECKLIST.md` lists the suggested subject and shape for each slot.
2. Run the optimiser:

```bash
npm run photos
```

3. Reference the new file in the matching content file. The comment at the top of each content file shows the exact line.

The optimiser writes JPEG copies into `public/images/`, sized for each slot, with camera metadata removed. It never changes or deletes an original. To replace a single photograph, swap the file in its `photo-originals/` folder and run it again; the published filename stays the same, so no content edit is needed.

Originals are kept out of Git and are never published. Keep your own backup of them.

For a new project or event, create a folder with the same slug, for example `photo-originals/projects/<slug>/` or `photo-originals/events/<slug>/featured/` and `.../gallery/`.

The slot sizes are defined once in `photo-slots.config.json`.

## Photo galleries

One gallery component (`src/components/Gallery.tsx`) is used in three places: at the end of About, at the end of Leadership, and within each event. All three use the section width. Change it once and all three follow.

| Gallery | Originals folder | Listed in |
| --- | --- | --- |
| Introduction | `photo-originals/introduction-gallery/` | `introGallery` in `src/content/galleries.ts` |
| Leadership | `photo-originals/leadership-gallery/` | `leadershipGallery` in `src/content/galleries.ts` |
| An event | `photo-originals/events/<slug>/gallery/` | that event's `gallery` in `src/content/events.ts` |

- **Add:** drop the original in the folder, run `npm run photos`, and paste the printed line into the list. Fill in `alt` and, if you want one, `caption`.
- **Rearrange:** move the line. Photographs appear in listed order. Filenames do not affect order.
- **Remove:** delete the line. Deleting the original as well and re-running the optimiser removes its web copy.
- **Fix a crop:** add `position: 'center top'` or similar to the line. Thumbnails are cropped to 4:3; the enlarged view always shows the whole photograph.

A gallery with no photographs listed is left off the published page entirely. Galleries never move on their own.

## Chapters and motion

The page is five chapters: the opening (name and contact details, anchor `#contact`), About (`#about`), Projects, Leadership and Events. A small footer repeats the email and links back to the top. Each chapter's number, story label, heading and connecting sentence are in `src/content/site.ts`. Chapter background colours are set in `src/styles/base.css` under "Chapters", using the colours in `src/styles/tokens.css`.

Animation uses the Motion library (`motion` package) and lives in `src/motion/`:

- `settings.ts` holds the shared easing and durations. Change them here.
- `Reveal.tsx` is the curtain reveal on project images, the portrait and the presidency photograph.
- `ScrollExpand.tsx` is the event photograph that widens as it scrolls into view.
- `RollingLink.tsx` is the rolling text on navigation and contact links.

`ChapterBackdrop.tsx` is the coloured panel behind Projects, Leadership and Events that widens as the chapter scrolls into view.

The name entrance is in `src/components/Hero.tsx`, the heading entrance in `src/components/ChapterHeading.tsx`, and the enlarge-from-thumbnail viewer in `src/components/Lightbox.tsx`. Entrances play once. Visitors whose device asks for reduced motion get simple fades or no animation.

## Photo planning mode

The local preview (`npm run dev`) shows a labelled placeholder wherever a photograph has not been supplied, at the size it will appear, and a small label on photographs already in place. The button in the bottom-right corner turns this off and on. None of it is included in the published site: the code lives in `src/dev/` and is switched off in the production build.

## The résumé

The résumé goes in `public/resume/`. Save a public-safe PDF (no phone number, no referee contact details) as `yusri-arman-resume.pdf`, then set `resume: '/resume/yusri-arman-resume.pdf'` in `src/content/profile.ts`. Setting it back to `null` hides the link.

## Colours, fonts and spacing

Everything visual that might need tuning is in `src/styles/tokens.css`: colours, the typeface, corner radii, spacing steps and the type scale. Change a value there and the whole site follows. Per-section styles sit next to each component in `src/components/`, and shared building blocks (buttons, pills, media frames) are in `src/styles/base.css`.

The typeface is Archivo, loaded from the `@fontsource-variable/archivo` package. To change it, install a different Fontsource package, update the import in `src/main.tsx`, and change `--font-sans` in the tokens file.

## Running a local preview

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:5173. The page updates as you save files. To check the production build:

```bash
npm run build
```

## Publishing updates

The site is set up for Vercel. The first time, push the repository to GitHub and import it at https://vercel.com/new; Vercel detects Vite and needs no settings. After that, every push to the `main` branch publishes automatically.

Save your work in Git before publishing:

```bash
git add -A
```

```bash
git commit -m "Describe the change"
```

```bash
git push
```

## Restoring a previous working version

List recent saves:

```bash
git log --oneline
```

To undo the latest change while keeping history, run `git revert HEAD` and push. To bring back one file as it was at an earlier save, run `git checkout <commit-id> -- path/to/file`, then commit and push. Your coding assistant can do either when you give it the commit id from the list.

## What is still missing

See `CONTENT-CHECKLIST.md` for the photos and facts not yet supplied, and the exact filenames to use.

## Supabase photo management

The online photo library setup and publishing workflow are documented in [supabase/README.md](supabase/README.md). Once configured, published rows in `portfolio_photos` control portraits, project images and galleries on each page load. Local photo entries are the fallback when configuration or loading fails. `npm run photos` only prepares local files; it does not upload them.

## Gentle shared galleries

`Gallery.tsx` uses `GentleGallery.tsx` for all populated About, Leadership and Event galleries. The selected frame is 58% of the gallery width. All three use the section width. Empty galleries retain development planning slots and are omitted in production. `treatment="flat"` is available for future screenshot galleries; standalone project images and portraits keep their existing presentation.

The track uses native horizontal scrolling and snapping for touch, mouse dragging, and ArrowLeft/ArrowRight/Home/End navigation. At the ends, controls stop rather than duplicate photos. One photo has no previous/next controls. Selecting a neighbour centres it; selecting the settled centre opens the shared Lightbox. No captions or event photographs have been invented to populate the prototype.

Optional personal notes are available through `Image.note`. Run `supabase/photo-notes.sql` to add the optional `note` column in the dashboard; existing installations continue working without it. Notes display only in the enlarged viewer.

Before extending this prototype, review real event photos at desktop and phone sizes; check centre/side selection, rapid clicks, touch scrolling vertically and horizontally, keyboard focus and Escape, closing after switching images, and reduced motion. The initial implementation passes the production build, but real-photo browser verification is pending the event collection being supplied.

## Soundtrack, bookmark quotes and boot screen

These make the site feel personal rather than add information. None of them play sound.

- **Songs:** `src/content/songs.ts` holds one song per chapter. The site's only player is in the nav capsule (`NowPlaying.tsx`): it shows the song of the chapter you are reading, and its thin bar fills as you scroll through that chapter. Hovering swaps the title for the artist. Without a `cover`, a song shows a cyan tile with its first letter (`SongCover.tsx`). The events song is still a placeholder.
- **Bookmark quotes:** `src/content/quotes.ts`. The ribbon at the top of About (`Bookmark.tsx`) shows a random quote on each pull, never the same one twice in a row. The three entries there are placeholders to replace with your own lines.
- **Boot screen:** `BootSplash.tsx`. It plays once per browser session, not for links to a section such as `/#projects`, and never with reduced motion. A click, key or scroll skips it, and it removes itself after about 3.5 seconds whatever happens. Its typed lines are `site.boot` in `src/content/site.ts`. To see it again in development, clear the site's session storage or open a private window. The opening waits for it through `src/motion/IntroContext.tsx`.

## Journey, scenes and scrolling

- **Pinned intro:** `IntroScroll.tsx` comes right after the opening. Its panel stays in place (plain CSS `position: sticky`) while the words of `site.journey.intro` fill in one by one. Rewrite those lines in `site.ts`; each string is one line. With reduced motion the sentences are simply shown.
- **Journey stops:** each chapter's small `label` in `site.ts` reads as a stop ("Where it starts", "Who I am", "What I've built", "Who I've led with", "Nights to remember"). These are placeholders to rewrite. The nav link names are separate (`site.nav`).
- **Scenes:** About and Projects are split into scenes (`Scene.tsx`), each holding one idea and sized to fit on one screen, with an even gap between them. About: portrait with intro, education and skills, then photos. Projects: the heading with the first project side by side, then the other projects together. A chapter made of scenes carries the class `chapter--scenes`. Section links land on its very top because the first scene already leaves room for the nav. Leadership, Events and the opening are ordinary chapters.
- **Smooth scrolling:** `src/motion/SmoothScroll.tsx` runs Lenis. Wheel and trackpad scrolling follows your hand (`lerp`). Clicked section links glide over 1.1 s. It is off with reduced motion, and it pauses while the photo viewer is open. Lenis already honours `scroll-padding-top`, so don't add a header offset to `scrollTo`.
- **Snap trial:** `src/motion/SceneSnap.tsx`. Only after scrolling has stopped, and only when you stopped within 22% of a screen of a scene or chapter start, the page settles onto it. It is off on screens 860 px wide or less, with reduced motion, and while the pinned intro (`data-no-snap`) is on screen. To turn it off completely, set `SNAP_SCENES` to `false` in `src/motion/settings.ts`. It doesn't use `lenis/snap`, because that predicts one wheel tick ahead and overshot with mouse wheels.
