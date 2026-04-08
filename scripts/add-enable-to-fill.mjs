import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";

const files = execSync(
  "find /Users/matteo/Projects/GitHub/tsparticles/palettes/palettes -name options.ts | sort",
  { encoding: "utf8" }
).trim().split("\n").filter(Boolean);

console.log(`Found ${files.length} files...`);
let updated = 0;

for (const file of files) {
  const content = readFileSync(file, "utf8");

  // If already has enable: true, skip
  if (content.includes("enable:")) {
    console.log(`  SKIP (already has enable): ${file.replace("/Users/matteo/Projects/GitHub/tsparticles/palettes/", "")}`);
    continue;
  }

  // If has fill block without enable, add enable: true after "fill: {"
  if (content.includes("fill: {")) {
    const fixed = content.replace(/(\s+fill: \{\n)(\s+value:)/, "$1      enable: true,\n$2");
    writeFileSync(file, fixed, "utf8");
    console.log(`  OK: ${file.replace("/Users/matteo/Projects/GitHub/tsparticles/palettes/", "")}`);
    updated++;
  } else {
    console.log(`  SKIP (no fill block): ${file.replace("/Users/matteo/Projects/GitHub/tsparticles/palettes/", "")}`);
  }
}

console.log(`\nDone! Updated: ${updated}`);

