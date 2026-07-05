-- Shreevan Wellness — remaining admin modules (full-site migration scope)
-- Run once via Supabase Dashboard -> SQL Editor, after 0001_content_trust_core.sql.
-- Safe to re-run: every statement is idempotent (IF NOT EXISTS).

-- Singleton: global brand/contact/social/crm/launch/nav settings.
create table if not exists site_settings (
  id         text primary key default 'singleton',
  brand      jsonb not null default '{}',
  contact    jsonb not null default '{}',
  social     jsonb not null default '{}',
  crm        jsonb not null default '{}',
  launch     jsonb not null default '{}',
  navigation jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

-- Singleton: one JSONB column per homepage section, mirroring
-- AdminHomeContentStore's top-level keys 1:1.
create table if not exists home_content (
  id                text primary key default 'singleton',
  hero              jsonb not null default '{}',
  media_band        jsonb not null default '{}',
  proof_strip       jsonb not null default '{}',
  intro             jsonb not null default '{}',
  program_pathways  jsonb not null default '{}',
  differentiation   jsonb not null default '{}',
  rhythm            jsonb not null default '{}',
  team              jsonb not null default '{}',
  travel            jsonb not null default '{}',
  location          jsonb not null default '{}',
  testimonials      jsonb not null default '{}',
  consultation      jsonb not null default '{}',
  lead_form         jsonb not null default '{}',
  updated_at        timestamptz not null default now()
);

create table if not exists managed_pages (
  id         text primary key,
  title      text not null,
  path       text not null unique,
  template   text not null check (template in ('home','standard','legal','commerce')),
  status     text not null default 'draft' check (status in ('draft','published','archived')),
  connected  boolean not null default false,
  seo        jsonb not null default '{}',
  hero       jsonb not null default '{}',
  notes      text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists managed_programs (
  id          text primary key,
  title       text not null,
  path        text not null unique,
  status      text not null default 'draft' check (status in ('draft','published','archived')),
  connected   boolean not null default false,
  order_num   int not null default 0,
  label       text not null default '',
  duration    text not null default '',
  summary     text not null default '',
  outcome     text not null default '',
  audience    text not null default '',
  investment  text not null default '',
  seo         jsonb not null default '{}',
  highlights  jsonb not null default '[]',
  inclusions  jsonb not null default '[]',
  notes       text not null default '',
  updated_at  timestamptz not null default now()
);

create table if not exists seo_routes (
  id                text primary key,
  label             text not null,
  path              text not null unique,
  intent            text not null check (intent in ('core','educational','commercial','transactional','legal')),
  indexable         boolean not null default true,
  sitemap_enabled   boolean not null default true,
  priority          numeric not null default 0.5,
  change_frequency  text not null default 'monthly'
                    check (change_frequency in ('always','hourly','daily','weekly','monthly','yearly','never')),
  focus_keyword     text not null default '',
  qa_status         text not null default 'ready' check (qa_status in ('ready','needs-review','blocked')),
  notes             text not null default '',
  last_reviewed_at  text not null default '',
  updated_at        timestamptz not null default now()
);

-- Singleton: lead-routing config (SLA, CRM stage, checklist).
create table if not exists lead_routing (
  id                       text primary key default 'singleton',
  inbox_email              text not null default '',
  lead_owner               text not null default '',
  response_sla             text not null default '',
  crm_stage                text not null default '',
  whatsapp_escalation      text not null default '',
  qualification_checklist  jsonb not null default '[]',
  updated_at               timestamptz not null default now()
);

-- Append-only lead inbox. Fixes SEC-05 (PII previously in a git-tracked
-- JSON file) as a side effect of this table replacing seo-leads.json.
create table if not exists leads (
  id          text primary key,
  source      text not null check (source in ('home-suitability','book-consultation','contact')),
  status      text not null default 'new' check (status in ('new','reviewed','contacted','closed')),
  name        text not null default '',
  email       text not null default '',
  phone       text not null default '',
  country     text not null default '',
  program     text not null default '',
  topic       text not null default '',
  message     text not null default '',
  goal        text not null default '',
  dates       text not null default '',
  season      text not null default '',
  health      text not null default '',
  consent     boolean not null default false,
  created_at  timestamptz not null default now()
);
create index if not exists leads_status_idx on leads (status);
create index if not exists leads_created_at_idx on leads (created_at desc);

-- Row Level Security: same server-only trust boundary as 0001 — service_role
-- key bypasses RLS, no anon/authenticated policies needed.
alter table site_settings enable row level security;
alter table home_content enable row level security;
alter table managed_pages enable row level security;
alter table managed_programs enable row level security;
alter table seo_routes enable row level security;
alter table lead_routing enable row level security;
alter table leads enable row level security;
