-- ============================================================================
-- HELLOW — Production PostgreSQL / Supabase Database Schema
-- Includes: PostGIS Proximity Radar, 11-Tier Level Progression,
-- Opt-In Social & Custom Red-Glass Icebreakers, Live +5 pts/min Sessions,
-- and Dual-Sided Partner Rewards.
-- ============================================================================

-- Enable PostGIS for real-time proximity discovery (10 ft to 1 mile)
create extension if not exists "uuid-ossp";
create extension if not exists "postgis";

-- ----------------------------------------------------------------------------
-- 1. PROFILES & IDENTITY (Locked @handle + Editable Display Name & Theme)
-- ----------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null check (char_length(username) >= 3), -- Permanent locked handle (e.g. NIHTE)
  display_name text not null,                                        -- First name shown nearby (e.g. Jordan)
  profession text default '',
  avatar_url text,
  avatar_crop jsonb default '{"zoom": 1.05, "x": 50, "y": 18}'::jsonb,
  app_theme text not null default 'violet-crimson' check (app_theme in ('violet-crimson', 'forest-mint')),
  radar_active boolean not null default true,
  connections_count integer not null default 0 check (connections_count >= 0),
  points_balance integer not null default 100 check (points_balance >= 0),
  current_venue text default '11 Salem St • Medford',
  last_location geography(Point, 4326),
  last_seen_at timestamptz default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_profiles_location on public.profiles using gist (last_location);
create index idx_profiles_radar_active on public.profiles (radar_active) where radar_active = true;

-- ----------------------------------------------------------------------------
-- 2. CONNECTED SOCIAL PLATFORMS (OAuth / Feed Aggregator Links)
-- ----------------------------------------------------------------------------
create table public.connected_platforms (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  platform_slug text not null, -- 'instagram', 'twitter', 'substack', 'pinterest', etc.
  platform_name text not null,
  external_handle text not null,
  is_connected boolean not null default true,
  synced_at timestamptz default now(),
  unique (user_id, platform_slug)
);

