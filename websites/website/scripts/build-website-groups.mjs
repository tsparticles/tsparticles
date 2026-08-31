#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");
const docsRoot = resolve(rootDir, "docs");
const distFinal = resolve(docsRoot, ".vitepress", "dist");
const groupRoot = resolve(rootDir, ".vitepress-build");

const localesAll = ["de", "es", "fr", "hi", "it", "ja", "pt", "ru", "zh"];
const rootContent = [
  "api",
  "demos",
  "guide",
  "guides",
  "migrations",
  "options",
  "playground",
  "showcase",
  "index.md",
  "cookie-policy.md",
  "privacy-policy.md",
];

const groups = [
  {
    name: "en",
    exclude: [...localesAll.map((l) => `${l}/**`)],
    localesOnly: false,
  },
  {
    name: "eu",
    exclude: [...rootContent, ...["pt", "ru", "zh", "ja", "hi"].map((l) => `${l}/**`)],
    localesOnly: true,
  },
  {
    name: "rest",
    exclude: [...rootContent, ...["it", "fr", "es", "de"].map((l) => `${l}/**`)],
    localesOnly: true,
  },
];

const heapSize = process.env.VITEPRESS_BUILD_HEAP || "3072";

mkdirSync(groupRoot, { recursive: true });

const dists = [];

for (const group of groups) {
  const outDir = resolve(groupRoot, `dist-${group.name}`);
  const env = {
    ...process.env,
    VITEPRESS_EXCLUDE: group.exclude.join(","),
    VITEPRESS_LOCALES_ONLY: group.localesOnly ? "true" : "false",
    NODE_OPTIONS: `--max-old-space-size=${heapSize}`,
  };

  rmSync(outDir, { force: true, recursive: true });

  console.log(`[build] group ${group.name} (${group.exclude.length} patterns)`);

  const start = Date.now();

  execFileSync(
    process.platform === "win32" ? "pnpm.cmd" : "pnpm",
    ["exec", "vitepress", "build", "docs", "--outDir", outDir],
    { cwd: rootDir, env, stdio: "inherit" },
  );

  console.log(`[build] group ${group.name} done in ${((Date.now() - start) / 1000).toFixed(1)}s`);

  dists.push(outDir);
}

mergeDists(dists);

function mergeDists(distPaths) {
  console.log("[merge] merging group outputs");

  rmSync(distFinal, { force: true, recursive: true });
  mkdirSync(distFinal, { recursive: true });

  for (const distPath of distPaths) {
    if (!existsSync(distPath)) {
      continue;
    }
    cpSync(distPath, distFinal, { recursive: true, force: true, dereference: false });
  }

  mergeHashmap(distPaths);
  mergeSitemap(distPaths);

  console.log(`[merge] merged ${distPaths.length} groups into ${distFinal}`);
}

function mergeHashmap(distPaths) {
  const merged = {};

  for (const distPath of distPaths) {
    const file = join(distPath, "hashmap.json");
    if (!existsSync(file)) {
      continue;
    }
    const current = JSON.parse(readFileSync(file, "utf8"));
    Object.assign(merged, current);
  }

  writeFileSync(join(distFinal, "hashmap.json"), JSON.stringify(merged), "utf8");
  console.log(`[merge] hashmap.json: ${Object.keys(merged).length} entries`);
}

function mergeSitemap(distPaths) {
  const urlSet = new Set();
  let header = "";

  for (const distPath of distPaths) {
    const file = join(distPath, "sitemap.xml");
    if (!existsSync(file)) {
      continue;
    }
    const content = readFileSync(file, "utf8");
    if (!header) {
      header = content.match(/<\?xml[\s\S]*?(?=<urlset>|<urls)/)?.[0] ?? "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
    }
    const urls = content.match(/<url>[\s\S]*?<\/url>/g) ?? [];
    for (const url of urls) {
      urlSet.add(url);
    }
  }

  if (urlSet.size === 0) {
    return;
  }

  const merged = `${header.trim()}\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...urlSet].join("\n")}\n</urlset>\n`;

  writeFileSync(join(distFinal, "sitemap.xml"), merged, "utf8");
  console.log(`[merge] sitemap.xml: ${urlSet.size} URLs`);
}