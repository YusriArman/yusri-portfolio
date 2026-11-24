# Online photo library

## One-time setup

1. In your Supabase project, open SQL Editor and run `photo-library.sql` once.
2. Keep the existing `portfolio` Storage bucket public. Do not add public upload/delete policies.
3. Local development reads `.env.local`. See `.env.example` for the two required variables.
4. Add those same VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY values to your hosting environment, then deploy once. Only use a publishable or legacy anon key, never a service-role or secret key.

## Adding photos online

Upload one or several images in Storage → portfolio. Then open Table Editor → portfolio_photos and add an entry for each image:

| Field | Value |
| --- | --- |
| collection | Where it appears; use the list below |
| path | File path inside the portfolio bucket, e.g. `leadership-gallery/committee.jpg`; not the full URL |
| alt | A short factual description; required before publishing |
| caption | Optional visible caption |
| sort_order | Lower numbers appear first; use 10, 20, 30 to leave room for inserts |
| position | Crop focus, e.g. `center` or `center top` |
| fit | `cover` for photos, `contain` for logos or screenshots you want shown in full |
| published | Set true when ready; false hides it from the website |

Collections: `portrait`, `introduction-gallery`, `leadership/president`, `leadership-gallery`, `projects/elysium`, `projects/local-notes-companion`, `projects/club-treasury`, `events/orientation-party-2026/featured`, `events/orientation-party-2026/gallery`.

Portrait, project, presidency and featured-event collections permit one published image each. Unpublish the old entry before publishing its replacement. The initial SQL seeds your selected portrait; its file can stay in its existing Storage folder because collection controls placement independently of path.

Refresh the portfolio to see saved changes. Already-open pages do not subscribe to live updates. No rebuild or deployment is needed for photo changes after initial setup. Uploading a file alone does not publish it: the table entry supplies placement and accessible descriptions.

Use a new filename when replacing an image to avoid old CDN/browser cached copies. Unpublishing hides an entry from the photo API but does not make its public Storage file private.

## Local preparation and fallback

`npm run photos` remains an optional local optimisation tool; it does not upload or update this table. You can bulk-upload its generated files or use images optimised elsewhere.

The website makes one read-only request per page load. Missing configuration, network errors or invalid responses leave the existing local content in place. A successful response becomes authoritative: collections without published entries are empty. Development photo-slot placeholders can still appear for empty galleries; they are not published.

Dashboard access manages edits. Visitors have SELECT access to published rows only, with no insert/update/delete grants. Do not disable row-level security.
