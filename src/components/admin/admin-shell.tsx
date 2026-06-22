import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { AdminLogoutButton } from "./admin-logout-button";

type AdminSection = "dashboard" | "home" | "settings" | "pages" | "programs" | "content" | "seo";

const adminNav = [
  { id: "dashboard", href: "/admin", label: "Dashboard", status: "Active", enabled: true },
  { id: "home", href: "/admin/home", label: "Home Page", status: "Active", enabled: true },
  { id: "settings", href: "/admin/settings", label: "Global Settings", status: "Active", enabled: true },
  { id: "pages", href: "/admin/pages", label: "Pages", status: "Active", enabled: true },
  { id: "programs", href: "/admin/programs", label: "Programs", status: "Active", enabled: true },
  { id: "content", href: "/admin/content", label: "Content & Trust", status: "Active", enabled: true },
  { id: "seo", href: "/admin/seo", label: "SEO & Leads", status: "Active", enabled: true },
];

export function AdminShell({
  activeSection = "dashboard",
  children,
  kicker = "Admin V1 Foundation",
  title = "Website control center",
}: Readonly<{
  activeSection?: AdminSection;
  children: React.ReactNode;
  kicker?: string;
  title?: string;
}>) {
  return (
    <div className="admin-app-shell">
      <aside className="admin-sidebar" aria-label="Admin navigation">
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

        <nav className="admin-nav">
          {adminNav.map((item) =>
            item.enabled ? (
              <Link
                className={activeSection === item.id ? "is-active" : undefined}
                href={item.href}
                key={item.label}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                <span>{item.label}</span>
                <small>{item.status}</small>
              </Link>
            ) : (
              <span className="is-disabled" key={item.label} aria-disabled="true">
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
