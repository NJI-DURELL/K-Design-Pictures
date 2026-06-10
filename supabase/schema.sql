-- =====================================================================
-- K-Design Pictures — Supabase schema
-- Run this in the Supabase SQL editor (Dashboard > SQL > New query).
-- =====================================================================

-- ---------- Profiles (one row per auth user, holds the role) ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  avatar_url text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by the owner"
  on public.profiles for select using (auth.uid() = id);
create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

-- Create a profile automatically when a new user signs up.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- Helper: is the current user an admin? ----------
create or replace function public.is_admin()
returns boolean language sql security definer stable as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$;

-- ---------- Projects ----------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null,
  client text,
  year int,
  summary text,
  description text,
  cover_url text,
  gallery jsonb default '[]'::jsonb,
  video_url text,
  services jsonb default '[]'::jsonb,
  featured boolean default false,
  published boolean default false,
  created_at timestamptz not null default now()
);
alter table public.projects enable row level security;
create policy "Published projects are public"
  on public.projects for select using (published or public.is_admin());
create policy "Admins manage projects"
  on public.projects for all using (public.is_admin()) with check (public.is_admin());

-- ---------- Services ----------
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  icon text,
  summary text,
  description text,
  features jsonb default '[]'::jsonb,
  sort_order int default 0
);
alter table public.services enable row level security;
create policy "Services are public" on public.services for select using (true);
create policy "Admins manage services"
  on public.services for all using (public.is_admin()) with check (public.is_admin());

-- ---------- Testimonials ----------
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  company text,
  quote text not null,
  rating int default 5,
  published boolean default true,
  created_at timestamptz not null default now()
);
alter table public.testimonials enable row level security;
create policy "Published testimonials are public"
  on public.testimonials for select using (published or public.is_admin());
create policy "Admins manage testimonials"
  on public.testimonials for all using (public.is_admin()) with check (public.is_admin());

-- ---------- Team ----------
create table if not exists public.team (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  bio text,
  photo_url text,
  sort_order int default 0
);
alter table public.team enable row level security;
create policy "Team is public" on public.team for select using (true);
create policy "Admins manage team"
  on public.team for all using (public.is_admin()) with check (public.is_admin());

-- ---------- Blog posts ----------
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text,
  excerpt text,
  body text,
  cover_url text,
  reading_time text,
  published boolean default false,
  published_at timestamptz default now()
);
alter table public.posts enable row level security;
create policy "Published posts are public"
  on public.posts for select using (published or public.is_admin());
create policy "Admins manage posts"
  on public.posts for all using (public.is_admin()) with check (public.is_admin());

-- ---------- Saved projects (per user) ----------
create table if not exists public.saved_projects (
  user_id uuid references auth.users(id) on delete cascade,
  project_slug text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, project_slug)
);
alter table public.saved_projects enable row level security;
create policy "Users manage their saved projects"
  on public.saved_projects for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------- Notifications (per user) ----------
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  body text,
  read boolean default false,
  created_at timestamptz not null default now()
);
alter table public.notifications enable row level security;
create policy "Users read their notifications"
  on public.notifications for select using (auth.uid() = user_id);
create policy "Users update their notifications"
  on public.notifications for update using (auth.uid() = user_id);

-- ---------- Contact messages ----------
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  service text,
  budget text,
  message text not null,
  created_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;
create policy "Anyone can send a message"
  on public.contact_messages for insert with check (true);
create policy "Admins read messages"
  on public.contact_messages for select using (public.is_admin());

-- ---------- Storage bucket for media ----------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "Public can view media"
  on storage.objects for select using (bucket_id = 'media');
create policy "Admins upload media"
  on storage.objects for insert with check (bucket_id = 'media' and public.is_admin());
create policy "Admins update media"
  on storage.objects for update using (bucket_id = 'media' and public.is_admin());
create policy "Admins delete media"
  on storage.objects for delete using (bucket_id = 'media' and public.is_admin());

-- =====================================================================
-- To make yourself an admin after signing up, run:
--   update public.profiles set role = 'admin' where id = 'YOUR-USER-UUID';
-- =====================================================================
