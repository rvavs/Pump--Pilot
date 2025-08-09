-- Pump Pilot schema (tables + RLS)
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "read own profile" on public.profiles for select using (id = auth.uid());
create policy "update own profile" on public.profiles for update using (id = auth.uid());

create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  day_name text,
  started_at timestamptz default now(),
  ended_at timestamptz
);
alter table public.sessions enable row level security;
create policy "own sessions read" on public.sessions for select using (user_id = auth.uid());
create policy "own sessions write" on public.sessions for insert with check (user_id = auth.uid());
create policy "own sessions update" on public.sessions for update using (user_id = auth.uid());
create policy "own sessions delete" on public.sessions for delete using (user_id = auth.uid());

create table if not exists public.sets (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.sessions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  movement text not null,
  load numeric,
  reps int,
  rir int,
  notes text,
  created_at timestamptz default now()
);
alter table public.sets enable row level security;
create policy "own sets read" on public.sets for select using (user_id = auth.uid());
create policy "own sets write" on public.sets for insert with check (user_id = auth.uid());
create policy "own sets update" on public.sets for update using (user_id = auth.uid());
create policy "own sets delete" on public.sets for delete using (user_id = auth.uid());

create table if not exists public.weight_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  taken_at date not null default now(),
  weight_kg numeric,
  notes text
);
alter table public.weight_logs enable row level security;
create policy "own weight read" on public.weight_logs for select using (user_id = auth.uid());
create policy "own weight write" on public.weight_logs for insert with check (user_id = auth.uid());
create policy "own weight update" on public.weight_logs for update using (user_id = auth.uid());
create policy "own weight delete" on public.weight_logs for delete using (user_id = auth.uid());

create table if not exists public.photos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  session_id uuid references public.sessions(id) on delete set null,
  kind text check (kind in ('am','post_pump')),
  path text not null,
  taken_at timestamptz default now(),
  notes text
);
alter table public.photos enable row level security;
create policy "own photos read" on public.photos for select using (user_id = auth.uid());
create policy "own photos write" on public.photos for insert with check (user_id = auth.uid());
create policy "own photos update" on public.photos for update using (user_id = auth.uid());
create policy "own photos delete" on public.photos for delete using (user_id = auth.uid());

create table if not exists public.macro_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null check (label in ('high','medium','low')),
  protein_g int, carbs_g int, fats_g int
);
alter table public.macro_profiles enable row level security;
create policy "own macros read" on public.macro_profiles for select using (user_id = auth.uid());
create policy "own macros write" on public.macro_profiles for insert with check (user_id = auth.uid());
create policy "own macros update" on public.macro_profiles for update using (user_id = auth.uid());
create policy "own macros delete" on public.macro_profiles for delete using (user_id = auth.uid());

create table if not exists public.meals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  when_minutes int not null,
  protein_g int, carbs_g int, fats_g int,
  profile_id uuid references public.macro_profiles(id) on delete set null
);
alter table public.meals enable row level security;
create policy "own meals read" on public.meals for select using (user_id = auth.uid());
create policy "own meals write" on public.meals for insert with check (user_id = auth.uid());
create policy "own meals update" on public.meals for update using (user_id = auth.uid());
create policy "own meals delete" on public.meals for delete using (user_id = auth.uid());
