-- Optional: personal notes for the enlarged viewer. Existing rows stay unchanged.
alter table public.portfolio_photos add column if not exists note text;
