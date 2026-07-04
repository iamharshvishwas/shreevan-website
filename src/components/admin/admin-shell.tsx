"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { AdminLogoutButton } from "./admin-logout-button";

type AdminSection = "dashboard" | "home" | "settings" | "pages" | "programs" | "content" | "blog" | "seo";

const adminNav = [
  { id: "dashboard", href: "/admin", label: "Dashboard", short: "D", status: "Active", enabled: true },
  { id: "home", href: "/admin/home", label: "Home Page", short: "H", status: "Active", enabled: true },
  { id: "settings", href: "/admin/settings", label: "Global Settings", short: "G", status: "Active", enabled: true },
  { id: "pages", href: "/admin/pages", label: "Pages", short: "P", status: "Active", enabled: true },
  { id: "programs", href: "/admin/programs", label: "Programs", short: "PR", status: "Active", enabled: true },
  { id: "content", href: "/admin/content", label: "Content & Trust", short: "C", status: "Active", enabled: true },
  { id: "blog", href: "/admin/blog", label: "Blog Upload", short: "B", status: "Active", enabled: true },
  { id: "seo", href: "/admin/seo", label: "SEO & Leads", short: "S", status: "Active", enabled: true },
];

export function AdminShell({
  activeSection = "dashboard",
  children,
  kicker = "Admin V1 Foundation",
  title = "Website control center",
}: Readonly<{
  activeSection?: AdminSection;
  children: ReactNode;
  kicker?: string;
  title?: string;
}>) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(activeSection === "blog");

  return (
    <div className={isSidebarCollapsed ? "admin-app-shell is-sidebar-collapsed" : "admin-app-shell"}>
      <aside className="admin-sidebar" aria-label="Admin navigation">
        <div className="admin-sidebar-head">
          <Link className="admin-brand" href="/admin" aria-label="Shreevan admin dashboard">
            <Image
              src={siteConfig.logos.markOnForest}
              alt="Shreevan Wellness"
              width={52}
              height={52}
              priority
            />
            <span>
              <strong>Shreevan</strong>
              Admin
            </span>
          </Link>
          <button
            className="admin-sidebar-toggle"
            type="button"
            aria-expanded={!isSidebarCollapsed}
            aria-label={isSidebarCollapsed ? "Open admin sidebar" : "Collapse admin sidebar"}
            onClick={() => setIsSidebarCollapsed((current) => !current)}
          >
            <span aria-hidden="true">{isSidebarCollapsed ? ">>" : "<<"}</span>
          </button>
        </div>

        <nav className="admin-nav">
          {adminNav.map((item) =>
            item.enabled ? (
              <Link
                className={activeSection === item.id ? "is-active" : undefined}
                href={item.href}
                key={item.label}
                data-short={item.short}
                title={item.label}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                <span>{item.label}</span>
                <small>{item.status}</small>
              </Link>
            ) : (
              <span className="is-disabled" key={item.label} data-short={item.short} title={item.label} aria-disabled="true">
                <span>{item.label}</span>
                <small>{item.status}</small>
              </span>
            ),
          )}
        </nav>

        <div className="admin-sidebar-note">
          <span>Subdomain ready</span>
          <p>Requests from admin.shreevanwellness.com can now resolve into this admin area.</p>
        </div>
      </aside>

      <div className="admin-workspace">
        <header className="admin-topbar">
          <div>
            <p className="admin-kicker">{kicker}</p>
            <h1>{title}</h1>
          </div>
          <div className="admin-topbar-actions">
            <Link className="admin-secondary-button" href={siteConfig.url} target="_blank">
              View site
            </Link>
            <AdminLogoutButton />
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}
