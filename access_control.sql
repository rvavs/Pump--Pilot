-- Access control: invite codes + claim function
-- Tables
create table if not exists public.access_codes (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,         -- store raw or pre-hashed; keep private in admin
  label text,
  max_uses int default 1,
  uses int default 0,
  expires_at timestamptz,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.user_access (
  user_id uuid primary key references auth.users(id) on delete cascade,
  code_id uuid references public.access_codes(id),
  activated_at timestamptz default now()
);

alter table public.access_codes enable row level security;
alter table public.user_access enable row level security;

-- Only admins (service role) can read/write access_codes
create policy if not exists "service_read_codes" on public.access_codes
  for select using (false);
create policy if not exists "service_write_codes" on public.access_codes
  for all using (false) with check (false);

-- Allow authenticated users to see only their user_access row
create policy if not exists "read_own_access" on public.user_access
  for select to authenticated using (user_id = auth.uid());
create policy if not exists "write_own_access" on public.user_access
  for insert to authenticated with check (user_id = auth.uid());

-- Helper: does the current user have access?
create or replace view public.v_has_access as
  select u.id as user_id, exists (
    select 1 from public.user_access ua where ua.user_id = u.id
  ) as has_access
  from auth.users u;

-- Function to claim a code
create or replace function public.claim_access(p_code text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_code access_codes;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  -- Already has access?
  if exists (select 1 from user_access where user_id = auth.uid()) then
    return true;
  end if;

  select * into v_code
  from access_codes
  where code = p_code
    and is_active = true
    and (expires_at is null or expires_at > now())
    and (max_uses is null or uses < max_uses)
  limit 1;

  if v_code.id is null then
    raise exception 'Invalid or expired code';
  end if;

  insert into user_access (user_id, code_id) values (auth.uid(), v_code.id);

  update access_codes set uses = uses + 1 where id = v_code.id;

  return true;
end $$;

-- RLS helper for app tables (optional, uncomment and adapt table names):
-- Example: require access to insert into sets table
-- drop policy if exists "insert_own_sets" on public.sets;
-- create policy "insert_own_sets" on public.sets
--   for insert to authenticated
--   with check (
--     auth.uid() = user_id and exists (
--       select 1 from user_access ua where ua.user_id = auth.uid()
--     )
--   );
