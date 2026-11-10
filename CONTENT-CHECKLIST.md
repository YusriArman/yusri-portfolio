# Content checklist

Last updated 10 November 2026. Nothing on this list blocks publishing: the page simply leaves out anything that has not been supplied yet.

## Photos to add

Drop the files into these exact paths, then ask your coding assistant to "switch on the photos listed in CONTENT-CHECKLIST.md" (or follow the comments at the top of the content file named in each row). Export as JPEG, quality 80, and keep each file under about 500 KB.

| What | File path | Shape and minimum size | Then edit |
| --- | --- | --- | --- |
| Orientation Party 2026 featured photo | `public/images/events/orientation-party-2026/featured.jpg` | Landscape 16:9, 2400 x 1350 px | `src/content/events.ts`, set `featuredPhoto` |
| Orientation Party 2026 gallery (3 to 6 photos) | `public/images/events/orientation-party-2026/gallery-01.jpg`, `gallery-02.jpg`, ... | 4:3, 1600 x 1200 px | `src/content/events.ts`, add entries to `gallery` |
| Elysium screenshot (replaces the logo tile) | `public/images/projects/elysium/preview.jpg` | 4:3, 1600 x 1200 px | `src/content/projects.ts`, set `image.src` and remove `fit`/`background` |
| MoneyTalks screenshot (replaces the text tile) | `public/images/projects/moneytalks/preview.jpg` | 4:3, 1600 x 1200 px | `src/content/projects.ts`, replace `image: null` |
| Portrait (optional, a replacement for the CV photo) | `public/images/profile/yusri-arman.jpg` | Portrait 4:5, 1200 x 1500 px | Nothing, same filename |

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
