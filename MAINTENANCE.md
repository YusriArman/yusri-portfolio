# Maintenance guide

This site is a single page built with React, Vite and TypeScript. All the words and links live in a few content files, so most updates never touch layout code. When you ask a coding assistant for a change, point it at the file named below and add "keep the existing design unchanged".

## Where to edit things

| To change | Edit this file |
| --- | --- |
| Hero name, intro paragraph, "open to internships" line, About text, education, skills, email, GitHub and LinkedIn links, résumé link | `src/content/profile.ts` |
| Projects (title, summary, what you did, technical detail, technologies, image, links) | `src/content/projects.ts` |
| Leadership and community roles, grouped by organisation | `src/content/leadership.ts` |
| Event highlights (role, what you did, outcomes, featured photo, gallery) | `src/content/events.ts` |
| Navigation labels and section headings | `src/content/site.ts` |
| Browser-tab title and search description | `index.html` |

Each content file starts with a comment explaining how to add an entry. Adding a project, role or event means copying an existing entry and changing its fields. No new components are needed. Order on the page follows the order in the file.

## Replacing images and the résumé

Images live under `public/images/`:

- `profile/yusri-arman.jpg` for the portrait (4:5, at least 1200 x 1500 px).
- `projects/<slug>/preview.jpg` for each project (4:3, at least 1600 x 1200 px).
- `events/<slug>/featured.jpg` (16:9, at least 2400 x 1350 px) and `events/<slug>/gallery-01.jpg`, `gallery-02.jpg`, ... (4:3, at least 1600 x 1200 px).

To replace an image, overwrite the file and keep the filename. To add a new one, save it in the right folder, then reference its path (starting with `/images/`) in the matching content file. Export JPEGs at about quality 80 and keep each under 500 KB.

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
