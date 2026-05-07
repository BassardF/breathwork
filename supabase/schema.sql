create extension if not exists "pgcrypto";

create table if not exists public.breath_holds (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  duration_seconds int not null,
  recorded_at timestamptz not null default now()
);

create table if not exists public.co2_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  pb_used_seconds int not null,
  hold_pct numeric not null,
  completed_rounds int not null,
  completed_at timestamptz not null default now()
);

create table if not exists public.o2_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  pb_used_seconds int not null,
  rest_duration_seconds int not null,
  max_hold_pct numeric not null,
  completed_rounds int not null,
  completed_at timestamptz not null default now()
);

create table if not exists public.breathing_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  pattern_name text not null,
  phases jsonb not null,
  total_duration_seconds int not null,
  cycles_completed int not null,
  completed_at timestamptz not null default now()
);

create table if not exists public.custom_patterns (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  phases jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.breath_holds enable row level security;
alter table public.co2_sessions enable row level security;
alter table public.o2_sessions enable row level security;
alter table public.breathing_sessions enable row level security;
alter table public.custom_patterns enable row level security;

create policy "breath_holds own rows" on public.breath_holds
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "co2_sessions own rows" on public.co2_sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "o2_sessions own rows" on public.o2_sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "breathing_sessions own rows" on public.breathing_sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "custom_patterns own rows" on public.custom_patterns
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table public.breath_holds add column if not exists avg_heart_rate int;
alter table public.co2_sessions add column if not exists avg_heart_rate int;
alter table public.o2_sessions add column if not exists avg_heart_rate int;
alter table public.breathing_sessions add column if not exists avg_heart_rate int;
