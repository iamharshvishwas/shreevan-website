import type { Metadata } from "next";
import { AdminSettingsPanel } from "@/components/admin/admin-settings-panel";
import { AdminShell } from "@/components/admin/admin-shell";
import { readAdminSiteSettings } from "@/lib/admin/site-settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Global Settings",
};

export default async function AdminSettingsPage() {
  const settings = await readAdminSiteSettings();

  return (
    <AdminShell activeSection="settings" kicker="Phase 2" title="Global settings">
      <AdminSettingsPanel initialSettings={settings} />
    </AdminShell>
  );
}
