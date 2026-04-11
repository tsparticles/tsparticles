import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";

const files = execSync(
  "find /Users/matteo/Projects/GitHub/tsparticles/palettes/palettes -name 'options.ts' | sort",
  { encoding: "utf8" }
)
  .trim()
  .split("\n")
  .filter(Boolean);

console.log(`Found ${files.length} files to rewrite...`);

let updated = 0;

for (const file of files) {
  const content = readFileSync(file, "utf8");

  const importMatch = content.match(/^(import .+;\n)/);
  const importLine = importMatch
    ? importMatch[1]
    : `import { type IPalette } from "@tsparticles/engine";\n`;

  const nameMatch = content.match(/name:\s*"([^"]+)"/);
  const backgroundMatch = content.match(/background:\s*"([^"]+)"/);
  const blendModeMatch = content.match(/blendMode:\s*"([^"]+)"/);
  const enableMatch = content.match(/enable:\s*(true|false)/);
  // Extract the value array items (inside fill block)
  const valueMatch = content.match(/value:\s*\[([\s\S]*?)\s*\]/);

  if (!nameMatch || !backgroundMatch || !blendModeMatch || !enableMatch) {
    console.warn(`  WARN: Could not parse ${file}`);
    continue;
  }

  const name = nameMatch[1];
  const background = backgroundMatch[1];
  const blendMode = blendModeMatch[1];
  const enable = enableMatch[1] === "true";

  // Build the colors block:
  // - omit fill entirely if enable is false (fill?: undefined is the same as disabled)
  // - omit stroke entirely if width is 0 (no stroke in current palettes)
  let colorsBlock;

  if (!enable || !valueMatch) {
    // fill is disabled → omit fill entirely (fill?: undefined = disabled)
    colorsBlock = `  colors: {},`;
  } else {
    // fill is enabled → include fill with just value (enable is implicit/optional)
    const colorValues = valueMatch[1]
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => `        ${l}`)
      .join("\n");

    colorsBlock = `  colors: {
    fill: {
      enable: true,
      value: [
${colorValues}
      ],
    },
  },`;
  }

  const newContent = `${importLine}
export const options: IPalette = {
  name: "${name}",
  background: "${background}",
  blendMode: "${blendMode}",
${colorsBlock}
};
`;

  writeFileSync(file, newContent, "utf8");
  console.log(
    `  OK [fill=${enable}]: ${file.replace("/Users/matteo/Projects/GitHub/tsparticles/palettes/", "")}`
  );
  updated++;
}

console.log(`\nDone! Rewritten: ${updated}`);

