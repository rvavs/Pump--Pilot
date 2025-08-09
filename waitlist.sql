-- Create a simple waitlist table and open INSERT to anon (public) for marketing form
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null check (position('@' in email) > 1),
  name text,
  source text,
  created_at timestamptz default now()
);

alter table public.waitlist enable row level security;

-- Allow anyone (anon) to insert a row
create policy if not exists "public_insert_waitlist" on public.waitlist
  for insert
  to anon
  with check (true);

-- Optional: allow reading the table (e.g., for admin dashboards later)
create policy if not exists "public_read_waitlist" on public.waitlist
  for select
  to authenticated, anon
  using (true);
