#!/usr/bin/env node
import { cpSync, existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const rootDir = resolve(new URL("..", import.meta.url).pathname);
const typedocDist = resolve(rootDir, "typedoc-dist");
const publicDocs = resolve(rootDir, "docs", "public", "docs");
const oldDocs = resolve(rootDir, "docs", "docs");

if (!existsSync(typedocDist)) {
  console.log("[sync-typedoc] typedoc-dist not found, skipping");
  process.exit(0);
}

// Clean old TypeDoc markdown output (no longer needed)
if (existsSync(oldDocs)) {
  console.log("[sync-typedoc] removing old typedoc markdown output from docs/docs/");
  rmSync(oldDocs, { force: true, recursive: true });
}

// Copy TypeDoc HTML to VitePress public directory
rmSync(publicDocs, { force: true, recursive: true });
cpSync(typedocDist, publicDocs, { recursive: true });

console.log("[sync-typedoc] synced typedoc-dist → docs/public/docs");
