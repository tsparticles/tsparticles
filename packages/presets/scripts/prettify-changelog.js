import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const raw = readFileSync("RAW_RELEASE.md", "utf-8");
const lines = raw.split("\n");

function getPackageFromPath(filePath) {
  const parts = filePath.split("/");

  if (parts.length === 0) {
    return null;
  }

  if (parts[0] === "demo") {
    return null;
  }

  if (parts[0] === "apps") {
    return null;
  }

  if (parts[0] === "utils" && parts[1] === "tests") {
    return null;
  }

  if (parts[0] === "palettes" || parts[0] === "presets") {
    return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : null;
  }

  if (parts.length >= 2) {
    return `${parts[0]}/${parts[1]}`;
  }

  return null;
}

function getPackagesFromPR(prNumber) {
  try {
    const result = execSync(`gh pr view ${prNumber} --json files`, { encoding: "utf-8" });
    const files = JSON.parse(result).files;
    const packages = new Set();

    for (const file of files) {
      const pkg = getPackageFromPath(file.path);

      if (pkg) {
        packages.add(pkg);
      }
    }

    return [...packages];
  } catch (error) {
    console.warn(`Failed to fetch PR #${prNumber}:`, error.message);

    return [];
  }
}

let output = "";

for (const line of lines) {
  const match = line.match(/- (.+?) \(#(\d+)\)/);

  if (!match) {
    output += `${line}\n`;

    continue;
  }

  const [, text, prNumber] = match;
  const packages = getPackagesFromPR(prNumber);

  if (packages.length === 0) {
    output += `- ${text}\n`;
  } else {
    output += `- ${text} (${packages.join(", ")})\n`;
  }
}

writeFileSync("RELEASE_NOTES.md", output);

console.log("Changelog successfully enhanced with affected packages.");

