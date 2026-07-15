-- Page-specific builders expose only the fields used by their public templates.
alter table managed_pages add column if not exists content jsonb not null default '{}';
