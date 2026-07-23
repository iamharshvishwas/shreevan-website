"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { countWords, readTimeLabel, RichTextEditor } from "@/components/admin/rich-text-editor/rich-text-editor";
import { analyzeArticleSeo } from "@/lib/content/article-seo";
import { modalityRoutes, programRoutes } from "@/config/routes";
import type {
  AdminArticleFaq,
  AdminBlogBlock,
  AdminBlogBlockType,
  AdminBlogIndexStatus,
  AdminBlogRedirectStatusCode,
  AdminContentStatus,
  AdminContentTrustStore,
  AdminJournalArticle,
} from "@/lib/admin/content-trust";

type AdminBlogStore = Pick<AdminContentTrustStore, "journalCategories" | "journalArticles" | "updatedAt">;
type SaveState = "idle" | "saving" | "saved" | "error";
type UploadState = "idle" | "uploading" | "error";
type BlogView = "list" | "editor";
type StatusFilter = "all" | AdminContentStatus;
type SortMode = "updated-desc" | "title-asc" | "status-asc" | "date-desc";
type BulkAction = "" | "publish" | "draft" | "archive" | "delete";

const emptyCoverMedia: NonNullable<AdminJournalArticle["coverMedia"]> = {
  kind: "",
  src: "",
  alt: "",
  caption: "",
  description: "",
};

// The legacy block builder is replaced by the rich text editor but its code is
// intentionally kept (per Harsh's request). Flip this to true to bring the
// old Page Builder + Structured Content UI back.
const SHOW_LEGACY_BLOCK_BUILDER = false;

const BLOG_BACKUP_STORAGE_KEY = "shreevan-blog-draft-backup";
const BLOG_BACKUP_DEBOUNCE_MS = 2000;

const SERP_TITLE_LIMIT = 60;
const SERP_DESCRIPTION_LIMIT = 160;

function truncateForSerp(value: string, limit: number) {
  return value.length > limit ? `${value.slice(0, limit - 1).trimEnd()}…` : value;
}

function parseCommaList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

const blockTypes: Array<{ type: AdminBlogBlockType; label: string; copy: string }> = [
  { type: "paragraph", label: "Paragraph", copy: "Body text" },
  { type: "heading", label: "Heading", copy: "H2/H3 section" },
  { type: "image", label: "Image", copy: "Inline image" },
  { type: "quote", label: "Quote", copy: "Callout quote" },
  { type: "button", label: "Button/CTA", copy: "Action link" },
  { type: "divider", label: "Divider", copy: "Visual separator" },
  { type: "embed", label: "Embed/HTML", copy: "Safe code block" },
];

const authorOptions = [
  { id: "admin", label: "Shreevan Wellness" },
  { id: "isha-dutta", label: "Isha Dutta" },
  { id: "editorial-team", label: "Editorial Team" },
];

function cloneBlogStore(blog: AdminBlogStore): AdminBlogStore {
  return JSON.parse(JSON.stringify(blog)) as AdminBlogStore;
}

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

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);
}

function categoryId(value: string) {
  return slugify(value) || "program-fit";
}

function todayLabel() {
  return new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
}

function datetimeLocalNow(offsetMinutes = 0) {
  const date = new Date(Date.now() + offsetMinutes * 60 * 1000);
  const timezoneOffset = date.getTimezoneOffset() * 60 * 1000;

  return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 16);
}

function textToLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function linesToText(items: string[] = []) {
  return items.join("\n");
}

function statusLabel(status: AdminContentStatus) {
  if (status === "published") {
    return "Published";
  }

  if (status === "scheduled") {
    return "Scheduled";
  }

  if (status === "archived") {
    return "Archived";
  }

  return "Draft";
}

function indexLabel(status?: AdminBlogIndexStatus) {
  return status === "noindex" ? "Noindex" : "Index";
}

function articleSlug(article: AdminJournalArticle) {
  return slugify(article.slug || article.id) || "blog-draft";
}

function articleCover(article?: AdminJournalArticle) {
  return article?.coverMedia ?? emptyCoverMedia;
}

function makeUniqueSlug(base: string, articles: AdminJournalArticle[], currentId?: string) {
  const cleanBase = slugify(base) || "blog-draft";
  let candidate = cleanBase;
  let suffix = 2;

  while (articles.some((article) => articleSlug(article) === candidate && article.id !== currentId)) {
    candidate = `${cleanBase}-${suffix}`;
    suffix += 1;
  }

  return candidate;
}

function createBlock(type: AdminBlogBlockType): AdminBlogBlock {
  const id = `${type}-${crypto.randomUUID()}`;

  if (type === "heading") {
    return { id, type, level: 2, content: "New section heading" };
  }

  if (type === "image") {
    return { id, type, content: "", url: "", alt: "", caption: "" };
  }

  if (type === "quote") {
    return { id, type, content: "Add a meaningful quote or pullout." };
  }

  if (type === "button") {
    return { id, type, content: "", label: "Book consultation", href: "/book-consultation" };
  }

  if (type === "divider") {
    return { id, type, content: "" };
  }

  if (type === "embed") {
    return { id, type, content: "" };
  }

  return { id, type, content: "Start writing this paragraph." };
}

function blocksToContent(blocks: AdminBlogBlock[] = []) {
  return blocks
    .filter((block) => block.type !== "divider" && (block.content || block.label || block.url))
    .map((block) => {
      if (block.type === "heading") {
        return `${block.level === 3 ? "###" : "##"} ${block.content}`;
      }

      if (block.type === "image") {
        return block.caption || block.alt || block.url || "";
      }

      if (block.type === "button") {
        return `${block.label || block.content} ${block.href || ""}`.trim();
      }

      return block.content;
    })
    .filter(Boolean)
    .join("\n\n");
}

function blocksToBody(blocks: AdminBlogBlock[] = []) {
  return blocks
    .filter((block) => block.type === "paragraph" || block.type === "heading" || block.type === "quote")
    .map((block) => (block.type === "heading" ? `## ${block.content}` : block.content))
    .filter(Boolean);
}

