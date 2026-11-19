-- Run once in the Supabase SQL Editor. Manage rows using Table Editor afterwards.
begin;
create table public.portfolio_photos (
  id uuid primary key default gen_random_uuid(),
  collection text not null check (collection in ('portrait', 'introduction-gallery', 'leadership-gallery', 'leadership/president') or collection ~ '^(projects/[a-z0-9-]+|events/[a-z0-9-]+/(featured|gallery))$'),
  path text not null check (length(trim(path)) > 0 and path !~ '^/' and path !~ '(^|/)\.\.(/|$)'),
  alt text not null default '',
  caption text,
  position text not null default 'center',
  fit text not null default 'cover' check (fit in ('cover', 'contain')),
  sort_order integer not null default 0,
  published boolean not null default false,
  check (not published or length(trim(alt)) > 0),
  unique(collection, path)
);
create unique index portfolio_single_photo on public.portfolio_photos(collection)
  where published and (collection in ('portrait', 'leadership/president') or collection like 'projects/%' or collection like '%/featured');
alter table public.portfolio_photos enable row level security;
revoke all on public.portfolio_photos from anon, authenticated;
grant select on public.portfolio_photos to anon, authenticated;
create policy "Visitors read published photos" on public.portfolio_photos
  for select to anon, authenticated using (published);

insert into public.portfolio_photos(collection, path, alt, published) values (
  'portrait',
  'introduction-gallery/35efa35c-56b6-4fbe-87ea-797eb4c56711.jpg',
  'Yusri Arman in a black suit, seated at a table at an indoor gathering',
  true
);
commit;
