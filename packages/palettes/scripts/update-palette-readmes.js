import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const helpFlag = process.argv.includes("--help") || process.argv.includes("-h");

if (helpFlag) {
  console.log(`Usage: node scripts/update-palette-readmes.js

Updates the "## Colors" section in palette README files using each palette's src/options.ts.

Note: this script DOES NOT generate images.

Useful commands:
  pnpm generate:samples       Generate palettes/*/*/images/sample.png with Puppeteer
  pnpm sync:samples           Copy sample images into apps/demo/public/images/palettes
  pnpm generate:samples:all   Generate samples and sync demo images in one go
`);
  process.exit(0);
}

const palettesRoot = join(process.cwd(), "palettes");
const colorsSectionPattern = /## Colors\n\n[\s\S]*?## Quick checklist\n/;

const getPaletteData = (optionsContent) => {
  const colorsMatch = optionsContent.match(/colors:\s*\[(.*?)\]/s);
  const backgroundMatch = optionsContent.match(/background:\s*"([^"]+)"/);
  const blendModeMatch = optionsContent.match(/blendMode:\s*"([^"]+)"/);

  const fill = optionsContent.match(/fill:\s*true/)
    ? "true"
    : optionsContent.match(/fill:\s*false/)
      ? "false"
      : undefined;

  if (!colorsMatch || !backgroundMatch || !blendModeMatch || !fill) {
    return undefined;
  }

  const colors = [...colorsMatch[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]);

  return {
    background: backgroundMatch[1],
    blendMode: blendModeMatch[1],
    colors,
    fill,
  };
};

const buildSwatchSvg = (color, size) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${color}"><rect width="${size}" height="${size}" fill="${color}" /></svg>`;

const buildColorsSection = (data) => {
  const maxColumns = 5;
  const rows = [];

  for (let i = 0; i < data.colors.length; i += maxColumns) {
    rows.push(data.colors.slice(i, i + maxColumns));
  }

  const gridWidth = Math.max(...rows.map((row) => row.length), 1);
  const sectionLines = ["## Colors", "", "<table>", "  <tbody>"];

  for (const row of rows) {
    sectionLines.push("    <tr>");

    for (const color of row) {
      sectionLines.push("      <td align=\"center\">");
      sectionLines.push(`        ${buildSwatchSvg(color, 32)}<br />`);
      sectionLines.push(`        <code>${color}</code>`);
      sectionLines.push("      </td>");
    }

    sectionLines.push("    </tr>");
  }

  sectionLines.push("    <tr>");
  sectionLines.push(`      <td colspan=\"${gridWidth}\" align=\"center\">`);
  sectionLines.push(`        ${buildSwatchSvg(data.background, 40)}<br />`);
  sectionLines.push("        <strong>Background</strong><br />");
  sectionLines.push(`        <code>${data.background}</code>`);
  sectionLines.push("      </td>");
  sectionLines.push("    </tr>");

  sectionLines.push("    <tr>");
  sectionLines.push(`      <td colspan=\"${gridWidth}\" align=\"center\">`);
  sectionLines.push(
    `        <strong>Blend mode:</strong> <code>${data.blendMode}</code> | <strong>Fill:</strong> <code>${data.fill}</code>`,
  );
  sectionLines.push("      </td>");
  sectionLines.push("    </tr>");

  sectionLines.push("  </tbody>");
  sectionLines.push("</table>");
  sectionLines.push("");
  sectionLines.push("");

  return `${sectionLines.join("\n")}## Quick checklist\n`;
};

let updatedCount = 0;

const updatePaletteReadme = (paletteDir) => {
  const optionsPath = join(paletteDir, "src", "options.ts");
  const readmePath = join(paletteDir, "README.md");

  let optionsContent;
  let readmeContent;

  try {
    optionsContent = readFileSync(optionsPath, "utf8");
    readmeContent = readFileSync(readmePath, "utf8");
  } catch {
    return;
  }

  const data = getPaletteData(optionsContent);

  if (!data || !colorsSectionPattern.test(readmeContent)) {
    return;
  }

  const updatedReadmeContent = readmeContent.replace(colorsSectionPattern, buildColorsSection(data));

  if (updatedReadmeContent !== readmeContent) {
    writeFileSync(readmePath, updatedReadmeContent);
    updatedCount++;
  }
};

for (const entry of readdirSync(palettesRoot)) {
  const firstLevelDir = join(palettesRoot, entry);

  if (!statSync(firstLevelDir).isDirectory()) {
    continue;
  }

  // Legacy flat layout support: palettes/<palette>
  updatePaletteReadme(firstLevelDir);

  // New layout support: palettes/<category>/<palette>
  for (const nestedEntry of readdirSync(firstLevelDir)) {
    const paletteDir = join(firstLevelDir, nestedEntry);

    if (!statSync(paletteDir).isDirectory()) {
      continue;
    }

    updatePaletteReadme(paletteDir);
  }
}

console.log(`Updated ${updatedCount} palette README files.`);

if (updatedCount === 0) {
  console.log("No README changes detected. This command only updates color tables, not screenshots.");
  console.log("Use `pnpm generate:samples:all` to regenerate and sync all palette images.");
}

