-- Shreevan Wellness — content-trust module migration
-- Run once via Supabase Dashboard -> SQL Editor on the NEW project.
-- Safe to re-run: every statement is idempotent (IF NOT EXISTS / OR REPLACE).

create table if not exists journal_articles (
  id                    text primary key,
  slug                  text not null unique,
  category              text not null,
  category_id           text not null,
  title                 text not null,
  excerpt               text not null default '',
  date_label            text not null default '',
  read_time             text not null default '',
  audience              text not null default '',
  tags                  jsonb not null default '[]',
  key_points            jsonb not null default '[]',
  focus_keyword         text not null default '',
  faqs                  jsonb not null default '[]',
  toc_enabled           boolean not null default true,
  content               text not null default '',
  content_html          text not null default '',
  body                  jsonb not null default '[]',
  blocks                jsonb not null default '[]',
  cover_media           jsonb not null default '{}',
  seo_title             text not null default '',
  seo_description       text not null default '',
  canonical_path        text not null default '',
  canonical_url         text not null default '',
  published_at          timestamptz,
  scheduled_at          timestamptz,
  index_status          text not null default 'index' check (index_status in ('index','noindex')),
  author_id             text not null default 'admin',
  author                text not null default 'Shreevan Wellness',
  redirect_enabled      boolean not null default false,
  redirect_url          text not null default '',
  redirect_status_code  smallint not null default 301 check (redirect_status_code in (301,302)),
  schema_json           text not null default '',
  related_href          text not null default '',
  related_label         text not null default '',
  contact_label         text not null default '',
  status                text not null default 'draft'
                         check (status in ('draft','published','scheduled','archived')),
  featured              boolean not null default false,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);
create index if not exists journal_articles_status_idx on journal_articles (status);
create index if not exists journal_articles_category_idx on journal_articles (category_id);

create table if not exists faq_categories (
  id         text primary key,
  label      text not null,
  intent     text not null default '',
  status     text not null default 'published'
             check (status in ('draft','published','scheduled','archived')),
  faqs       jsonb not null default '[]',
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists story_slots (
  id         text primary key,
  label      text not null,
  title      text not null,
  context    text not null default '',
  proof      text not null default '',
  status     text not null default 'published'
             check (status in ('draft','published','scheduled','archived')),
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists media_items (
  id             text primary key,
  title          text not null,
  type           text not null check (type in ('image','video','document','embed')),
  placement      text not null default '',
  asset_hint     text not null default '',
  status         text not null default 'draft'
                 check (status in ('draft','published','scheduled','archived')),
  notes          text not null default '',
  storage_bucket text,
  storage_path   text,
  public_url     text,
  mime_type      text,
  size_bytes     bigint,
  width          int,
  height         int,
  uploaded_by    text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create table if not exists content_trust_lists (
  list_key   text primary key,
  items      jsonb not null default '[]',
  updated_at timestamptz not null default now()
);

create table if not exists article_revisions (
  id         bigint generated always as identity primary key,
  article_id text not null references journal_articles(id) on delete cascade,
  snapshot   jsonb not null,
  saved_at   timestamptz not null default now(),
  saved_by   text
);
create index if not exists article_revisions_article_id_idx on article_revisions (article_id, saved_at desc);

-- Row Level Security: server-side API routes use the service_role key exclusively
-- (never exposed to the browser), which bypasses RLS entirely. Enabling RLS with
-- zero policies means the anon/authenticated roles get no access at all — no
-- policy authoring needed.
alter table journal_articles enable row level security;
alter table faq_categories enable row level security;
alter table story_slots enable row level security;
alter table media_items enable row level security;
alter table content_trust_lists enable row level security;
alter table article_revisions enable row level security;
