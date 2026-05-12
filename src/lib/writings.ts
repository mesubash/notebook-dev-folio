import { marked } from "marked";

export type Writing = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  featured: boolean;
  tags: string[];
  readingTime: number;
  content: string;
};

const modules = import.meta.glob("../content/writings/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string): {
  meta: Record<string, unknown>;
  content: string;
} {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match) return { meta: {}, content: raw };
  const [, fm, body] = match;
  const meta: Record<string, unknown> = {};
  for (const line of fm.split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val: string | string[] | boolean | number = line.slice(idx + 1).trim();
    if (val.startsWith("[") && val.endsWith("]")) {
      val = val
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else if (val === "true") {
      val = true;
    } else if (val === "false") {
      val = false;
    } else {
      val = val.replace(/^["']|["']$/g, "");
    }
    meta[key] = val;
  }
  return { meta, content: body };
}

function estimateReadingTime(content: string): number {
  const words = content
    .replace(/```[\s\S]*?```/g, "")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 230));
}

function buildWritings(): Writing[] {
  const entries = Object.entries(modules).map(([path, raw]) => {
    const fallbackSlug = path.split("/").pop()!.replace(/\.md$/, "");
    const { meta, content } = parseFrontmatter(raw);
    return {
      slug: String(meta.slug ?? fallbackSlug),
      title: String(meta.title ?? fallbackSlug.replace(/-/g, " ")),
      date: String(meta.date ?? ""),
      excerpt: String(
        meta.excerpt ??
          content.slice(0, 160).replace(/[#*_`]/g, "") + "…",
      ),
      category: String(meta.category ?? "Notes"),
      featured: meta.featured === true,
      tags: Array.isArray(meta.tags) ? (meta.tags as string[]) : [],
      readingTime: estimateReadingTime(content),
      content,
    };
  });
  entries.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  return entries;
}

export const writings: Writing[] = buildWritings();

export function getWriting(slug: string): Writing | undefined {
  return writings.find((w) => w.slug === slug);
}

export function renderMarkdown(content: string): string {
  return marked.parse(content, { async: false }) as string;
}

export function formatWritingDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
