#!/usr/bin/env node
// Regenerate public/sitemap.xml from src/content/writings/*.md frontmatter.
// Run: bun scripts/gen-sitemap.mjs

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const writingsDir = join(root, "src/content/writings");
const out = join(root, "public/sitemap.xml");
const base = "https://subashsdhami.com.np";

function parseFrontmatter(raw) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
  if (!m) return {};
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    const k = line.slice(0, i).trim();
    let v = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
    meta[k] = v;
  }
  return meta;
}

const files = readdirSync(writingsDir).filter((f) => f.endsWith(".md"));
const entries = files.map((f) => {
  const raw = readFileSync(join(writingsDir, f), "utf8");
  const meta = parseFrontmatter(raw);
  const slug = meta.slug || f.replace(/\.md$/, "");
  return { slug, date: meta.date || "" };
});
entries.sort((a, b) => (b.date || "").localeCompare(a.date || ""));

const urls = [
  { loc: `${base}/`, changefreq: "monthly", priority: "1.0" },
  { loc: `${base}/journal`, changefreq: "weekly", priority: "0.8" },
  ...entries.map((e) => ({
    loc: `${base}/journal/${e.slug}`,
    lastmod: e.date,
    changefreq: "yearly",
    priority: "0.6",
  })),
];

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `  <url>\n` +
        `    <loc>${u.loc}</loc>\n` +
        (u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : "") +
        `    <changefreq>${u.changefreq}</changefreq>\n` +
        `    <priority>${u.priority}</priority>\n` +
        `  </url>`,
    )
    .join("\n") +
  `\n</urlset>\n`;

writeFileSync(out, xml);
console.log(`wrote ${out} (${urls.length} urls)`);
