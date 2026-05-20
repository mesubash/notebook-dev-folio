#!/usr/bin/env node
// Prerender static HTML for the journal pages so link-preview crawlers
// (Facebook, WhatsApp, iMessage, LinkedIn, Slack, Discord, X) — which do
// not run JavaScript — see correct per-page Open Graph tags.
//
// This is an SPA: vercel.json rewrites every URL to /index.html, which only
// carries the homepage tags. For each journal entry (and the journal index)
// this clones dist/index.html and swaps the SEO marker block with per-page
// <title> + Open Graph + Twitter + canonical tags, writing
// dist/journal/<slug>/index.html. Vercel's filesystem check serves these
// real files before the SPA catch-all rewrite; the browser still boots the
// same SPA bundle, so runtime behaviour is unchanged.
//
// Runs after `vite build`. Run standalone: bun scripts/gen-prerender.mjs

import {
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const writingsDir = join(root, "src/content/writings");
const dist = join(root, "dist");

const base = "https://subashsdhami.com.np";
const siteName = "Subash Singh Dhami";
const ogImage = `${base}/og-image.png`;

// Keep in sync with the `description` constant in src/routes/journal.index.tsx
const journalDescription =
  "Notebook entries by Subash Singh Dhami — short essays on engineering, systems, and the thinking around them.";

function parseFrontmatter(raw) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
  if (!m) return {};
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    const k = line.slice(0, i).trim();
    let v = line.slice(i + 1).trim();
    if (v.startsWith("[") && v.endsWith("]")) {
      v = v
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      v = v.replace(/^["']|["']$/g, "");
    }
    meta[k] = v;
  }
  return meta;
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Build the replacement SEO block. `extra` holds any page-type-specific tags.
function seoBlock({ title, description, ogTitle, ogType, url, extra = [] }) {
  return [
    "<!-- SEO:start -->",
    `    <title>${esc(title)}</title>`,
    `    <meta name="description" content="${esc(description)}" />`,
    `    <meta property="og:title" content="${esc(ogTitle)}" />`,
    `    <meta property="og:description" content="${esc(description)}" />`,
    `    <meta property="og:type" content="${esc(ogType)}" />`,
    `    <meta property="og:url" content="${esc(url)}" />`,
    `    <meta property="og:image" content="${ogImage}" />`,
    `    <meta name="twitter:title" content="${esc(ogTitle)}" />`,
    `    <meta name="twitter:description" content="${esc(description)}" />`,
    `    <meta name="twitter:image" content="${ogImage}" />`,
    `    <link rel="canonical" href="${esc(url)}" />`,
    ...extra,
    "    <!-- SEO:end -->",
  ].join("\n");
}

const SEO_RE = /<!-- SEO:start[\s\S]*?SEO:end -->/;

const shell = readFileSync(join(dist, "index.html"), "utf8");
if (!SEO_RE.test(shell)) {
  console.error(
    "gen-prerender: SEO marker block not found in dist/index.html — " +
      "check the <!-- SEO:start --> / <!-- SEO:end --> comments in index.html.",
  );
  process.exit(1);
}

function emit(routePath, block) {
  const dir = join(dist, routePath);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), shell.replace(SEO_RE, block));
  return routePath;
}

const written = [];

// Journal index page.
written.push(
  emit(
    "journal",
    seoBlock({
      title: `Journal — ${siteName}`,
      description: journalDescription,
      ogTitle: `Journal — ${siteName}`,
      ogType: "website",
      url: `${base}/journal`,
    }),
  ),
);

// One page per journal entry.
const files = readdirSync(writingsDir).filter((f) => f.endsWith(".md"));
for (const f of files) {
  const meta = parseFrontmatter(readFileSync(join(writingsDir, f), "utf8"));
  const slug = meta.slug || f.replace(/\.md$/, "");
  const tags = Array.isArray(meta.tags) ? meta.tags : [];
  written.push(
    emit(
      `journal/${slug}`,
      seoBlock({
        title: `${meta.title || slug} — ${siteName}`,
        description: meta.excerpt || "",
        ogTitle: meta.title || slug,
        ogType: "article",
        url: `${base}/journal/${slug}`,
        extra: [
          `    <meta property="article:published_time" content="${esc(meta.date || "")}" />`,
          `    <meta property="article:tag" content="${esc(tags.join(", "))}" />`,
        ],
      }),
    ),
  );
}

console.log(`prerendered ${written.length} page(s): ${written.join(", ")}`);
