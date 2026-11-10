# Content checklist

Last updated 10 November 2026. Nothing on this list blocks publishing: the published page leaves out anything that has not been supplied.

## Photographs

Run `npm run dev` and open http://localhost:5173 to see every slot below as a labelled placeholder at its real size. The labels match the first column. The placeholders appear in the local preview only and are never published. The button in the bottom-right corner hides them.

**How to supply a photograph.** Drop the original file into the folder shown. Do not resize, crop or rename it. JPEG, PNG, HEIC (iPhone), WebP and TIFF all work. The folders are inside `photo-originals/`.

| Slot label | Suggested subject | Preferred shape | Put the original in |
| --- | --- | --- | --- |
| **Portrait** | You from the chest up, facing the camera, on a plain or softly blurred background. Leave some space above your head. The CV photo is in place now. | 4:5 portrait, at least 1200 × 1500 px | `portrait/` |
| **Project screenshot: Elysium ticketing platform** | The registration home screen or the collection-slot picker on a desktop screen, without the browser's address bar. The event logo is in place now. | 4:3 landscape, at least 1600 × 1200 px | `projects/elysium/` |
| **Project screenshot: MoneyTalks** | The main dashboard or the voice-logging screen. | 4:3 landscape, at least 1600 × 1200 px | `projects/moneytalks/` |
| **Presidency photograph** | You leading or addressing the Orientation Leaders, or a committee group photograph with you clearly visible. | 4:3 landscape, at least 1600 × 1200 px | `leadership/president/` |
| **Featured event photograph** | A wide view of Orientation Party 2026 that shows scale: the crowd and stage together. Keep the main subject near the middle, because the edges may be trimmed. | 16:9 landscape, at least 2400 × 1350 px | `events/orientation-party-2026/featured/` |
| **Gallery photograph 1 to 6** | A mix: the stage or performers, the crowd, your committee at work, ticket collection, decoration. Three to six photographs. They appear in filename order. | Any shape. Shown 4:3 in the strip and uncropped when enlarged. Long edge 2000 px or more | `events/orientation-party-2026/gallery/` |

**What happens next.** Tell your coding assistant "I've added photos, please connect them", or do it yourself:

1. Run `npm run photos`. It writes optimised copies into `public/images/`, removes camera metadata such as GPS location, and lists what it created. The originals are never changed.
2. Reference each new file in the matching content file. The comment at the top of `src/content/projects.ts`, `leadership.ts` and `events.ts` shows the exact line to add, including a short description of the photo for screen readers.
3. If a photograph is trimmed badly, add `position: 'center top'` (or `'left center'`, and so on) to that entry to keep the right part in view.

Only use photographs you have the right to publish, and check that people who are clearly identifiable are comfortable appearing on your site.

## Facts to confirm or supply

- **MoneyTalks:** which parts you personally built, the technologies used, and a repository or demo link. The card currently uses the team-level description from your CV and shows no technologies or links.
- **Elysium waitlist size:** your CV says 500, the repository README says 200 in one place and 500 in another. The number is left off the page until you confirm it.
- **Elysium team size:** your CV says a team of four, the README credits three people. The page says "a student team".
- **Elysium live site:** https://op-26-olive.vercel.app returns 404. The link is left off. If you redeploy it, add it back under `links` in `src/content/projects.ts`.
- **GitHub attribution:** the op-26 contributor graph shows the accounts kihurn and Xterna1y, not YusriArman. If one of those is you, consider saying so in the repository README, since recruiters check.
- **Orientation Party 2026 date and venue** (optional). Add to `summary` in `src/content/events.ts` if you want them shown.
- **Availability:** e.g. "Available from June 2027." Set `availability` in `src/content/profile.ts`.
- **Résumé:** a public-safe PDF without your phone number and your referee's contact details. Save it as `public/resume/yusri-arman-resume.pdf` and set `resume: '/resume/yusri-arman-resume.pdf'` in `src/content/profile.ts`.

## Before publishing

- Decide the address: the free `something.vercel.app` address or a custom domain.
- Check the browser-tab title and description in `index.html`.
