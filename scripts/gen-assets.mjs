#!/usr/bin/env node
// Regenerate raster favicon + OG image from the SVG sources.
// Run: bun scripts/gen-assets.mjs
// Requires `rsvg-convert` on PATH (brew install librsvg).

import { execSync } from "node:child_process";
import { existsSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import pngToIco from "png-to-ico";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");

const jobs = [
  { src: "og-image.svg", out: "og-image.png", w: 1200, h: 630 },
  { src: "favicon.svg", out: "apple-touch-icon.png", w: 180, h: 180 },
  { src: "favicon.svg", out: "favicon-48.png", w: 48, h: 48 },
  { src: "favicon.svg", out: "favicon-32.png", w: 32, h: 32 },
  { src: "favicon.svg", out: "favicon-16.png", w: 16, h: 16 },
];

for (const j of jobs) {
  const src = join(publicDir, j.src);
  const out = join(publicDir, j.out);
  if (!existsSync(src)) {
    console.error(`missing source: ${src}`);
    process.exit(1);
  }
  execSync(
    `rsvg-convert -w ${j.w} -h ${j.h} "${src}" -o "${out}"`,
    { stdio: "inherit" },
  );
  console.log(`wrote ${j.out} (${j.w}x${j.h})`);
}

// Bundle a real multi-resolution favicon.ico (16/32/48) for legacy clients
// that hit /favicon.ico directly regardless of <link rel="icon"> declarations.
const icoBuf = await pngToIco([
  join(publicDir, "favicon-16.png"),
  join(publicDir, "favicon-32.png"),
  join(publicDir, "favicon-48.png"),
]);
writeFileSync(join(publicDir, "favicon.ico"), icoBuf);
console.log(`wrote favicon.ico (16+32+48)`);