-- ----------------------------------------------------------------------------
-- 3. ICEBREAKER CARDS (Social-Aggregated & Custom Red-Glass Prompts)
-- ----------------------------------------------------------------------------
create table public.icebreaker_cards (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  source_label text not null,          -- e.g. 'Instagram + Pinterest' or 'Custom Icebreaker'
  title text not null,
  prompt text not null,
  opener text,
  is_custom boolean not null default false, -- true = red-glass card, false = smoked-glass social card
  is_visible boolean not null default true,
  media_type text check (media_type in ('none', 'image', 'video')) default 'none',
  media_url text,
  media_poster_url text,
  media_crop jsonb,
  media_caption text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index idx_icebreakers_user_visible on public.icebreaker_cards (user_id, is_visible);

-- ----------------------------------------------------------------------------
-- 4. PROXIMITY CONNECTIONS & LIVE CONVERSATIONS (+50 pts Handshake + 5 pts/min)
-- ----------------------------------------------------------------------------
create table public.connections (
  id uuid primary key default uuid_generate_v4(),
  initiator_id uuid not null references public.profiles(id) on delete cascade,
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'waved' check (status in ('waved', 'confirmed', 'completed', 'declined')),
  venue_spot text,
  started_at timestamptz,
  ended_at timestamptz,
  duration_seconds integer not null default 0,
  minutes_rewarded integer not null default 0,
  created_at timestamptz not null default now(),
  check (initiator_id <> recipient_id)
);

create index idx_connections_participants on public.connections (initiator_id, recipient_id, status);

-- ----------------------------------------------------------------------------
-- 5. POINTS LEDGER (Auditable +50 Handshake & +5/min Live Chat Earnings)
-- ----------------------------------------------------------------------------
create table public.points_ledger (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  connection_id uuid references public.connections(id) on delete set null,
  delta integer not null, -- e.g. +50 (handshake), +5 (1-min chat), -120 (reward redemption)
  reason text not null,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 6. PARTNER REWARDS & 2-PERSON MUTUAL QR PASSES
-- ----------------------------------------------------------------------------
create table public.reward_partners (
  id uuid primary key default uuid_generate_v4(),
  partner_name text not null,
  tagline text not null,
  offer_title text not null,
  description text not null,
  points_cost integer not null check (points_cost > 0),
  category text not null,
  badge_label text default 'Partner Perk',
  brand_theme text default 'cafeluna',
  venue_location geography(Point, 4326),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.reward_redemptions (
  id uuid primary key default uuid_generate_v4(),
  reward_id uuid not null references public.reward_partners(id) on delete restrict,
  redeemer_id uuid not null references public.profiles(id) on delete cascade,
  partner_user_id uuid references public.profiles(id) on delete set null,
  qr_code_token text unique not null,
  points_spent integer not null,
  redeemed_at timestamptz not null default now(),
  used_in_store_at timestamptz
);

-- ----------------------------------------------------------------------------
-- 7. RPC FUNCTIONS: NEARBY RADAR DISCOVERY & MINUTE-BY-MINUTE POINTS
-- ----------------------------------------------------------------------------

-- Find active users within radius_meters sorted closest to furthest
create or replace function public.get_nearby_people(
  user_lat double precision,
  user_lng double precision,
  radius_meters double precision default 1609.34
)
returns table (
  id uuid,
  username text,
  display_name text,
  profession text,
  avatar_url text,
  connections_count integer,
  current_venue text,
  distance_meters double precision
)
language sql
security definer
as $$
  select
    p.id,
    p.username,
    p.display_name,
    p.profession,
    p.avatar_url,
    p.connections_count,
    p.current_venue,
    st_distance(
      p.last_location,
      st_setsrid(st_makepoint(user_lng, user_lat), 4326)::geography
    ) as distance_meters
  from public.profiles p
  where p.radar_active = true
    and p.id <> auth.uid()
    and p.last_location is not null
    and st_dwithin(
      p.last_location,
      st_setsrid(st_makepoint(user_lng, user_lat), 4326)::geography,
      radius_meters
    )
  order by distance_meters asc;
$$;

-- Award +5 points per elapsed minute during an active conversation
create or replace function public.award_conversation_minute(p_connection_id uuid)
returns integer
language plpgsql
security definer
as $$
declare
  v_conn public.connections%rowtype;
begin
  select * into v_conn from public.connections where id = p_connection_id and status = 'confirmed';
  if not found then
    return 0;
  end if;

  update public.connections
  set duration_seconds = duration_seconds + 60,
      minutes_rewarded = minutes_rewarded + 1
  where id = p_connection_id;

  update public.profiles
  set points_balance = points_balance + 5
  where id in (v_conn.initiator_id, v_conn.recipient_id);

  insert into public.points_ledger (user_id, connection_id, delta, reason)
  values
    (v_conn.initiator_id, p_connection_id, 5, 'Live conversation minute bonus'),
    (v_conn.recipient_id, p_connection_id, 5, 'Live conversation minute bonus');

  return 5;
end;
$$;

-- ----------------------------------------------------------------------------
-- 8. ROW-LEVEL SECURITY (RLS) POLICIES
-- ----------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.connected_platforms enable row level security;
alter table public.icebreaker_cards enable row level security;
alter table public.connections enable row level security;
alter table public.points_ledger enable row level security;
alter table public.reward_partners enable row level security;
alter table public.reward_redemptions enable row level security;

create policy "Public discoverable profiles are readable"
  on public.profiles for select using (radar_active = true or auth.uid() = id);

create policy "Users update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users manage own connected platforms"
  on public.connected_platforms for all using (auth.uid() = user_id);

create policy "Visible icebreakers are readable by all, editable by owner"
  on public.icebreaker_cards for select using (is_visible = true or auth.uid() = user_id);

create policy "Users manage own icebreakers"
  on public.icebreaker_cards for all using (auth.uid() = user_id);

create policy "Participants view and update their connections"
  on public.connections for all using (auth.uid() in (initiator_id, recipient_id));

create policy "Users view own points ledger"
  on public.points_ledger for select using (auth.uid() = user_id);

create policy "Anyone can view active partner rewards"
  on public.reward_partners for select using (is_active = true);

create policy "Users view own redemptions"
  on public.reward_redemptions for select using (auth.uid() in (redeemer_id, partner_user_id));