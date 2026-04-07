import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

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

for (const entry of readdirSync(palettesRoot)) {
  const paletteDir = join(palettesRoot, entry);

  if (!statSync(paletteDir).isDirectory()) {
    continue;
  }

  const optionsPath = join(paletteDir, "src", "options.ts");
  const readmePath = join(paletteDir, "README.md");

  let optionsContent;
  let readmeContent;

  try {
    optionsContent = readFileSync(optionsPath, "utf8");
    readmeContent = readFileSync(readmePath, "utf8");
  } catch {
    continue;
  }

  const data = getPaletteData(optionsContent);

  if (!data || !colorsSectionPattern.test(readmeContent)) {
    continue;
  }

  const updatedReadmeContent = readmeContent.replace(colorsSectionPattern, buildColorsSection(data));

  if (updatedReadmeContent !== readmeContent) {
    writeFileSync(readmePath, updatedReadmeContent);
    updatedCount++;
  }
}

console.log(`Updated ${updatedCount} palette README files.`);
