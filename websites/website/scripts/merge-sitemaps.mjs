#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const rootDir = resolve(new URL("..", import.meta.url).pathname);
const distDir = resolve(rootDir, "docs", ".vitepress", "dist");
const mainSitemap = resolve(distDir, "sitemap.xml");
const typedocSitemap = resolve(distDir, "docs", "sitemap.xml");

if (!existsSync(mainSitemap)) {
  console.log("[merge-sitemaps] main sitemap not found, skipping");
  process.exit(0);
}

if (!existsSync(typedocSitemap)) {
  console.log("[merge-sitemaps] typedoc sitemap not found, skipping");
  process.exit(0);
}

const main = readFileSync(mainSitemap, "utf-8");
const typedoc = readFileSync(typedocSitemap, "utf-8");

const urlEntries = typedoc.match(/<url>[\s\S]*?<\/url>/g);

if (!urlEntries || urlEntries.length === 0) {
  console.log("[merge-sitemaps] no typedoc URLs found, skipping");
  process.exit(0);
}

const merged = main.replace("</urlset>", urlEntries.join("\n") + "\n</urlset>");

writeFileSync(mainSitemap, merged, "utf-8");

console.log(
  `[merge-sitemaps] merged ${urlEntries.length} typedoc URLs into sitemap.xml`,
);
