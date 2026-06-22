import type { Metadata } from "next";
import { AdminSeoPanel } from "@/components/admin/admin-seo-panel";
import { AdminShell } from "@/components/admin/admin-shell";
import { readAdminSeoLeads } from "@/lib/admin/seo-leads";
import { readAdminSiteSettings } from "@/lib/admin/site-settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "SEO & Leads",
};

export default async function AdminSeoPage() {
  const [seoLeads, settings] = await Promise.all([readAdminSeoLeads(), readAdminSiteSettings()]);

  return (
    <AdminShell activeSection="seo" kicker="Phase 6" title="SEO & Leads">
      <AdminSeoPanel initialSeoLeads={seoLeads} launchSettings={settings.launch} />
    </AdminShell>
  );
}
