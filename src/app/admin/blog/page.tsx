import type { Metadata } from "next";
import { AdminBlogPanel } from "@/components/admin/admin-blog-panel";
import { AdminShell } from "@/components/admin/admin-shell";
import { readAdminContentTrust } from "@/lib/admin/content-trust";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog Upload",
};

export default async function AdminBlogPage() {
  const contentTrust = await readAdminContentTrust();

  return (
    <AdminShell activeSection="blog" kicker="Blog Manager" title="Blog upload">
      <AdminBlogPanel
        initialBlog={{
          journalCategories: contentTrust.journalCategories,
          journalArticles: contentTrust.journalArticles,
          updatedAt: contentTrust.updatedAt,
        }}
      />
    </AdminShell>
  );
}
