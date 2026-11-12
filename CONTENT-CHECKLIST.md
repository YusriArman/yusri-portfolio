# Content checklist

Last updated 11 November 2026. Nothing on this list blocks publishing: the published page leaves out anything that has not been supplied.

## Photographs

Run `npm run dev` and open http://localhost:5173 to see every slot below as a labelled placeholder at its real size. The labels match the first column. The placeholders appear in the local preview only and are never published. The button in the bottom-right corner hides them.

**How to supply a photograph.** Drop the original file into the folder shown. Do not resize, crop or rename it. JPEG, PNG, HEIC (iPhone), WebP and TIFF all work. The folders are inside `photo-originals/`.

### Single photographs

| Slot label | Chapter | Suggested subject | Preferred shape | Put the original in |
| --- | --- | --- | --- | --- |
| **Portrait** | 02 About | You from the chest up, facing the camera, on a plain or softly blurred background. Leave some space above your head. The CV photo is in place now. | 4:5 portrait, at least 1200 × 1500 px | `portrait/` |
| **Project screenshot: Elysium ticketing platform** | 03 Projects | The registration home screen or the collection-slot picker on a desktop screen, without the browser's address bar. The event logo is in place now. | 4:3 landscape, at least 1600 × 1200 px | `projects/elysium/` |
| **Project screenshot: MoneyTalks** | 03 Projects | The main dashboard or the voice-logging screen. | 4:3 landscape, at least 1600 × 1200 px | `projects/moneytalks/` |
| **Presidency photograph** | 04 Leadership | You leading or addressing the Orientation Leaders, or a committee group photograph with you clearly visible. | 4:3 landscape, at least 1600 × 1200 px | `leadership/president/` |
| **Featured event photograph** | 05 Events | A wide view of Orientation Party 2026 that shows scale: the crowd and stage together. Keep the main subject near the middle, because the edges may be trimmed. | 16:9 landscape, at least 2400 × 1350 px | `events/orientation-party-2026/featured/` |

### Galleries

All three use the same gallery: a strip you browse sideways, where selecting a photograph enlarges it. Thumbnails are cropped to 4:3; the enlarged view always shows the whole photograph. Any shape works. Aim for a long edge of 2000 px or more.

| Slot label | Chapter | Suggested subjects | How many | Put the originals in |
| --- | --- | --- | --- | --- |
| **Introduction photograph 1, 2, ...** | 02 About, the compact strip that closes the chapter | You taking part, building, speaking, or working with others. A personal introduction, so you should be easy to spot in each. | 4 to 6 | `introduction-gallery/` |
| **Leadership photograph 1, 2, ...** | 04 Leadership, after all the roles | Moments across your clubs and organisations: Orientation Leaders, Agents of Tech, Student Council, Student Life Centre. Caption each as organisation, occasion, then your role. | 4 to 8 | `leadership-gallery/` |
| **Event gallery photograph 1, 2, ...** | 05 Events, under Orientation Party 2026 | The stage or performers, the crowd, your committee at work, ticket collection, decoration. | 3 to 6 | `events/orientation-party-2026/gallery/` |

Choose a small set for each and avoid using the same photograph in two galleries.

**What happens next.** Tell your coding assistant "I've added photos, please connect them", or do it yourself:

1. Run `npm run photos`. It writes optimised copies into `public/images/`, removes camera metadata such as GPS location, and lists what it created. The originals are never changed.
2. For single photographs, reference the new file in the matching content file. The comment at the top of `src/content/projects.ts`, `leadership.ts` and `events.ts` shows the exact line.
3. For galleries, the command prints one ready-made line per photograph. Paste them into `src/content/galleries.ts` (introduction and leadership) or the event's `gallery` list in `src/content/events.ts`, then fill in `alt` (a plain description) and `caption`.
4. **Order:** photographs appear in the order the lines are listed. Move a line to rearrange.
5. **Cropping:** if a thumbnail cuts off a face, add `position: 'center top'` (or `'left center'`, `'30% 20%'`, and so on) to that line.

Only use photographs you have the right to publish, and check that people who are clearly identifiable are comfortable appearing on your site.

## Facts to confirm or supply

- **MoneyTalks:** which parts you personally built, the technologies used, a repository or demo link, and optionally the problem it set out to solve and what came of it. The card currently uses the team-level description from your CV and shows no problem, outcome, technologies or links.
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