function htmlToPlainText(html = "") {
  return html
    .replace(/<(style|script)[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function articleHasContent(article: AdminJournalArticle) {
  return Boolean(
    htmlToPlainText(article.contentHtml).trim() ||
      blocksToContent(article.blocks).trim() ||
      article.content?.trim() ||
      article.body?.length,
  );
}

function previewHref(article: AdminJournalArticle) {
  return `/admin/blog/preview/${articleSlug(article)}`;
}

function publicHref(article: AdminJournalArticle) {
  return `/journal/${articleSlug(article)}`;
}

function isValidUrlOrPath(value: string) {
  if (!value.trim()) {
    return false;
  }

  if (value.startsWith("/")) {
    return true;
  }

  try {
    const parsed = new URL(value);

    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function validateSchemaJson(value: string) {
  if (!value.trim()) {
    return "";
  }

  try {
    JSON.parse(value);
    return "";
  } catch {
    return "Manual schema JSON is invalid.";
  }
}

function validateArticle(article: AdminJournalArticle) {
  const slug = articleSlug(article);

  if (!slug || slug !== (article.slug || article.id)) {
    return "Slug must be URL-safe: lowercase letters, numbers and hyphens only.";
  }

  if (!article.title.trim()) {
    return "Blog title is required.";
  }

  if ((article.status === "published" || article.status === "scheduled") && !article.excerpt.trim()) {
    return "Excerpt is required before publishing or scheduling.";
  }

  if ((article.status === "published" || article.status === "scheduled") && !articleHasContent(article)) {
    return "Blog content is required before publishing or scheduling.";
  }

  if (article.status === "scheduled") {
    if (!article.scheduledAt) {
      return "Scheduled posts need a future schedule date and time.";
    }

    const scheduledAt = new Date(article.scheduledAt).getTime();

    if (!Number.isFinite(scheduledAt) || scheduledAt <= Date.now()) {
      return "Scheduled posts need a future schedule date and time.";
    }
  }

  if (article.coverMedia?.src && !article.coverMedia.alt.trim()) {
    return "Featured image alt text is required.";
  }

  if (article.redirectEnabled && !isValidUrlOrPath(article.redirectUrl ?? "")) {
    return "Redirect URL must be a valid URL or internal path.";
  }

  if (article.canonicalUrl && !isValidUrlOrPath(article.canonicalUrl)) {
    return "Canonical URL must be a valid URL or internal path.";
  }

  return validateSchemaJson(article.schemaJson ?? "");
}

function validateBlog(blog: AdminBlogStore) {
  const slugs = new Set<string>();

  for (const article of blog.journalArticles) {
    const slug = articleSlug(article);

    if (slugs.has(slug)) {
      return `Duplicate blog slug: ${slug}`;
    }

    slugs.add(slug);

    const error = validateArticle(article);

    if (error) {
      return `${article.title || slug}: ${error}`;
    }
  }

  return "";
}

function prepareArticleForSave(article: AdminJournalArticle): AdminJournalArticle {
  const slug = articleSlug(article);
  const cover = articleCover(article);
  const now = new Date().toISOString();
  const blocks = article.blocks?.length ? article.blocks : [createBlock("paragraph")];
  const publishedAt = article.status === "published" ? article.publishedAt || now : article.publishedAt || "";
  const richText = htmlToPlainText(article.contentHtml);
  const plainContent = richText || blocksToContent(blocks);
  const contentWords = countWords(plainContent);

  return {
    ...article,
    id: slug,
    slug,
    categoryId: article.categoryId || categoryId(article.category),
    readTime: contentWords ? readTimeLabel(contentWords) : article.readTime,
    content: plainContent,
    contentHtml: article.contentHtml ?? "",
    body: blocksToBody(blocks),
    blocks,
    coverMedia: {
      ...emptyCoverMedia,
      ...cover,
      kind: cover.src ? "image" : "",
    },
    canonicalPath: article.canonicalPath || `/journal/${slug}`,
    canonicalUrl: article.canonicalUrl || article.canonicalPath || `/journal/${slug}`,
    indexStatus: article.indexStatus ?? "index",
    authorId: article.authorId || "admin",
    author: article.author || "Shreevan Wellness",
    redirectEnabled: article.redirectEnabled ?? false,
    redirectUrl: article.redirectUrl ?? "",
    redirectStatusCode: article.redirectStatusCode ?? 301,
    schemaJson: article.schemaJson ?? "",
    publishedAt,
    scheduledAt: article.status === "scheduled" ? article.scheduledAt || datetimeLocalNow(1440) : article.scheduledAt || "",
    createdAt: article.createdAt || now,
    updatedAt: now,
  };
}

function prepareBlogForSave(blog: AdminBlogStore): AdminBlogStore {
  return {
    ...blog,
    journalArticles: blog.journalArticles.map(prepareArticleForSave),
  };
}

function createDraftArticle(id: string, category: string): AdminJournalArticle {
  const now = new Date().toISOString();

  return {
    id,
    slug: id,
    category,
    categoryId: categoryId(category),
    title: "New blog draft",
    excerpt: "",
    date: todayLabel(),
    readTime: "5 min read",
    audience: "",
    tags: [],
    keyPoints: [],
    focusKeyword: "",
    faqs: [],
    tocEnabled: true,
    content: "",
    contentHtml: "",
    body: [],
    blocks: [createBlock("heading"), createBlock("paragraph")],
    coverMedia: emptyCoverMedia,
    seoTitle: "",
    seoDescription: "",
    canonicalPath: `/journal/${id}`,
    canonicalUrl: `/journal/${id}`,
    publishedAt: "",
    scheduledAt: "",
    indexStatus: "index",
    authorId: "admin",
    author: "Shreevan Wellness",
    redirectEnabled: false,
    redirectUrl: "",
    redirectStatusCode: 301,
    schemaJson: "",
    createdAt: now,
    updatedAt: now,
    relatedHref: "/book-consultation",
    relatedLabel: "Book consultation",
    contactLabel: "Ask a question",
    status: "draft",
    featured: false,
  };
}

function StatusSelect({
  value,
  onChange,
}: Readonly<{ value: AdminContentStatus; onChange: (value: AdminContentStatus) => void }>) {
  return (
    <select value={value} onChange={(event) => onChange(event.target.value as AdminContentStatus)}>
      <option value="draft">Draft</option>
      <option value="published">Published</option>
      <option value="scheduled">Scheduled</option>
      <option value="archived">Archived</option>
    </select>
  );
}

function SettingsPanel({
  children,
  title,
  open = true,
}: Readonly<{
  children: ReactNode;
  title: string;
  open?: boolean;
}>) {
  return (
    <details className="admin-blog-settings-panel" open={open}>
      <summary>{title}</summary>
      <div>{children}</div>
    </details>
  );
}

export function AdminBlogPanel({ initialBlog }: Readonly<{ initialBlog: AdminBlogStore }>) {
  const [blog, setBlog] = useState(() => cloneBlogStore(initialBlog));
  const [savedBlog, setSavedBlog] = useState(() => cloneBlogStore(initialBlog));
  const [view, setView] = useState<BlogView>("list");
  const [activeArticleId, setActiveArticleId] = useState(initialBlog.journalArticles[0]?.id ?? "new-blog-draft");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortMode, setSortMode] = useState<SortMode>("updated-desc");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [message, setMessage] = useState("");
  const [backupPrompt, setBackupPrompt] = useState<{ savedAt: number } | null>(null);
  const [selectedArticleIds, setSelectedArticleIds] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState<BulkAction>("");
  const selectAllRef = useRef<HTMLInputElement>(null);

  const categories = useMemo(() => blog.journalCategories.filter((category) => category !== "All"), [blog.journalCategories]);
  const activeArticle =
    blog.journalArticles.find((article) => article.id === activeArticleId || articleSlug(article) === activeArticleId) ??
    blog.journalArticles[0];
  const cover = articleCover(activeArticle);
  const dirty = useMemo(() => JSON.stringify(blog) !== JSON.stringify(savedBlog), [blog, savedBlog]);
  const publishedCount = blog.journalArticles.filter((article) => article.status === "published").length;
  const draftCount = blog.journalArticles.filter((article) => article.status === "draft").length;
  const scheduledCount = blog.journalArticles.filter((article) => article.status === "scheduled").length;
  const archivedCount = blog.journalArticles.filter((article) => article.status === "archived").length;
  const coverCount = blog.journalArticles.filter((article) => article.coverMedia?.src).length;
  const schemaMessage = activeArticle ? validateSchemaJson(activeArticle.schemaJson ?? "") : "";
  const activeValidation = activeArticle ? validateArticle(activeArticle) : "";

  const seoChecks = useMemo(
    () =>
      activeArticle
        ? analyzeArticleSeo({
            focusKeyword: activeArticle.focusKeyword ?? "",
            title: activeArticle.title,
            seoTitle: activeArticle.seoTitle ?? "",
            seoDescription: activeArticle.seoDescription ?? "",
            excerpt: activeArticle.excerpt,
            slug: articleSlug(activeArticle),
            contentHtml: activeArticle.contentHtml ?? "",
          })
        : [],
    [activeArticle],
  );

  const linkSuggestions = useMemo(() => {
    if (!activeArticle) {
      return [];
    }

    const relatedPosts = blog.journalArticles
      .filter((article) => article.id !== activeArticle.id && article.status === "published")
      .sort((a, b) => (a.category === activeArticle.category ? -1 : 0) - (b.category === activeArticle.category ? -1 : 0))
      .slice(0, 3)
      .map((article) => ({ label: article.title, href: `/journal/${articleSlug(article)}` }));

    return [
      { label: "Book Consultation", href: "/book-consultation" },
      ...programRoutes.filter((route) => route.href !== "/programs").map((route) => ({ label: route.label, href: route.href })),
      ...modalityRoutes.filter((route) => route.href !== "/modalities").slice(0, 3).map((route) => ({ label: route.label, href: route.href })),
      ...relatedPosts,
    ].map((item) => ({
      ...item,
      linked: (activeArticle.contentHtml ?? "").includes(`href="${item.href}"`),
    }));
  }, [activeArticle, blog.journalArticles]);

  // Offer to restore an unsaved local draft backup (browser crash / closed tab).
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const raw = window.localStorage.getItem(BLOG_BACKUP_STORAGE_KEY);

        if (!raw) {
          return;
        }

        const parsed = JSON.parse(raw) as { blog?: AdminBlogStore; savedAt?: number } | null;

        if (parsed?.blog && JSON.stringify(parsed.blog) !== JSON.stringify(initialBlog)) {
          setBackupPrompt({ savedAt: parsed.savedAt ?? 0 });
        } else {
          window.localStorage.removeItem(BLOG_BACKUP_STORAGE_KEY);
        }
      } catch {
        // Corrupt/unavailable localStorage — silently skip backup restore.
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [initialBlog]);

  // Continuously back up unsaved work to localStorage while dirty.
  useEffect(() => {
    if (!dirty) {
      return;
    }

    const timer = setTimeout(() => {
      try {
        window.localStorage.setItem(BLOG_BACKUP_STORAGE_KEY, JSON.stringify({ blog, savedAt: Date.now() }));
      } catch {
        // Storage full/unavailable — autosave is best-effort.
      }
    }, BLOG_BACKUP_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [blog, dirty]);

  function restoreBackup() {
    try {
      const raw = window.localStorage.getItem(BLOG_BACKUP_STORAGE_KEY);
      const parsed = raw ? (JSON.parse(raw) as { blog?: AdminBlogStore } | null) : null;

      if (parsed?.blog) {
        setBlog(cloneBlogStore(parsed.blog));
        setActiveArticleId(parsed.blog.journalArticles[0]?.id ?? "");
        setSaveState("idle");
        setMessage("Unsaved draft restored from local backup. Review and save.");
      }
    } catch {
      setMessage("Local backup could not be restored.");
    }

    setBackupPrompt(null);
  }

  function discardBackup() {
    try {
      window.localStorage.removeItem(BLOG_BACKUP_STORAGE_KEY);
    } catch {
      // ignore
    }

    setBackupPrompt(null);
  }

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const results = blog.journalArticles.filter((article) => {
      const matchesStatus = statusFilter === "all" || article.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || article.category === categoryFilter;
      const searchable = [
        article.title,
        articleSlug(article),
        article.category,
        article.author,
        article.seoTitle,
        article.seoDescription,
      ]
        .join(" ")
        .toLowerCase();

      return matchesStatus && matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });

    return [...results].sort((a, b) => {
      if (sortMode === "title-asc") {
        return a.title.localeCompare(b.title);
      }

      if (sortMode === "status-asc") {
        return a.status.localeCompare(b.status);
      }

      if (sortMode === "date-desc") {
        return (b.scheduledAt || b.publishedAt || b.date).localeCompare(a.scheduledAt || a.publishedAt || a.date);
      }

      return (b.updatedAt ?? "").localeCompare(a.updatedAt ?? "");
    });
  }, [blog.journalArticles, categoryFilter, query, sortMode, statusFilter]);
  const selectedArticleIdSet = useMemo(() => new Set(selectedArticleIds), [selectedArticleIds]);
  const visibleArticleIds = useMemo(() => filteredArticles.map((article) => article.id), [filteredArticles]);
  const selectedVisibleCount = visibleArticleIds.filter((id) => selectedArticleIdSet.has(id)).length;
  const allVisibleSelected = visibleArticleIds.length > 0 && selectedVisibleCount === visibleArticleIds.length;

  useEffect(() => {
    const knownIds = new Set(blog.journalArticles.map((article) => article.id));
    queueMicrotask(() => {
      setSelectedArticleIds((current) => {
        const next = current.filter((id) => knownIds.has(id));
        return next.length === current.length ? current : next;
      });
    });
  }, [blog.journalArticles]);

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = selectedVisibleCount > 0 && !allVisibleSelected;
    }
  }, [allVisibleSelected, selectedVisibleCount]);

  function setBlogWithArticle(articleId: string, patch: Partial<AdminJournalArticle>) {
    setBlog((current) => ({
      ...current,
      journalArticles: current.journalArticles.map((article) =>
        article.id === articleId || articleSlug(article) === articleId ? { ...article, ...patch } : article,
      ),
    }));
    setSaveState("idle");
  }

  function updateActiveArticle(patch: Partial<AdminJournalArticle>) {
    if (!activeArticle) {
      return;
    }

    setBlogWithArticle(activeArticle.id, patch);
  }

  function updateActiveCover(patch: Partial<NonNullable<AdminJournalArticle["coverMedia"]>>) {
    if (!activeArticle) {
      return;
    }

    setBlogWithArticle(activeArticle.id, {
      coverMedia: {
        ...articleCover(activeArticle),
        ...patch,
      },
    });
  }

  function updateBlock(blockId: string, patch: Partial<AdminBlogBlock>) {
    if (!activeArticle) {
      return;
    }

    setBlogWithArticle(activeArticle.id, {
      blocks: (activeArticle.blocks ?? []).map((block) => (block.id === blockId ? { ...block, ...patch } : block)),
    });
  }

  function addBlock(type: AdminBlogBlockType) {
    if (!activeArticle) {
      return;
    }

    setBlogWithArticle(activeArticle.id, {
      blocks: [...(activeArticle.blocks ?? []), createBlock(type)],
    });
  }

  function moveBlock(blockId: string, direction: -1 | 1) {
    if (!activeArticle) {
      return;
    }

    const blocks = [...(activeArticle.blocks ?? [])];
    const index = blocks.findIndex((block) => block.id === blockId);
    const nextIndex = index + direction;

    if (index < 0 || nextIndex < 0 || nextIndex >= blocks.length) {
      return;
    }

    const [item] = blocks.splice(index, 1);
    blocks.splice(nextIndex, 0, item);
    setBlogWithArticle(activeArticle.id, { blocks });
  }

  function duplicateBlock(blockId: string) {
    if (!activeArticle) {
      return;
    }

    const blocks = [...(activeArticle.blocks ?? [])];
    const index = blocks.findIndex((block) => block.id === blockId);

    if (index < 0) {
      return;
    }

    blocks.splice(index + 1, 0, { ...blocks[index], id: `${blocks[index].type}-${crypto.randomUUID()}` });
    setBlogWithArticle(activeArticle.id, { blocks });
  }

  function deleteBlock(blockId: string) {
    if (!activeArticle) {
      return;
    }

    setBlogWithArticle(activeArticle.id, {
      blocks: (activeArticle.blocks ?? []).filter((block) => block.id !== blockId),
    });
  }

  function updateArticleFaq(faqId: string, patch: Partial<AdminArticleFaq>) {
    if (!activeArticle) {
      return;
    }

    setBlogWithArticle(activeArticle.id, {
      faqs: (activeArticle.faqs ?? []).map((faq) => (faq.id === faqId ? { ...faq, ...patch } : faq)),
    });
  }

  function addArticleFaq() {
    if (!activeArticle) {
      return;
    }

    setBlogWithArticle(activeArticle.id, {
      faqs: [...(activeArticle.faqs ?? []), { id: `faq-${crypto.randomUUID()}`, question: "", answer: "" }],
    });
  }

  function removeArticleFaq(faqId: string) {
    if (!activeArticle) {
      return;
    }

    setBlogWithArticle(activeArticle.id, {
      faqs: (activeArticle.faqs ?? []).filter((faq) => faq.id !== faqId),
    });
  }

  async function copyLinkSuggestion(href: string) {
    try {
      await navigator.clipboard.writeText(href);
      setMessage(`Copied ${href} — paste it on selected text with the link button.`);
    } catch {
      setMessage(`Could not copy automatically. Link path: ${href}`);
    }
  }

  function handleCreateArticle() {
    const category = categories[0] ?? "Program Fit";
    const id = makeUniqueSlug("new-blog-draft", blog.journalArticles);
    const article = createDraftArticle(id, category);

    setBlog((current) => ({
      ...current,
      journalArticles: [article, ...current.journalArticles],
    }));
    setActiveArticleId(id);
    setView("editor");
    setSaveState("idle");
    setMessage("New blog draft created.");
  }

  function handleEditArticle(article: AdminJournalArticle) {
    setActiveArticleId(article.id);
    setView("editor");
    setMessage("");
  }

  function handleTitleChange(title: string) {
    if (!activeArticle) {
      return;
    }

    const currentSlug = articleSlug(activeArticle);
    const shouldAutoSlug = currentSlug.startsWith("new-blog-draft") || currentSlug === slugify(activeArticle.title);
    const nextSlug = shouldAutoSlug ? makeUniqueSlug(title, blog.journalArticles, activeArticle.id) : currentSlug;

    setBlogWithArticle(activeArticle.id, {
      title,
      ...(shouldAutoSlug
        ? {
            id: nextSlug,
            slug: nextSlug,
            canonicalPath: `/journal/${nextSlug}`,
            canonicalUrl: `/journal/${nextSlug}`,
          }
        : {}),
    });

    if (shouldAutoSlug) {
      setActiveArticleId(nextSlug);
    }
  }

  function handleSlugChange(value: string) {
    if (!activeArticle) {
      return;
    }

    const slug = makeUniqueSlug(value, blog.journalArticles, activeArticle.id);

    setBlogWithArticle(activeArticle.id, {
      id: slug,
      slug,
      canonicalPath: `/journal/${slug}`,
      canonicalUrl: activeArticle.canonicalUrl?.startsWith("/journal/") ? `/journal/${slug}` : activeArticle.canonicalUrl,
    });
    setActiveArticleId(slug);
  }

  function archiveArticle(articleId = activeArticle?.id) {
    if (!articleId) {
      return;
    }

    setBlogWithArticle(articleId, { status: "archived" });
    setMessage("Blog archived. Save to hide it from public Journal.");
  }

  function toggleArticleSelection(articleId: string) {
    setSelectedArticleIds((current) =>
      current.includes(articleId) ? current.filter((id) => id !== articleId) : [...current, articleId],
    );
  }

  function toggleVisibleArticleSelection() {
    setSelectedArticleIds((current) => {
      if (allVisibleSelected) {
        const visibleIds = new Set(visibleArticleIds);
        return current.filter((id) => !visibleIds.has(id));
      }

      return [...new Set([...current, ...visibleArticleIds])];
    });
  }

  async function applyBulkAction() {
    if (!bulkAction) {
      setSaveState("error");
      setMessage("Choose a bulk action first.");
      return;
    }

    if (!selectedArticleIds.length) {
      setSaveState("error");
      setMessage("Select at least one blog post before applying a bulk action.");
      return;
    }

    const selectedIds = new Set(selectedArticleIds);

    if (bulkAction === "delete") {
      const confirmed = window.confirm(
        `Permanently delete ${selectedIds.size} selected blog post${selectedIds.size === 1 ? "" : "s"}? This cannot be undone.`,
      );

      if (!confirmed) {
        return;
      }
    }

    const status: AdminContentStatus =
      bulkAction === "publish" ? "published" : bulkAction === "draft" ? "draft" : "archived";
    const nextBlog: AdminBlogStore = {
      ...blog,
      journalArticles:
        bulkAction === "delete"
          ? blog.journalArticles.filter((article) => !selectedIds.has(article.id))
          : blog.journalArticles.map((article) =>
              selectedIds.has(article.id) ? { ...article, status, scheduledAt: "" } : article,
            ),
    };
    const actionLabel =
      bulkAction === "publish"
        ? "published"
        : bulkAction === "draft"
          ? "moved to draft"
          : bulkAction === "delete"
            ? "deleted permanently"
            : "archived";
    const saved = await persistBlog(nextBlog);

    if (saved) {
      setSelectedArticleIds([]);
      setBulkAction("");
      setMessage(`${selectedIds.size} post${selectedIds.size === 1 ? "" : "s"} ${actionLabel}.`);
    }
  }

  async function persistBlog(nextBlog: AdminBlogStore, nextActiveId = activeArticleId) {
    const preparedBlog = prepareBlogForSave(nextBlog);
    const validationError = validateBlog(preparedBlog);

    if (validationError) {
      setSaveState("error");
      setMessage(validationError);
      return false;
    }

    setSaveState("saving");
    setMessage("");

    const response = await fetch("/api/admin/blog", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preparedBlog),
    });
    const body = (await response.json().catch(() => null)) as { blog?: AdminBlogStore; error?: string } | null;

    if (!response.ok || !body?.blog) {
      setSaveState("error");
      setMessage(body?.error ?? "Blog content could not be saved.");
      return false;
    }

    setBlog(cloneBlogStore(body.blog));
    setSavedBlog(cloneBlogStore(body.blog));
    setActiveArticleId(
      body.blog.journalArticles.find((article) => article.id === nextActiveId || articleSlug(article) === nextActiveId)?.id ??
        body.blog.journalArticles[0]?.id ??
        "",
    );
    setSaveState("saved");
    setMessage("Blog content saved.");

    try {
      window.localStorage.removeItem(BLOG_BACKUP_STORAGE_KEY);
    } catch {
      // ignore
    }

    return true;
  }

  async function handleSave(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    await persistBlog(blog);
  }

  async function saveActiveWithPatch(patch: Partial<AdminJournalArticle>) {
    if (!activeArticle) {
      return;
    }

    const nextBlog: AdminBlogStore = {
      ...blog,
      journalArticles: blog.journalArticles.map((article) =>
        article.id === activeArticle.id ? { ...article, ...patch } : article,
      ),
    };

    await persistBlog(nextBlog, activeArticle.id);
  }

  async function handleCoverUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file || !activeArticle) {
      return;
    }

    setUploadState("uploading");
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/blog/media", {
      method: "POST",
      body: formData,
    });
    const body = (await response.json().catch(() => null)) as
      | { media?: { kind: "image"; src: string }; error?: string }
      | null;

    if (!response.ok || !body?.media) {
      setUploadState("error");
      setMessage(body?.error ?? "Blog cover upload failed.");
      event.target.value = "";
      return;
    }

    updateActiveCover({
      kind: body.media.kind,
      src: body.media.src,
      alt: cover.alt || activeArticle.title,
    });
    setUploadState("idle");
    setMessage("Featured image uploaded. Save blog to apply.");
    event.target.value = "";
  }

  async function handleBlockImageUpload(blockId: string, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploadState("uploading");
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/blog/media", {
      method: "POST",
      body: formData,
    });
    const body = (await response.json().catch(() => null)) as
      | { media?: { kind: "image"; src: string }; error?: string }
      | null;

    if (!response.ok || !body?.media) {
      setUploadState("error");
      setMessage(body?.error ?? "Inline blog image upload failed.");
      event.target.value = "";
      return;
    }

    updateBlock(blockId, { url: body.media.src });
    setUploadState("idle");
    setMessage("Inline image uploaded. Save blog to apply.");
    event.target.value = "";
  }

  async function uploadEditorImage(file: File): Promise<string | null> {
    setUploadState("uploading");
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/blog/media", {
      method: "POST",
      body: formData,
    });
    const body = (await response.json().catch(() => null)) as
      | { media?: { kind: "image"; src: string }; error?: string }
      | null;

    if (!response.ok || !body?.media) {
      setUploadState("error");
      setMessage(body?.error ?? "Inline blog image upload failed.");
      return null;
    }

    setUploadState("idle");
    setMessage("Inline image uploaded. Save blog to apply.");
    return body.media.src;
  }

  function handleRevert() {
    setBlog(cloneBlogStore(savedBlog));
    setActiveArticleId(savedBlog.journalArticles[0]?.id ?? "");
    setView("list");
    setSaveState("idle");
    setMessage("Unsaved blog changes reverted.");
  }

  function renderBlockEditor(block: AdminBlogBlock, index: number) {
    return (
      <article className="admin-blog-block-card" key={block.id}>
        <div className="admin-blog-block-top">
          <div>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{blockTypes.find((item) => item.type === block.type)?.label ?? "Block"}</strong>
          </div>
          <div>
            <button className="admin-secondary-button" type="button" onClick={() => moveBlock(block.id, -1)}>
              Up
            </button>
            <button className="admin-secondary-button" type="button" onClick={() => moveBlock(block.id, 1)}>
              Down
            </button>
            <button className="admin-secondary-button" type="button" onClick={() => duplicateBlock(block.id)}>
              Duplicate
            </button>
            <button className="admin-secondary-button" type="button" onClick={() => deleteBlock(block.id)}>
              Delete
            </button>
          </div>
        </div>

        {block.type === "heading" ? (
          <div className="admin-form-grid">
            <label className="admin-field">
              Heading text
              <input value={block.content} onChange={(event) => updateBlock(block.id, { content: event.target.value })} />
            </label>
            <label className="admin-field">
              Level
              <select
                value={block.level ?? 2}
                onChange={(event) => updateBlock(block.id, { level: Number(event.target.value) as 2 | 3 })}
              >
                <option value={2}>H2</option>
                <option value={3}>H3</option>
              </select>
            </label>
          </div>
        ) : null}

        {block.type === "paragraph" || block.type === "quote" || block.type === "embed" ? (
          <label className="admin-field">
            {block.type === "embed" ? "Embed/custom HTML" : "Content"}
            <textarea
              value={block.content}
              onChange={(event) => updateBlock(block.id, { content: event.target.value })}
            />
          </label>
        ) : null}

        {block.type === "image" ? (
          <div className="admin-form-stack">
            {block.url ? (
              <div className="admin-blog-cover-preview">
                <img src={block.url} alt={block.alt || block.caption || ""} />
              </div>
            ) : null}
            <label className="admin-field">
              Upload image
              <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event) => handleBlockImageUpload(block.id, event)} />
            </label>
            <label className="admin-field">
              Image URL
              <input value={block.url ?? ""} onChange={(event) => updateBlock(block.id, { url: event.target.value })} />
            </label>
            <div className="admin-form-grid">
              <label className="admin-field">
                Alt text
                <input value={block.alt ?? ""} onChange={(event) => updateBlock(block.id, { alt: event.target.value })} />
              </label>
              <label className="admin-field">
                Caption
                <input
                  value={block.caption ?? ""}
                  onChange={(event) => updateBlock(block.id, { caption: event.target.value })}
                />
              </label>
            </div>
          </div>
        ) : null}

        {block.type === "button" ? (
          <div className="admin-form-grid">
            <label className="admin-field">
              Button label
              <input value={block.label ?? ""} onChange={(event) => updateBlock(block.id, { label: event.target.value })} />
            </label>
            <label className="admin-field">
              Button href
              <input value={block.href ?? ""} onChange={(event) => updateBlock(block.id, { href: event.target.value })} />
            </label>
          </div>
        ) : null}

        {block.type === "divider" ? <p className="admin-blog-muted">Divider block has no editable content.</p> : null}
      </article>
    );
  }

  return (
    <main className="admin-dashboard admin-settings-page admin-blog-page" aria-labelledby="admin-blog-title">
      {backupPrompt ? (
        <div className="admin-blog-backup-banner" role="alert">
          <div>
            <strong>Unsaved draft found.</strong>
            <span>
              {" "}
              A local backup{backupPrompt.savedAt ? ` from ${new Date(backupPrompt.savedAt).toLocaleString("en-IN")}` : ""} has
              changes that were never saved. Restore it?
            </span>
          </div>
          <div>
            <button className="admin-primary-button" type="button" onClick={restoreBackup}>
              Restore draft
            </button>
            <button className="admin-secondary-button" type="button" onClick={discardBackup}>
              Discard
            </button>
          </div>
        </div>
      ) : null}

      <section className="admin-dashboard-hero admin-settings-hero">
        <div>
          <p className="admin-kicker">Blog publishing system</p>
          <h2 id="admin-blog-title">Manage posts, builder content, SEO, media and publishing state.</h2>
          <p>
            Blog Upload now works like a focused publishing desk: list, add, edit, schedule, preview and
            publish Journal articles from one admin surface.
          </p>
        </div>
        <div className="admin-status-panel" aria-label="Blog manager status">
          <span>Blog State</span>
          <dl>
            <div>
              <dt>Save status</dt>
              <dd>{dirty ? "Unsaved changes" : "Saved"}</dd>
            </div>
            <div>
              <dt>Updated</dt>
              <dd>{formatUpdatedAt(savedBlog.updatedAt)}</dd>
            </div>
            <div>
              <dt>Published</dt>
              <dd>{publishedCount} blogs</dd>
            </div>
            <div>
              <dt>Drafts</dt>
              <dd>{draftCount} drafts</dd>
            </div>
            <div>
              <dt>Scheduled</dt>
              <dd>{scheduledCount} scheduled</dd>
            </div>
            <div>
              <dt>Covers</dt>
              <dd>{coverCount} uploaded</dd>
            </div>
          </dl>
        </div>
      </section>

      {view === "list" ? (
        <section className="admin-panel admin-blog-list-panel">
          <div className="admin-blog-list-heading">
            <div>
              <p className="admin-kicker">Posts</p>
              <h2>Blog posts</h2>
            </div>
            <button className="admin-primary-button" type="button" onClick={handleCreateArticle}>
              Add New
            </button>
          </div>

          <div className="admin-blog-filters">
            <label className="admin-field">
              Search posts
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, slug, author" />
            </label>
            <label className="admin-field">
              Status
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}>
                <option value="all">All statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="archived">Archived</option>
              </select>
            </label>
            <label className="admin-field">
              Category
              <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
                <option value="all">All categories</option>
                {categories.map((category) => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
            <label className="admin-field">
              Sort
              <select value={sortMode} onChange={(event) => setSortMode(event.target.value as SortMode)}>
                <option value="updated-desc">Recently updated</option>
                <option value="date-desc">Publish date</option>
                <option value="title-asc">Title A-Z</option>
                <option value="status-asc">Status</option>
              </select>
            </label>
          </div>

          <div className="admin-blog-bulk-toolbar" aria-label="Bulk actions">
            <strong>{selectedArticleIds.length ? `${selectedArticleIds.length} selected` : "Select posts"}</strong>
            <label className="admin-field">
              Bulk action
              <select value={bulkAction} onChange={(event) => setBulkAction(event.target.value as BulkAction)}>
                <option value="">Choose action</option>
                <option value="publish">Publish</option>
                <option value="draft">Move to Draft</option>
                <option value="archive">Archive</option>
                <option value="delete">Delete permanently</option>
              </select>
            </label>
            <button className="admin-secondary-button" type="button" onClick={() => void applyBulkAction()} disabled={saveState === "saving"}>
              Apply
            </button>
            {selectedArticleIds.length ? <button className="admin-text-button" type="button" onClick={() => setSelectedArticleIds([])}>Clear selection</button> : null}
          </div>

          <div className="admin-blog-table" role="table" aria-label="Blog posts">
            <div className="admin-blog-table-head" role="row">
              <span className="admin-blog-select-cell">
                <input
                  ref={selectAllRef}
                  type="checkbox"
                  checked={allVisibleSelected}
                  onChange={toggleVisibleArticleSelection}
                  aria-label="Select all visible blog posts"
                />
              </span>
              <span>Title</span>
              <span>Slug</span>
              <span>Category</span>
              <span>Author</span>
              <span>Status</span>
              <span>Date</span>
              <span>SEO</span>
              <span>Image</span>
              <span>Actions</span>
            </div>
            {filteredArticles.length ? (
              filteredArticles.map((article) => (
                <article className="admin-blog-row" key={article.id} role="row">
                  <span className="admin-blog-select-cell">
                    <input
                      type="checkbox"
                      checked={selectedArticleIdSet.has(article.id)}
                      onChange={() => toggleArticleSelection(article.id)}
                      aria-label={`Select ${article.title}`}
                    />
                  </span>
                  <div className="admin-blog-title-cell">
                    <strong>{article.title}</strong>
                    <small>{article.excerpt || "No excerpt yet"}</small>
                  </div>
                  <code>{articleSlug(article)}</code>
                  <span>{article.category}</span>
                  <span>{article.author || "Shreevan Wellness"}</span>
                  <em className={`admin-page-status is-${article.status}`}>{statusLabel(article.status)}</em>
                  <span>{article.scheduledAt || article.publishedAt || article.date || "Not set"}</span>
                  <span>{indexLabel(article.indexStatus)}</span>
                  <span>{article.coverMedia?.src ? "Yes" : "No"}</span>
                  <div className="admin-blog-actions">
                    <button className="admin-secondary-button" type="button" onClick={() => handleEditArticle(article)}>
                      Edit
                    </button>
                    <a className="admin-secondary-button" href={previewHref(article)} target="_blank">
                      Preview
                    </a>
                    <button className="admin-secondary-button" type="button" onClick={() => archiveArticle(article.id)}>
                      Archive
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="admin-blog-empty">
                <strong>No blog posts match this view.</strong>
                <p>Create a new blog or adjust the filters.</p>
                <button className="admin-primary-button" type="button" onClick={handleCreateArticle}>
                  Add New
                </button>
              </div>
            )}
          </div>

          <div className="admin-settings-savebar">
            <div>
              <strong>{dirty ? "Unsaved blog changes" : "Blog list saved"}</strong>
              <p className={saveState === "error" ? "is-error" : undefined}>{message || "Archive changes require save."}</p>
            </div>
            <div>
              <button className="admin-secondary-button" type="button" onClick={handleRevert} disabled={!dirty}>
                Revert
              </button>
              <button className="admin-primary-button" type="button" onClick={() => void handleSave()} disabled={!dirty}>
                {saveState === "saving" ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </section>
      ) : null}

      {view === "editor" && activeArticle ? (
        <form className="admin-blog-editor" onSubmit={handleSave}>
          <div className="admin-blog-editor-head">
            <button className="admin-secondary-button" type="button" onClick={() => setView("list")}>
              Back to posts
            </button>
            <div>
              <strong>{dirty ? "Unsaved changes" : "Saved"}</strong>
              <span>{activeValidation || "Ready to save."}</span>
            </div>
          </div>

          <label className="admin-field admin-blog-title-input">
            Title of the Blog
            <input value={activeArticle.title} onChange={(event) => handleTitleChange(event.target.value)} />
          </label>

          <div className={SHOW_LEGACY_BLOCK_BUILDER ? "admin-blog-cms-grid" : "admin-blog-cms-grid admin-blog-cms-grid--rte"}>
            {SHOW_LEGACY_BLOCK_BUILDER ? (
              <>
                <aside className="admin-blog-builder-panel" aria-label="Drag and drop page builder">
                  <p className="admin-kicker">Page builder</p>
                  <h2>Blocks</h2>
                  <div className="admin-blog-block-palette">
                    {blockTypes.map((block) => (
                      <button type="button" key={block.type} onClick={() => addBlock(block.type)}>
                        <strong>{block.label}</strong>
                        <small>{block.copy}</small>
                      </button>
                    ))}
                  </div>
                  <p>
                    Reorder controls are active now. The block model is ready for a drag-and-drop library later
                    without changing saved content.
                  </p>
                </aside>

                <section className="admin-blog-content-canvas" aria-labelledby="blog-content-title">
                  <div className="admin-blog-canvas-heading">
                    <div>
                      <p className="admin-kicker">Blog content</p>
                      <h2 id="blog-content-title">Structured content</h2>
                    </div>
                    <span>{activeArticle.blocks?.length ?? 0} blocks</span>
                  </div>
                  <div className="admin-blog-block-list">
                    {activeArticle.blocks?.length ? (
                      activeArticle.blocks.map((block, index) => renderBlockEditor(block, index))
                    ) : (
                      <div className="admin-blog-empty">
                        <strong>No blocks yet.</strong>
                        <p>Add a paragraph or heading from the builder panel.</p>
                      </div>
                    )}
                  </div>
                </section>
              </>
            ) : (
              <section className="admin-blog-content-canvas admin-blog-rte-canvas" aria-labelledby="blog-content-title">
                <div className="admin-blog-canvas-heading">
                  <div>
                    <p className="admin-kicker">Blog content</p>
                    <h2 id="blog-content-title">Write your article</h2>
                  </div>
                </div>
                <RichTextEditor
                  documentKey={activeArticle.id}
                  value={activeArticle.contentHtml ?? ""}
                  onChange={(html) => updateActiveArticle({ contentHtml: html })}
                  onUploadImage={uploadEditorImage}
                />
              </section>
            )}

            <aside className="admin-blog-settings-sidebar" aria-label="Blog settings">
              <SettingsPanel title="Preview / Publish">
                <div className="admin-form-stack">
                  <a className="admin-secondary-button" href={previewHref(activeArticle)} target="_blank">
                    Preview on website
                  </a>
                  <label className="admin-field">
                    Status
                    <StatusSelect value={activeArticle.status} onChange={(status) => updateActiveArticle({ status })} />
                  </label>
                  <label className="admin-field">
                    Published at
                    <input
                      type="datetime-local"
                      value={activeArticle.publishedAt ?? ""}
                      onChange={(event) => updateActiveArticle({ publishedAt: event.target.value })}
                    />
                  </label>
                  <label className="admin-field">
                    Schedule date/time
                    <input
                      type="datetime-local"
                      value={activeArticle.scheduledAt ?? ""}
                      onChange={(event) => updateActiveArticle({ scheduledAt: event.target.value })}
                    />
                  </label>
                  <div className="admin-blog-panel-actions">
                    <button className="admin-secondary-button" type="button" onClick={() => void saveActiveWithPatch({ status: "draft" })}>
                      Save Draft
                    </button>
                    <button
                      className="admin-secondary-button"
                      type="button"
                      onClick={() =>
                        void saveActiveWithPatch({
                          status: "scheduled",
                          scheduledAt: activeArticle.scheduledAt || datetimeLocalNow(1440),
                        })
                      }
                    >
                      Schedule
                    </button>
                    <button
                      className="admin-primary-button"
                      type="button"
                      onClick={() => void saveActiveWithPatch({ status: "published", publishedAt: activeArticle.publishedAt || datetimeLocalNow() })}
                    >
                      Publish
                    </button>
                  </div>
                </div>
              </SettingsPanel>

              <SettingsPanel title="SEO">
                <div className="admin-form-stack">
                  <div className="admin-serp-preview" aria-label="Google search result preview">
                    <span className="admin-serp-url">
                      shreevanwellness.com › journal › {articleSlug(activeArticle)}
                    </span>
                    <span className="admin-serp-title">
                      {truncateForSerp(activeArticle.seoTitle || `${activeArticle.title} | Shreevan Journal`, SERP_TITLE_LIMIT)}
                    </span>
                    <span className="admin-serp-description">
                      {truncateForSerp(
                        activeArticle.seoDescription || activeArticle.excerpt || "Add a meta description or excerpt to control this preview.",
                        SERP_DESCRIPTION_LIMIT,
                      )}
                    </span>
                  </div>
                  <label className="admin-field">
                    Focus keyword
                    <input
                      value={activeArticle.focusKeyword ?? ""}
                      placeholder="e.g. 7 day wellness retreat rishikesh"
                      onChange={(event) => updateActiveArticle({ focusKeyword: event.target.value })}
                    />
                  </label>
                  <ul className="admin-seo-checklist" aria-label="SEO checklist">
                    {seoChecks.map((check) => (
                      <li key={check.id} className={`is-${check.status}`}>
                        <span aria-hidden="true">{check.status === "pass" ? "✓" : check.status === "fail" ? "✗" : "•"}</span>
                        <span>
                          {check.label}
                          {check.detail ? <small> — {check.detail}</small> : null}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <label className="admin-toggle-row admin-page-checkbox">
                    <input
                      type="checkbox"
                      checked={activeArticle.tocEnabled ?? true}
                      onChange={(event) => updateActiveArticle({ tocEnabled: event.target.checked })}
                    />
                    <span>Show table of contents (auto from H2/H3, needs 2+)</span>
                  </label>
                  <label className="admin-field">
                    Index status
                    <select
                      value={activeArticle.indexStatus ?? "index"}
                      onChange={(event) => updateActiveArticle({ indexStatus: event.target.value as AdminBlogIndexStatus })}
                    >
                      <option value="index">Index</option>
                      <option value="noindex">Noindex</option>
                    </select>
                  </label>
                  <label className="admin-field">
                    Meta title ({(activeArticle.seoTitle ?? "").length}/60)
                    <input
                      value={activeArticle.seoTitle ?? ""}
                      onChange={(event) => updateActiveArticle({ seoTitle: event.target.value })}
                    />
                  </label>
                  <label className="admin-field">
                    Meta description ({(activeArticle.seoDescription ?? "").length}/160)
                    <textarea
                      value={activeArticle.seoDescription ?? ""}
                      onChange={(event) => updateActiveArticle({ seoDescription: event.target.value })}
                    />
                  </label>
                  <label className="admin-field">
                    Slug
                    <input value={articleSlug(activeArticle)} onChange={(event) => handleSlugChange(event.target.value)} />
                  </label>
                  <label className="admin-field">
                    Canonical URL
                    <input
                      value={activeArticle.canonicalUrl ?? `/journal/${articleSlug(activeArticle)}`}
                      onChange={(event) => updateActiveArticle({ canonicalUrl: event.target.value })}
                    />
                  </label>
                </div>
              </SettingsPanel>

              <SettingsPanel title="Internal links" open={false}>
                <div className="admin-form-stack">
                  <p className="admin-blog-muted">
                    Link every article to a program, modality or the consultation page. Copy a path, select
                    text in the editor, then use the link button.
                  </p>
                  <ul className="admin-link-suggestions">
                    {linkSuggestions.map((item) => (
                      <li key={item.href} className={item.linked ? "is-linked" : undefined}>
                        <span>
                          {item.linked ? "✓ " : ""}
                          {item.label}
                        </span>
                        {item.linked ? (
                          <em>Linked</em>
                        ) : (
                          <button className="admin-secondary-button" type="button" onClick={() => void copyLinkSuggestion(item.href)}>
                            Copy
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </SettingsPanel>

              <SettingsPanel title="Article FAQ (schema)" open={false}>
                <div className="admin-form-stack">
                  <p className="admin-blog-muted">
                    2-3 short Q&amp;As render at the end of the article and emit FAQPage schema — strong for
                    AI Overviews and answer engines.
                  </p>
                  {(activeArticle.faqs ?? []).map((faq, index) => (
                    <div className="admin-article-faq-row" key={faq.id}>
                      <label className="admin-field">
                        Question {index + 1}
                        <input
                          value={faq.question}
                          onChange={(event) => updateArticleFaq(faq.id, { question: event.target.value })}
                        />
                      </label>
                      <label className="admin-field">
                        Answer
                        <textarea
                          rows={3}
                          value={faq.answer}
                          onChange={(event) => updateArticleFaq(faq.id, { answer: event.target.value })}
                        />
                      </label>
                      <button className="admin-secondary-button" type="button" onClick={() => removeArticleFaq(faq.id)}>
                        Remove question
                      </button>
                    </div>
                  ))}
                  <button className="admin-secondary-button" type="button" onClick={addArticleFaq}>
                    Add question
                  </button>
                </div>
              </SettingsPanel>

              <SettingsPanel title="Media">
                <div className="admin-form-stack">
                  <div className="admin-blog-cover-preview">
                    {cover.src ? <img src={cover.src} alt={cover.alt || activeArticle.title} /> : <span>Featured image</span>}
                  </div>
                  <label className="admin-field">
                    Featured image upload
                    <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleCoverUpload} />
                  </label>
                  <label className="admin-field">
                    Image alt text
                    <input value={cover.alt} onChange={(event) => updateActiveCover({ alt: event.target.value })} />
                  </label>
                  <label className="admin-field">
                    Image caption
                    <input value={cover.caption} onChange={(event) => updateActiveCover({ caption: event.target.value })} />
                  </label>
                  <label className="admin-field">
                    Image description
                    <textarea
                      value={cover.description ?? ""}
                      onChange={(event) => updateActiveCover({ description: event.target.value })}
                    />
                  </label>
                </div>
              </SettingsPanel>

              <SettingsPanel title="Taxonomy">
                <div className="admin-form-stack">
                  <label className="admin-field">
                    Category
                    <select
                      value={activeArticle.category}
                      onChange={(event) =>
                        updateActiveArticle({ category: event.target.value, categoryId: categoryId(event.target.value) })
                      }
                    >
                      {categories.map((category) => (
                        <option value={category} key={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="admin-field">
                    Author
                    <select
                      value={activeArticle.authorId ?? "admin"}
                      onChange={(event) => {
                        const author = authorOptions.find((item) => item.id === event.target.value);
                        updateActiveArticle({ authorId: event.target.value, author: author?.label ?? "Shreevan Wellness" });
                      }}
                    >
                      {authorOptions.map((author) => (
                        <option value={author.id} key={author.id}>
                          {author.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="admin-field">
                    Tags (comma separated — used as schema keywords)
                    <input
                      key={`tags-${activeArticle.id}`}
                      defaultValue={activeArticle.tags.join(", ")}
                      placeholder="rishikesh retreat, burnout reset, sattvic living"
                      onChange={(event) => updateActiveArticle({ tags: parseCommaList(event.target.value) })}
                    />
                  </label>
                  <label className="admin-field">
                    Key points (one per line — key takeaways for readers and AI search)
                    <textarea
                      key={`keypoints-${activeArticle.id}`}
                      defaultValue={linesToText(activeArticle.keyPoints)}
                      rows={4}
                      onChange={(event) => updateActiveArticle({ keyPoints: textToLines(event.target.value) })}
                    />
                  </label>
                  <label className="admin-toggle-row admin-page-checkbox">
                    <input
                      type="checkbox"
                      checked={activeArticle.featured}
                      onChange={(event) => updateActiveArticle({ featured: event.target.checked })}
                    />
                    <span>Use in editor picks</span>
                  </label>
                  <label className="admin-field">
                    Blog categories
                    <textarea
                      value={linesToText(blog.journalCategories)}
                      onChange={(event) =>
                        setBlog((current) => ({ ...current, journalCategories: textToLines(event.target.value) }))
                      }
                    />
                  </label>
                </div>
              </SettingsPanel>

              <SettingsPanel title="Redirect">
                <div className="admin-form-stack">
                  <label className="admin-toggle-row admin-page-checkbox">
                    <input
                      type="checkbox"
                      checked={activeArticle.redirectEnabled ?? false}
                      onChange={(event) => updateActiveArticle({ redirectEnabled: event.target.checked })}
                    />
                    <span>Enable redirect</span>
                  </label>
                  <label className="admin-field">
                    Redirect URL
                    <input
                      value={activeArticle.redirectUrl ?? ""}
                      onChange={(event) => updateActiveArticle({ redirectUrl: event.target.value })}
                    />
                  </label>
                  <label className="admin-field">
                    Redirect status
                    <select
                      value={activeArticle.redirectStatusCode ?? 301}
                      onChange={(event) =>
                        updateActiveArticle({ redirectStatusCode: Number(event.target.value) as AdminBlogRedirectStatusCode })
                      }
                    >
                      <option value={301}>301 permanent</option>
                      <option value={302}>302 temporary</option>
                    </select>
                  </label>
                </div>
              </SettingsPanel>

              <SettingsPanel title="Schema">
                <div className="admin-form-stack">
                  <label className="admin-field">
                    Manual schema JSON
                    <textarea
                      value={activeArticle.schemaJson ?? ""}
                      onChange={(event) => updateActiveArticle({ schemaJson: event.target.value })}
                    />
                  </label>
                  <p className={schemaMessage ? "admin-blog-error-text" : "admin-blog-muted"}>
                    {schemaMessage || "Optional JSON-LD. Leave empty to use the generated BlogPosting schema."}
                  </p>
                </div>
              </SettingsPanel>
            </aside>
          </div>

          <div className="admin-settings-savebar">
            <div>
              <strong>{dirty ? "Unsaved blog changes" : "Blog content saved"}</strong>
              <p className={saveState === "error" || uploadState === "error" || activeValidation ? "is-error" : undefined}>
                {uploadState === "uploading" ? "Uploading featured image..." : message || activeValidation || "Review before publishing."}
              </p>
            </div>
            <div>
              <button className="admin-secondary-button" type="button" onClick={() => archiveArticle()}>
                Archive
              </button>
              <button className="admin-secondary-button" type="button" onClick={handleRevert} disabled={!dirty}>
                Revert
              </button>
              <button className="admin-primary-button" type="submit" disabled={!dirty || saveState === "saving"}>
                {saveState === "saving" ? "Saving..." : "Save blog"}
              </button>
            </div>
          </div>
        </form>
      ) : null}

      <div className="admin-blog-footer-state" aria-live="polite">
        {archivedCount ? `${archivedCount} archived posts are hidden from public Journal.` : "No archived posts."}
      </div>
    </main>
  );
}
