import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const presetsRoot = resolve("presets");

const roleFromPackage = pkg => {
  if (pkg === "@tsparticles/engine") {
    return "Core engine runtime";
  }

  if (pkg === "@tsparticles/basic") {
    return "Base bundle with core features";
  }

  if (pkg === "@tsparticles/slim") {
    return "Slim bundle runtime";
  }

  if (pkg.includes("/palette-")) {
    return "Color palette used by the preset";
  }

  if (pkg.includes("/shape-")) {
    return "Additional particle shape";
  }

  if (pkg.includes("/plugin-")) {
    return "Runtime plugin extending behavior";
  }

  if (pkg.includes("/effect-")) {
    return "Visual effect package";
  }

  if (pkg.includes("/updater-")) {
    return "Particle updater module";
  }

  if (pkg.includes("/interaction-")) {
    return "Interaction module";
  }

  if (pkg.includes("/move-")) {
    return "Movement module";
  }

  return "Runtime dependency used by the preset";
};

const entries = readdirSync(presetsRoot, { withFileTypes: true }).filter(entry => entry.isDirectory());

for (const entry of entries) {
  const dir = join(presetsRoot, entry.name),
    pkgPath = join(dir, "package.json"),
    readmePath = join(dir, "README.md");

  if (!existsSync(pkgPath) || !existsSync(readmePath)) {
    continue;
  }

  const pkg = JSON.parse(readFileSync(pkgPath, "utf8")),
    deps = Object.keys(pkg.dependencies ?? {}).sort((a, b) => a.localeCompare(b));

  if (deps.length === 0) {
    continue;
  }

  const rows = deps
      .map(dep => `| \`${dep}\` | ${roleFromPackage(dep)} | <https://www.npmjs.com/package/${dep}> |`)
      .join("\n"),
    dependenciesSection = [
      "## Dependencies",
      "",
      "This preset loads and combines the following packages:",
      "",
      "| Package | Role in this preset | README |",
      "| --- | --- | --- |",
      rows,
      "",
      "If you want to customize one specific behavior, start from the related package README above.",
      "",
    ].join("\n");

  let readme = readFileSync(readmePath, "utf8");

  const dependenciesRegex = /## Dependencies[\s\S]*?(?=\n## [^\n]+|\n---\n|$)/m;

  if (dependenciesRegex.test(readme)) {
    readme = readme.replace(dependenciesRegex, `${dependenciesSection.trimEnd()}\n\n`);
  } else {
    const insertCandidates = ["\n## Common pitfalls\n", "\n## Related docs\n", "\n---\n"],
      insertIndex = insertCandidates
        .map(marker => readme.indexOf(marker))
        .filter(index => index >= 0)
        .sort((a, b) => a - b)[0];

    readme =
      insertIndex === undefined
        ? `${readme.trimEnd()}\n\n${dependenciesSection}`
        : `${readme.slice(0, insertIndex)}\n${dependenciesSection}${readme.slice(insertIndex)}`;
  }

  writeFileSync(readmePath, readme);
  console.log(`updated ${readmePath}`);
}

