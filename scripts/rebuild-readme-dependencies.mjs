import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const presetsRoot = resolve("presets");

const dependencyRoles = {
  "@tsparticles/basic": "Base runtime bundle used by the preset",
  "@tsparticles/effect-shadow": "Adds glow/shadow rendering around particles",
  "@tsparticles/effect-trail": "Adds a fading trail effect behind particles",
  "@tsparticles/engine": "tsParticles engine and preset registration",
  "@tsparticles/interaction-external-cannon": "Adds cannon launch interaction",
  "@tsparticles/interaction-external-push": "Adds push interaction (click/tap spawn)",
  "@tsparticles/interaction-external-trail": "Adds pointer-driven trail interaction",
  "@tsparticles/interaction-particles-links": "Enables link interactions between particles",
  "@tsparticles/palette-confetti": "Default confetti color palette",
  "@tsparticles/palette-snowfall": "Default snowfall color palette",
  "@tsparticles/path-curves": "Moves particles along curved paths",
  "@tsparticles/plugin-emitters": "Spawns particles from configurable emitters",
  "@tsparticles/plugin-emitters-shape-square": "Adds square emitter areas for launches/bursts",
  "@tsparticles/plugin-hex-color": "Adds hex color parsing support",
  "@tsparticles/plugin-interactivity": "Enables external interaction plumbing",
  "@tsparticles/plugin-motion": "Handles reduced-motion accessibility settings",
  "@tsparticles/plugin-poisson-disc": "Applies Poisson-disc particle distribution",
  "@tsparticles/plugin-sounds": "Adds synchronized sound playback",
  "@tsparticles/plugin-trail": "Adds persistent canvas trail rendering",
  "@tsparticles/shape-line": "Adds line/spark particle shape",
  "@tsparticles/shape-matrix": "Adds matrix glyph particle shape",
  "@tsparticles/shape-square": "Adds square particle shape",
  "@tsparticles/updater-destroy": "Removes particles when their stage ends",
  "@tsparticles/updater-life": "Controls particle life-cycle stages",
  "@tsparticles/updater-paint": "Animates paint/fill color properties",
  "@tsparticles/updater-roll": "Adds rolling spin motion",
  "@tsparticles/updater-rotate": "Adds rotation animation",
  "@tsparticles/updater-size": "Animates particle size over time",
  "@tsparticles/updater-tilt": "Adds tilt animation",
  "@tsparticles/updater-wobble": "Adds side-to-side wobble motion",
};

const fallbackRole = "Runtime dependency used by this preset";

const entries = readdirSync(presetsRoot, { withFileTypes: true }).filter(entry => entry.isDirectory());

for (const entry of entries) {
  const presetDir = join(presetsRoot, entry.name),
    packageJsonPath = join(presetDir, "package.json"),
    readmePath = join(presetDir, "README.md");

  if (!existsSync(packageJsonPath) || !existsSync(readmePath)) {
    continue;
  }

  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8")),
    dependencies = Object.keys(packageJson.dependencies ?? {}).sort((a, b) => a.localeCompare(b));

  if (dependencies.length === 0) {
    continue;
  }

  const readme = readFileSync(readmePath, "utf8"),
    dependenciesStart = readme.indexOf("## Dependencies");

  if (dependenciesStart < 0) {
    continue;
  }

  const afterStart = dependenciesStart + 1;
  const nextHeadingMatch = /\n## [^\n]+/g;
  let nextHeadingIndex = -1;
  let match;

  nextHeadingMatch.lastIndex = afterStart;

  while ((match = nextHeadingMatch.exec(readme)) !== null) {
    if (match.index > dependenciesStart) {
      nextHeadingIndex = match.index + 1;
      break;
    }
  }

  const separatorIndex = readme.indexOf("\n---\n", afterStart);

  let dependenciesEnd = readme.length;

  if (nextHeadingIndex >= 0) {
    dependenciesEnd = nextHeadingIndex;
  }

  if (separatorIndex >= 0 && separatorIndex < dependenciesEnd) {
    dependenciesEnd = separatorIndex + 1;
  }

  const rows = dependencies
    .map(dep => `| \`${dep}\` | ${dependencyRoles[dep] ?? fallbackRole} | <https://www.npmjs.com/package/${dep}> |`)
    .join("\n");

  const section = [
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

  const updated = `${readme.slice(0, dependenciesStart)}${section}${readme.slice(dependenciesEnd)}`;

  writeFileSync(readmePath, updated);
  console.log(`rebuilt ${readmePath}`);
}

