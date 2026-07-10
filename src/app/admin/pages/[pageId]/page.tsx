import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { AdminPageEditorPanel } from "@/components/admin/admin-page-editor-panel";
import { AdminShell } from "@/components/admin/admin-shell";
import { readAdminPageContent } from "@/lib/admin/page-content";

type AdminPageEditorPageProps = {
  params: Promise<{
    pageId: string;
  }>;
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Page Editor",
};

export default async function AdminPageEditorPage({ params }: AdminPageEditorPageProps) {
  const { pageId } = await params;

  if (pageId === "home") {
    redirect("/admin/home");
  }

  const pageContent = await readAdminPageContent();
  const page = pageContent.pages.find((item) => item.id === pageId);

  if (!page) {
    notFound();
  }

  return (
    <AdminShell activeSection="pages" kicker="Page Editor" title={page.title}>
      <AdminPageEditorPanel initialPageContent={pageContent} pageId={page.id} />
    </AdminShell>
  );
}
