import type { Metadata } from "next";
import { AdminContentPanel } from "@/components/admin/admin-content-panel";
import { AdminShell } from "@/components/admin/admin-shell";
import { readAdminContentTrust } from "@/lib/admin/content-trust";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Content & Trust",
};

export default async function AdminContentPage() {
  const contentTrust = await readAdminContentTrust();

  return (
    <AdminShell activeSection="content" kicker="Phase 5" title="Content & Trust">
      <AdminContentPanel initialContentTrust={contentTrust} />
    </AdminShell>
  );
}
