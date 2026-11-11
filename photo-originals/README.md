# Photo originals

Put your original, full-size photographs here. You do not need to resize, crop or rename them. JPEG, PNG, HEIC (iPhone), WebP and TIFF all work.

| Folder | Where it appears | How many |
| --- | --- | --- |
| `portrait/` | 01 Introduction, beside your name | 1 |
| `introduction-gallery/` | 01 Introduction, the compact photo strip under the portrait | 4 to 6 |
| `projects/elysium/` | 02 Projects, the Elysium screenshot | 1 |
| `projects/moneytalks/` | 02 Projects, the MoneyTalks screenshot | 1 |
| `leadership/president/` | 03 Leadership, the presidency card | 1 |
| `leadership-gallery/` | 03 Leadership, the shared photo strip after the roles | 4 to 8 |
| `events/orientation-party-2026/featured/` | 04 Events, the large photograph | 1 |
| `events/orientation-party-2026/gallery/` | 04 Events, the photo strip for that event | 3 to 6 |

Then run:

```bash
npm run photos
```

This writes optimised copies into `public/images/` and leaves the originals untouched. For the three galleries it also prints a line per photograph to paste into the content file, where you set the order, description and caption.

See `CONTENT-CHECKLIST.md` for suggested subjects and shapes.

The files in this folder stay on your computer. They are not saved to Git and are never published, so keep your own backup of them.
