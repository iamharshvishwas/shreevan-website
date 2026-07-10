"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { siteConfig } from "@/config/site";
import type { AdminManagedPage, AdminPageContentStore, AdminPageStatus } from "@/lib/admin/page-content";

type StatusFilter = "all" | AdminPageStatus;
type ManagerFilter = "all" | "page-editor" | "dedicated-manager";
type SortMode = "website-order" | "title-asc" | "status-asc";

type PageManager = {
  href: string;
  label: string;
  source: string;
  dedicated: boolean;
};

function formatUpdatedAt(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not saved yet";
  }

  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function statusLabel(status: AdminPageStatus) {
  if (status === "published") {
    return "Published";
  }

  if (status === "archived") {
    return "Archived";
  }

  return "Draft";
}

function templateLabel(template: AdminManagedPage["template"]) {
  if (template === "home") {
    return "Home builder";
  }

  if (template === "commerce") {
    return "Payment";
  }

  if (template === "legal") {
    return "Legal";
  }

  return "Standard";
}

function pageManager(page: AdminManagedPage): PageManager {
  if (page.id === "home") {
    return { href: "/admin/home", label: "Open builder", source: "Home builder", dedicated: true };
  }

  if (page.path === "/programs" || page.path.startsWith("/programs/")) {
    return { href: "/admin/programs", label: "Open programs", source: "Programs", dedicated: true };
  }

  if (page.path === "/faqs" || page.path === "/testimonials") {
    return { href: "/admin/content", label: "Open content", source: "Content & Trust", dedicated: true };
  }

  return {
    href: `/admin/pages/${encodeURIComponent(page.id)}`,
    label: "Edit",
    source: "Page editor",
    dedicated: false,
  };
}

function pagePreviewHref(page: AdminManagedPage) {
  return new URL(page.path, siteConfig.url).toString();
}

