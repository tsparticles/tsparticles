#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const docsDir = new URL("../docs/docs", import.meta.url).pathname;

if (!existsSync(docsDir)) {
  console.log(`[escape-html-in-docs] Directory not found: ${docsDir}`);
  process.exit(0);
}

function walkDir(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      files.push(...walkDir(fullPath));
    } else if (fullPath.endsWith(".md")) {
      files.push(fullPath);
    }
  }
  return files;
}

const files = walkDir(docsDir);
let fixedCount = 0;

for (const file of files) {
  let content = readFileSync(file, "utf-8");
  const original = content;

  // Replace <svg> references in non-code blocks with `<svg>`
  let inCodeBlock = false;
  const lines = content.split("\n");
  const newLines = [];

  for (const line of lines) {
    const trimmed = line.trimStart();
    if (trimmed.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      newLines.push(line);
      continue;
    }

    if (!inCodeBlock) {
      const result = [];
      let i = 0;
      let inInlineCode = false;

      while (i < line.length) {
        if (line[i] === "`") {
          inInlineCode = !inInlineCode;
          result.push(line[i]);
          i++;
          continue;
        }

        if (!inInlineCode && line.slice(i, i + 5) === "<svg>") {
          result.push("`<svg>`");
          i += 5;
        } else {
          result.push(line[i]);
          i++;
        }
      }

      newLines.push(result.join(""));
    } else {
      newLines.push(line);
    }
  }

  content = newLines.join("\n");

  // Replace dead localhost links with the actual production URL
  content = content.replace(/<http:\/\/localhost:3000>/g, "https://particles.js.org");

  if (content !== original) {
    writeFileSync(file, content, "utf-8");
    fixedCount++;
  }
}

console.log(`[escape-html-in-docs] Fixed ${fixedCount} files`);
