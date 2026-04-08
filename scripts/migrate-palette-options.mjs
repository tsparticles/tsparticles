import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";

const files = execSync(
  "find /Users/matteo/Projects/GitHub/tsparticles/palettes/palettes -name 'options.ts' | sort",
  { encoding: "utf8" }
)
  .trim()
  .split("\n")
  .filter(Boolean);

console.log(`Found ${files.length} files to migrate...`);

let updated = 0;
let skipped = 0;
let errors = 0;

for (const file of files) {
  try {
    let content = readFileSync(file, "utf8");

    // Skip already-migrated files (if colors is not a flat array)
    if (!content.includes("colors: [") && !content.includes("colors:[")) {
      console.log(`  SKIP (already migrated?): ${file}`);
      skipped++;
      continue;
    }

    // Extract fill value (default true if not present)
    const fillMatch = content.match(/\s*fill:\s*(true|false),?\s*\n/);
    const fillValue = fillMatch ? fillMatch[1] : "true";

    // Extract colors array content (handles multiline)
    const colorsMatch = content.match(/colors:\s*\[([\s\S]*?)\],?/);
    if (!colorsMatch) {
      console.warn(`  WARN: No colors array found in ${file}`);
      skipped++;
      continue;
    }

    // Re-indent the color values to 8 spaces
    const rawColors = colorsMatch[1];
    const colorLines = rawColors
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => `        ${line}`);

    const indentedColors = colorLines.join("\n");

    // Build new colors object with proper indentation
    const newColorsBlock = `colors: {\n    fill: {\n      enable: ${fillValue},\n      value: [\n${indentedColors}\n      ],\n    },\n  },`;

    // Remove the standalone fill: true/false line
    if (fillMatch) {
      content = content.replace(fillMatch[0], "\n");
    }

    // Replace colors: [...] with new object
    content = content.replace(/colors:\s*\[([\s\S]*?)\],?/, newColorsBlock);

    // Clean up excessive blank lines
    content = content.replace(/\n{3,}/g, "\n\n");

    writeFileSync(file, content, "utf8");
    console.log(`  OK: ${file.replace("/Users/matteo/Projects/GitHub/tsparticles/palettes/", "")}`);
    updated++;
  } catch (err) {
    console.error(`  ERROR: ${file} - ${err.message}`);
    errors++;
  }
}

console.log(`\nDone! Updated: ${updated}, Skipped: ${skipped}, Errors: ${errors}`);


