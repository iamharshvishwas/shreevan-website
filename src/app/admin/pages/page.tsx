import type { Metadata } from "next";
import { AdminPagesPanel } from "@/components/admin/admin-pages-panel";
import { AdminShell } from "@/components/admin/admin-shell";
import { readAdminPageContent } from "@/lib/admin/page-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pages",
};

export default async function AdminPagesPage() {
  const pageContent = await readAdminPageContent();

  return (
    <AdminShell activeSection="pages" kicker="Page Manager" title="Pages">
      <AdminPagesPanel initialPageContent={pageContent} />
    </AdminShell>
  );
}
