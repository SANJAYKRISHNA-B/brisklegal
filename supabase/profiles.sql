create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  phone text,
  avatar_url text,
  provider text,
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Users can view their own profile" on public.profiles;
drop policy if exists "Users can insert their own profile" on public.profiles;
drop policy if exists "Users can update their own profile" on public.profiles;

create policy "Users can view their own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles
  for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    email,
    full_name,
    phone,
    avatar_url,
    provider,
    updated_at
  )
  values (
    new.id,
    new.email,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',
      new.raw_user_meta_data ->> 'preferred_username',
      ''
    ),
    coalesce(new.raw_user_meta_data ->> 'phone', new.phone, ''),
    coalesce(
      new.raw_user_meta_data ->> 'avatar_url',
      new.raw_user_meta_data ->> 'picture',
      ''
    ),
    coalesce(new.raw_app_meta_data ->> 'provider', 'email'),
    now()
  )
  on conflict (id) do update
    set email = excluded.email,
        full_name = excluded.full_name,
        phone = excluded.phone,
        avatar_url = excluded.avatar_url,
        provider = excluded.provider,
        updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;

create trigger on_auth_user_created_profile
  after insert on auth.users
  for each row execute function public.handle_new_user_profile();

create or replace function public.upsert_current_user_profile(
  profile_email text default null,
  profile_full_name text default null,
  profile_phone text default null,
  profile_avatar_url text default null,
  profile_provider text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid := auth.uid();
begin
  if current_user_id is null then
    raise exception 'Not authenticated';
  end if;

  insert into public.profiles (
    id,
    email,
    full_name,
    phone,
    avatar_url,
    provider,
    updated_at
  )
  values (
    current_user_id,
    coalesce(profile_email, auth.jwt() ->> 'email', ''),
    coalesce(
      profile_full_name,
      auth.jwt() -> 'user_metadata' ->> 'full_name',
      auth.jwt() -> 'user_metadata' ->> 'name',
      auth.jwt() -> 'user_metadata' ->> 'preferred_username',
      ''
    ),
    coalesce(profile_phone, auth.jwt() -> 'user_metadata' ->> 'phone', ''),
    coalesce(
      profile_avatar_url,
      auth.jwt() -> 'user_metadata' ->> 'avatar_url',
      auth.jwt() -> 'user_metadata' ->> 'picture',
      ''
    ),
    coalesce(profile_provider, auth.jwt() -> 'app_metadata' ->> 'provider', 'email'),
    now()
  )
  on conflict (id) do update
    set email = coalesce(excluded.email, public.profiles.email),
        full_name = coalesce(nullif(excluded.full_name, ''), public.profiles.full_name),
        phone = coalesce(nullif(excluded.phone, ''), public.profiles.phone),
        avatar_url = coalesce(nullif(excluded.avatar_url, ''), public.profiles.avatar_url),
        provider = coalesce(nullif(excluded.provider, ''), public.profiles.provider),
        updated_at = now();
end;
$$;

grant execute on function public.upsert_current_user_profile(text, text, text, text, text) to authenticated;
