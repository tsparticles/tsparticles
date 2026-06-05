#!/usr/bin/env node
/*
 ESM compatible script to replace malformed `utm_souce` -> `utm_source` in README.md files
 Excludes generated artifacts under `.vitepress/dist`

 Usage: node scripts/fix-utm.js
*/
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function isReadme(file) {
  return path.basename(file).toLowerCase() === "readme.md";
}

function walk(dir, callback) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (full.includes(path.join(".vitepress", "dist"))) {
      // skip generated docs
      continue;
    }
    if (e.isDirectory()) {
      walk(full, callback);
    } else if (e.isFile()) {
      callback(full);
    }
  }
}

const root = process.cwd();
let changed = 0;
let scanned = 0;

walk(root, (file) => {
  if (!isReadme(file)) return;
  scanned++;
  try {
    const content = fs.readFileSync(file, "utf8");
    if (content.indexOf("utm_souce") === -1) return;
    const updated = content.split("utm_souce").join("utm_source");
    if (updated !== content) {
      fs.writeFileSync(file, updated, "utf8");
      console.log(`Updated: ${path.relative(root, file)}`);
      changed++;
    }
  } catch (err) {
    console.error(`Failed ${file}: ${err.message}`);
  }
});

console.log(`Scanned README.md files: ${scanned}`);
console.log(`Files changed: ${changed}`);
if (changed === 0) process.exit(1);
