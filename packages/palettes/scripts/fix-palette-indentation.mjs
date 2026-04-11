import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";

const files = execSync(
  "find /Users/matteo/Projects/GitHub/tsparticles/palettes/palettes -name 'options.ts' | sort",
  { encoding: "utf8" }
)
  .trim()
  .split("\n")
  .filter(Boolean);

console.log(`Found ${files.length} files to fix...`);

let updated = 0;
let skipped = 0;

for (const file of files) {
  const content = readFileSync(file, "utf8");

  // Only process already-migrated files
  if (!content.includes("colors: {")) {
    console.log(`  SKIP (not migrated): ${file}`);
    skipped++;
    continue;
  }

  // Match the value array inside fill block and re-indent
  const fixed = content.replace(
    /( +)value:\s*\[\n([\s\S]*?)\n( +)\]/g,
    (_match, indent, items, closeIndent) => {
      const fixedItems = items
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => `${indent}  ${line}`)
        .join("\n");
      return `${indent}value: [\n${fixedItems}\n${closeIndent}]`;
    }
  );

  // Also fix the closing brace of colors: { ... } to have a trailing comma
  // and remove extra closing brace issues like "};" at wrong place
  const finalContent = fixed
    // Normalize "  }" followed by newline + "};" into "  },\n};"
    .replace(/\n  \}\n\};/g, "\n  },\n};")
    // Remove double blank lines
    .replace(/\n{3,}/g, "\n\n");

  writeFileSync(file, finalContent, "utf8");
  console.log(`  OK: ${file.replace("/Users/matteo/Projects/GitHub/tsparticles/palettes/", "")}`);
  updated++;
}

console.log(`\nDone! Fixed: ${updated}, Skipped: ${skipped}`);

