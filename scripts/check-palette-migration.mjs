import { readFileSync } from "fs";
import { execSync } from "child_process";

const files = execSync(
  "find /Users/matteo/Projects/GitHub/tsparticles/palettes/palettes -name options.ts",
  { encoding: "utf8" }
).trim().split("\n").filter(Boolean);

const withEnable = files.filter(f => readFileSync(f, "utf8").includes("enable:"));
const withFlatFill = files.filter(f => {
  const c = readFileSync(f, "utf8");
  return /^\s*fill:\s*(true|false)/m.test(c);
});
const withOldColors = files.filter(f => readFileSync(f, "utf8").includes("colors: ["));

console.log("Total files:", files.length);
console.log("Files with new format (enable:):", withEnable.length);
console.log("Files with old flat fill:", withFlatFill.length);
console.log("Files with old colors array:", withOldColors.length);

if (withFlatFill.length > 0) {
  console.log("\nFiles still with old format:");
  withFlatFill.forEach(f => console.log(" -", f));
}