function matchesSearch(page: AdminManagedPage, query: string) {
  if (!query) {
    return true;
  }

  const haystack = [page.title, page.path, page.template, page.seo.title, page.hero.title]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

export function AdminPagesPanel({
  initialPageContent,
}: Readonly<{ initialPageContent: AdminPageContentStore }>) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [managerFilter, setManagerFilter] = useState<ManagerFilter>("all");
  const [sortMode, setSortMode] = useState<SortMode>("website-order");

  const draftCount = initialPageContent.pages.filter((page) => page.status === "draft").length;
  const dedicatedManagerCount = initialPageContent.pages.filter((page) => pageManager(page).dedicated).length;
  const pageEditorCount = initialPageContent.pages.length - dedicatedManagerCount;
  const noindexCount = initialPageContent.pages.filter((page) => page.seo.noindex).length;
  const filteredPages = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const pages = initialPageContent.pages.filter((page) => {
      const matchesStatus = statusFilter === "all" || page.status === statusFilter;
      const manager = pageManager(page);
      const matchesManager =
        managerFilter === "all" ||
        (managerFilter === "dedicated-manager" ? manager.dedicated : !manager.dedicated);

      return matchesStatus && matchesManager && matchesSearch(page, normalizedQuery);
    });

    return pages.sort((left, right) => {
      if (sortMode === "title-asc") {
        return left.title.localeCompare(right.title);
      }

      if (sortMode === "status-asc") {
        return statusLabel(left.status).localeCompare(statusLabel(right.status));
      }

      return initialPageContent.pages.indexOf(left) - initialPageContent.pages.indexOf(right);
    });
  }, [initialPageContent.pages, managerFilter, query, sortMode, statusFilter]);

  return (
    <main className="admin-dashboard admin-pages-index" aria-labelledby="admin-pages-title">
      <section className="admin-dashboard-hero admin-settings-hero">
        <div>
          <p className="admin-kicker">Page manager</p>
          <h2 id="admin-pages-title">Manage website pages, SEO and publishing state.</h2>
          <p>
            Every public website page is listed here, except Journal articles which stay in Blog
            Upload. Choose a page to open its correct content manager or page settings.
          </p>
        </div>
        <div className="admin-status-panel" aria-label="Page overview">
          <span>Page overview</span>
          <dl>
            <div>
              <dt>Updated</dt>
              <dd>{formatUpdatedAt(initialPageContent.updatedAt)}</dd>
            </div>
            <div>
              <dt>Listed pages</dt>
              <dd>{initialPageContent.pages.length} pages</dd>
            </div>
            <div>
              <dt>Drafts</dt>
              <dd>{draftCount} page{draftCount === 1 ? "" : "s"}</dd>
            </div>
            <div>
              <dt>Dedicated managers</dt>
              <dd>{dedicatedManagerCount} pages</dd>
            </div>
            <div>
              <dt>Page editor</dt>
              <dd>{pageEditorCount} pages</dd>
            </div>
            <div>
              <dt>Hidden from Google</dt>
              <dd>{noindexCount} page{noindexCount === 1 ? "" : "s"}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="admin-panel admin-page-list-panel" aria-labelledby="page-list-heading">
        <div className="admin-page-list-heading">
          <div>
            <p className="admin-kicker">Pages</p>
            <h2 id="page-list-heading">Website pages</h2>
          </div>
          <span className="admin-page-list-count">{initialPageContent.pages.length} total</span>
        </div>

        <div className="admin-page-filters">
          <label className="admin-field">
            Search pages
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title, path or SEO title"
            />
          </label>
          <label className="admin-field">
            Status
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}>
              <option value="all">All statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </label>
          <label className="admin-field">
            Manage in
            <select value={managerFilter} onChange={(event) => setManagerFilter(event.target.value as ManagerFilter)}>
              <option value="all">All pages</option>
              <option value="page-editor">Page editor</option>
              <option value="dedicated-manager">Dedicated manager</option>
            </select>
          </label>
          <label className="admin-field">
            Sort
            <select value={sortMode} onChange={(event) => setSortMode(event.target.value as SortMode)}>
              <option value="website-order">Website order</option>
              <option value="title-asc">Title A-Z</option>
              <option value="status-asc">Status</option>
            </select>
          </label>
        </div>

        <div className="admin-page-table" role="table" aria-label="Website pages">
          <div className="admin-page-table-head" role="row">
            <span>Page</span>
            <span>Path</span>
            <span>Template</span>
            <span>Status</span>
            <span>Manage in</span>
            <span>Search</span>
            <span>Actions</span>
          </div>
          {filteredPages.length ? (
            filteredPages.map((page) => {
              const manager = pageManager(page);

              return (
              <article className="admin-page-row" key={page.id} role="row">
                <div className="admin-page-title-cell" role="cell">
                  <Link href={manager.href}>{page.title}</Link>
                  <small>
                    {manager.dedicated ? `Managed in ${manager.source}` : page.hero.title || "Page content and SEO"}
                  </small>
                </div>
                <code role="cell">{page.path}</code>
                <span role="cell">{templateLabel(page.template)}</span>
                <em className={`admin-page-status is-${page.status}`} role="cell">
                  {statusLabel(page.status)}
                </em>
                <span className={manager.dedicated ? "admin-page-live-state is-live" : "admin-page-live-state"} role="cell">
                  {manager.source}
                </span>
                <span role="cell">{page.seo.noindex ? "Hidden" : "Index"}</span>
                <div className="admin-page-actions" role="cell">
                  <Link className="admin-secondary-button" href={manager.href}>
                    {manager.label}
                  </Link>
                  {page.connected ? (
                    <a className="admin-secondary-button" href={pagePreviewHref(page)} target="_blank" rel="noreferrer">
                      View site
                    </a>
                  ) : null}
                </div>
              </article>
              );
            })
          ) : (
            <div className="admin-page-empty">
              <strong>No pages match this view.</strong>
              <p>Adjust the filters or search for a different page.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
