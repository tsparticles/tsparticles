#!/usr/bin/env node
/**
 * Generator script for new tsParticles palette packages.
 *
 * Creates:
 *  - palettes/fireworks/*  (new category + moves from celebration)
 *  - palettes/confetti/*   (new category + moves from celebration)
 *  - Additional palettes in impact, optics, atmosphere, monochromatic
 *
 * Run from the repo root:  node palettes/scripts/create-new-palettes.mjs
 */

import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const palettesRoot = join(__dirname, "..", "palettes");

const VERSION = "4.0.0-alpha.5";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const LICENSE_TEXT = `MIT License

Copyright (c) 2020 Matteo Bruni

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;

const BROWSERSLISTRC = "since 2021\nnot dead\n";

const ESLINT_CONFIG = `import tsParticlesESLintConfig from "@tsparticles/eslint-config";
import { defineConfig } from "eslint/config";

export default defineConfig([
    tsParticlesESLintConfig,
]);
`;

const TSCONFIG_JSON = `{
    "extends": ["./tsconfig.base.json", "@tsparticles/tsconfig/dist/tsconfig.json"],
    "compilerOptions": {
        "outDir": "./dist/cjs"
    }
}
`;
const TSCONFIG_BASE_JSON = `{
  "extends": "@tsparticles/tsconfig/dist/tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "./src"
  },
  "include": [
    "./src"
  ]
}
`;
const TSCONFIG_BROWSER_JSON = `{
    "extends": ["./tsconfig.base.json", "@tsparticles/tsconfig/dist/tsconfig.browser.json"],
    "compilerOptions": {
        "outDir": "./dist/browser"
    }
}
`;
const TSCONFIG_MODULE_JSON = `{
    "extends": ["./tsconfig.base.json", "@tsparticles/tsconfig/dist/tsconfig.module.json"],
    "compilerOptions": {
        "outDir": "./dist/esm"
    }
}
`;
const TSCONFIG_TYPES_JSON = `{
    "extends": ["./tsconfig.base.json", "@tsparticles/tsconfig/dist/tsconfig.types.json"],
    "compilerOptions": {
        "outDir": "./dist/types"
    }
}
`;

const SHARED_KEYWORDS = [
  "front-end",
  "frontend",
  "tsparticles",
  "particles.js",
  "particlesjs",
  "particles",
  "particle",
  "canvas",
  "jsparticles",
  "xparticles",
  "particles-js",
  "particles-bg",
  "particles-bg-vue",
  "particles-ts",
  "particles.ts",
  "react-particles-js",
  "react-particles.js",
  "react-particles",
  "react",
  "reactjs",
  "vue-particles",
  "ngx-particles",
  "angular-particles",
  "particleground",
  "vue",
  "vuejs",
  "preact",
  "preactjs",
  "jquery",
  "angularjs",
  "angular",
  "typescript",
  "javascript",
  "animation",
  "web",
  "html5",
  "web-design",
  "webdesign",
  "css",
  "html",
  "css3",
  "animated",
  "background",
  "confetti",
  "canvas",
  "fireworks",
  "fireworks-js",
  "confetti-js",
  "confettijs",
  "fireworksjs",
  "canvas-confetti",
  "tsparticles-palette",
];

const FUNDING = [
  { type: "github", url: "https://github.com/sponsors/matteobruni" },
  { type: "github", url: "https://github.com/sponsors/tsparticles" },
  { type: "buymeacoffee", url: "https://www.buymeacoffee.com/matteobruni" },
];

function buildPackageJson(pkg) {
  return {
    name: pkg.npmName,
    version: VERSION,
    description: `tsParticles ${pkg.description} palette`,
    homepage: "https://particles.js.org",
    scripts: {
      build: "tsparticles-cli build",
      "build:ci": "tsparticles-cli build --ci",
      version: "tsparticles-cli build -d && git add package.dist.json",
      prepack: "pnpm run build",
    },
    repository: {
      type: "git",
      url: "git+https://github.com/tsparticles/palettes.git",
      directory: `palettes/${pkg.category}/${pkg.dir}`,
    },
    keywords: [...SHARED_KEYWORDS, ...(pkg.extraKeywords ?? [])],
    publishConfig: {
      directory: "dist",
      linkDirectory: true,
      access: "public",
    },
    author: "Matteo Bruni <matteo.bruni@me.com>",
    license: "MIT",
    bugs: { url: "https://github.com/tsparticles/palettes/issues" },
    funding: FUNDING,
    sideEffects: false,
    browser: "dist/browser/index.js",
    main: "dist/cjs/index.js",
    module: "dist/esm/index.js",
    types: "dist/types/index.d.ts",
    exports: {
      ".": {
        types: "./dist/types/index.d.ts",
        browser: "./dist/browser/index.js",
        import: "./dist/esm/index.js",
        require: "./dist/cjs/index.js",
        umd: "./dist/umd/index.js",
        default: "./dist/cjs/index.js",
      },
      "./package.json": "./dist/package.json",
    },
    prettier: "@tsparticles/prettier-config",
    dependencies: {
      "@tsparticles/engine": "^4.0.0-beta.11",
    },
    type: "module",
  };
}

function buildPackageDistJson(pkg) {
  const base = buildPackageJson(pkg);
  const { scripts, publishConfig, prettier, ...rest } = base;

  return {
    ...rest,
    jsdelivr: `tsparticles.${pkg.moduleName}.min.js`,
    unpkg: `tsparticles.${pkg.moduleName}.min.js`,
    browser: "browser/index.js",
    main: "cjs/index.js",
    module: "esm/index.js",
    types: "types/index.d.ts",
    exports: {
      ".": {
        types: "./types/index.d.ts",
        browser: "./browser/index.js",
        import: "./esm/index.js",
        require: "./cjs/index.js",
        umd: "./umd/index.js",
        default: "./cjs/index.js",
      },
      "./package.json": "./package.json",
    },
    publishConfig: { access: "public" },
  };
}

function buildIndexTs(pkg) {
  return `import { type Engine } from "@tsparticles/engine";

const paletteName = "${pkg.paletteName}";

/**
 * @param engine -
 */
export async function ${pkg.functionName}(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
`;
}

function buildFillOptionsTs(pkg) {
  const colorsStr = pkg.colors.map(c => `        "${c}",`).join("\n");
  return `import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "${pkg.displayName}",
  background: "${pkg.background}",
  blendMode: "${pkg.blendMode}",
  colors: {
    fill: {
      enable: true,
      value: [
${colorsStr}
      ],
    },
  },
};
`;
}

function buildStrokeOptionsTs(pkg) {
  // pkg.strokeLayers = [{ colors: [...], widthMin, widthMax }]
  const layers = pkg.strokeLayers
    .map(layer => {
      const colorsStr = layer.colors.map(c => `          "${c}",`).join("\n");
      return `    {
      stroke: {
        value: [
${colorsStr}
        ],
        width: {
          min: ${layer.widthMin},
          max: ${layer.widthMax},
        },
      },
    },`;
    })
    .join("\n");

  return `import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "${pkg.displayName}",
  background: "${pkg.background}",
  blendMode: "${pkg.blendMode}",
  colors: [
${layers}
  ],
};
`;
}

function buildWebpackConfig(pkg) {
  return `import { loadParticlesPalette } from "@tsparticles/webpack-plugin";
import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises"
import path from "node:path";

const __filename = fileURLToPath(import.meta.url),
    __dirname = path.dirname(__filename),
    rootPkgPath = path.join(__dirname, "package.json"),
    pkg = JSON.parse(await readFile(rootPkgPath, "utf-8")),
    version = pkg.version;

export default loadParticlesPalette({
  dir: __dirname,
  moduleName: "${pkg.moduleName}",
  paletteName: "${pkg.webpackPaletteName}",
  version,
});
`;
}

function buildTypedocJson(pkg) {
  return JSON.stringify(
    {
      includes: "./markdown",
      entryPoints: ["./src/"],
      entryPointStrategy: "expand",
      name: pkg.typedocTitle,
      includeVersion: true,
      hideGenerator: true,
      out: "./docs",
      validation: {
        invalidLink: true,
        notDocumented: true,
      },
    },
    null,
    4,
  );
}

function buildChangelog(pkg) {
  return `# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [${VERSION}]

**Note:** Initial version of package ${pkg.npmName}
`;
}

function buildReadme(pkg) {
  const slugifiedName = pkg.npmName.replace("@tsparticles/", "");
  const loaderName = pkg.functionName;

  let colorsTable = "";

  if (pkg.colors) {
    const rows = [];
    for (let i = 0; i < pkg.colors.length; i += 5) {
      rows.push(pkg.colors.slice(i, i + 5));
    }
    const gridWidth = Math.max(...rows.map(r => r.length), 1);
    const rowsHtml = rows
      .map(
        row =>
          `    <tr>\n` +
          row
            .map(
              c =>
                `      <td align="center">\n        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${c}"><rect width="32" height="32" fill="${c}" /></svg><br />\n        <code>${c}</code>\n      </td>`,
            )
            .join("\n") +
          `\n    </tr>`,
      )
      .join("\n");

    colorsTable = `## Colors

<table>
  <tbody>
${rowsHtml}
    <tr>
      <td colspan="${gridWidth}" align="center">
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${pkg.background}"><rect width="40" height="40" fill="${pkg.background}" /></svg><br />
        <strong>Background</strong><br />
        <code>${pkg.background}</code>
      </td>
    </tr>
    <tr>
      <td colspan="${gridWidth}" align="center">
        <strong>Blend mode:</strong> <code>${pkg.blendMode}</code> | <strong>Fill:</strong> <code>true</code>
      </td>
    </tr>
  </tbody>
</table>

`;
  } else {
    colorsTable = `## Colors

See the palette source for stroke layer details.

`;
  }

  return `[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# ${pkg.typedocTitle}

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/${pkg.npmName}/badge)](https://www.jsdelivr.com/package/npm/${pkg.npmName}) [![npmjs](https://badge.fury.io/js/${encodeURIComponent(pkg.npmName)}.svg)](https://www.npmjs.com/package/${pkg.npmName}) [![npmjs](https://img.shields.io/npm/dt/${encodeURIComponent(pkg.npmName)})](https://www.npmjs.com/package/${pkg.npmName}) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) palette for ${pkg.description}.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/palettes/main/${pkg.category}/${pkg.dir}/images/sample.png)](https://particles.js.org/samples/palettes/${pkg.paletteName})

${colorsTable}## Quick checklist

1. Install \`@tsparticles/engine\` (or use the CDN bundle below)
2. Call the package loader function(s) before \`tsParticles.load(...)\`
3. Apply the package options in your \`tsParticles.load(...)\` config

## How to use it

### CDN / Vanilla JS / jQuery

\`\`\`html
<script src="https://cdn.jsdelivr.net/npm/${pkg.npmName}@4/tsparticles.${pkg.moduleName}.bundle.min.js"></script>
\`\`\`

### Usage

Once the scripts are loaded you can set up \`tsParticles\` like this:

\`\`\`javascript
(async () => {
  await ${loaderName}(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      palette: "${pkg.paletteName}",
    },
  });
})();
\`\`\`

#### Customization

**Important ⚠️**
You can override all the options defining the properties like in any standard \`tsParticles\` installation.

### Frameworks with a tsParticles component library

Checkout the documentation in the component library repository and call the \`${loaderName}\` function.

## Related docs

- Presets and palettes catalog: <https://github.com/tsparticles/palettes>
- Main docs: <https://particles.js.org/docs/>
`;
}

// ---------------------------------------------------------------------------
// Create a single palette package
// ---------------------------------------------------------------------------

function createPalette(pkg) {
  const dir = join(palettesRoot, pkg.category, pkg.dir);

  if (existsSync(dir)) {
    console.log(`  ⚠  skipping existing: ${pkg.category}/${pkg.dir}`);
    return;
  }

  mkdirSync(join(dir, "src"), { recursive: true });
  mkdirSync(join(dir, "images"), { recursive: true });

  writeFileSync(join(dir, ".browserslistrc"), BROWSERSLISTRC);
  writeFileSync(join(dir, "eslint.config.js"), ESLINT_CONFIG);
  writeFileSync(join(dir, "LICENSE"), LICENSE_TEXT);
  writeFileSync(join(dir, "tsconfig.json"), TSCONFIG_JSON);
  writeFileSync(join(dir, "tsconfig.base.json"), TSCONFIG_BASE_JSON);
  writeFileSync(join(dir, "tsconfig.browser.json"), TSCONFIG_BROWSER_JSON);
  writeFileSync(join(dir, "tsconfig.module.json"), TSCONFIG_MODULE_JSON);
  writeFileSync(join(dir, "tsconfig.types.json"), TSCONFIG_TYPES_JSON);

  writeFileSync(join(dir, "package.json"), JSON.stringify(buildPackageJson(pkg), null, 2) + "\n");
  writeFileSync(
    join(dir, "package.dist.json"),
    JSON.stringify(buildPackageDistJson(pkg), null, 2) + "\n",
  );

  writeFileSync(join(dir, "src", "index.ts"), buildIndexTs(pkg));
  if (pkg.strokeLayers) {
    writeFileSync(join(dir, "src", "options.ts"), buildStrokeOptionsTs(pkg));
  } else {
    writeFileSync(join(dir, "src", "options.ts"), buildFillOptionsTs(pkg));
  }

  writeFileSync(join(dir, "webpack.config.js"), buildWebpackConfig(pkg));
  writeFileSync(join(dir, "typedoc.json"), buildTypedocJson(pkg) + "\n");
  writeFileSync(join(dir, "CHANGELOG.md"), buildChangelog(pkg));
  writeFileSync(join(dir, "README.md"), buildReadme(pkg));

  console.log(`  ✓  created: ${pkg.category}/${pkg.dir}  (${pkg.npmName})`);
}

// ---------------------------------------------------------------------------
// Move an existing celebration palette to a new category
// ---------------------------------------------------------------------------

function movePalette(fromCategory, fromDir, toCategory, toDir, newDirectoryField) {
  const src = join(palettesRoot, fromCategory, fromDir);
  const dst = join(palettesRoot, toCategory, toDir);

  if (!existsSync(src)) {
    console.log(`  ⚠  source not found: ${fromCategory}/${fromDir} — skipping move`);
    return;
  }
  if (existsSync(dst)) {
    console.log(`  ⚠  destination exists: ${toCategory}/${toDir} — skipping move`);
    return;
  }

  mkdirSync(join(palettesRoot, toCategory), { recursive: true });
  cpSync(src, dst, { recursive: true });

  // Update package.json directory field
  for (const filename of ["package.json", "package.dist.json"]) {
    const pkgPath = join(dst, filename);
    if (existsSync(pkgPath)) {
      const raw = readFileSync(pkgPath, "utf8");
      const json = JSON.parse(raw);
      if (json.repository?.directory) {
        json.repository.directory = newDirectoryField;
      }
      writeFileSync(pkgPath, JSON.stringify(json, null, 2) + "\n");
    }
  }

  // Remove the old directory
  rmSync(src, { recursive: true, force: true });

  console.log(`  ↪  moved: ${fromCategory}/${fromDir}  →  ${toCategory}/${toDir}`);
}

// ---------------------------------------------------------------------------
// Palette definitions
// ---------------------------------------------------------------------------

const FIREWORKS_CATEGORY = "fireworks";
const CONFETTI_CATEGORY = "confetti";

const newPalettes = [
  // ── FIREWORKS: new mono variants ──────────────────────────────────────────
  {
    category: FIREWORKS_CATEGORY,
    dir: "fireworksSilver",
    npmName: "@tsparticles/palette-fireworks-silver",
    description: "fireworks silver",
    displayName: "Fireworks - Silver",
    paletteName: "fireworks-silver",
    functionName: "loadFireworksSilverPalette",
    moduleName: "palette-fireworks-silver",
    webpackPaletteName: "Fireworks Silver Palette",
    typedocTitle: "tsParticles Fireworks Silver Palette",
    background: "#000000",
    blendMode: "screen",
    colors: ["#FFFFFF", "#EEEEFF", "#CCCCDD", "#AAAACC", "#8888BB", "#555577", "#111133"],
  },
  {
    category: FIREWORKS_CATEGORY,
    dir: "fireworksBlue",
    npmName: "@tsparticles/palette-fireworks-blue",
    description: "fireworks blue",
    displayName: "Fireworks - Blue",
    paletteName: "fireworks-blue",
    functionName: "loadFireworksBluePalette",
    moduleName: "palette-fireworks-blue",
    webpackPaletteName: "Fireworks Blue Palette",
    typedocTitle: "tsParticles Fireworks Blue Palette",
    background: "#000011",
    blendMode: "screen",
    colors: ["#FFFFFF", "#CCDDFF", "#88AAFF", "#4477FF", "#1144DD", "#002299", "#001144"],
  },
  {
    category: FIREWORKS_CATEGORY,
    dir: "fireworksRed",
    npmName: "@tsparticles/palette-fireworks-red",
    description: "fireworks red",
    displayName: "Fireworks - Red",
    paletteName: "fireworks-red",
    functionName: "loadFireworksRedPalette",
    moduleName: "palette-fireworks-red",
    webpackPaletteName: "Fireworks Red Palette",
    typedocTitle: "tsParticles Fireworks Red Palette",
    background: "#110000",
    blendMode: "screen",
    colors: ["#FFFFFF", "#FFDDCC", "#FF9966", "#FF4422", "#CC1100", "#880000", "#330000"],
  },
  {
    category: FIREWORKS_CATEGORY,
    dir: "fireworksGreen",
    npmName: "@tsparticles/palette-fireworks-green",
    description: "fireworks green",
    displayName: "Fireworks - Green",
    paletteName: "fireworks-green",
    functionName: "loadFireworksGreenPalette",
    moduleName: "palette-fireworks-green",
    webpackPaletteName: "Fireworks Green Palette",
    typedocTitle: "tsParticles Fireworks Green Palette",
    background: "#001100",
    blendMode: "screen",
    colors: ["#FFFFFF", "#CCFFDD", "#88FFAA", "#33FF66", "#00CC33", "#007722", "#003311"],
  },
  {
    category: FIREWORKS_CATEGORY,
    dir: "fireworksPurple",
    npmName: "@tsparticles/palette-fireworks-purple",
    description: "fireworks purple",
    displayName: "Fireworks - Purple",
    paletteName: "fireworks-purple",
    functionName: "loadFireworksPurplePalette",
    moduleName: "palette-fireworks-purple",
    webpackPaletteName: "Fireworks Purple Palette",
    typedocTitle: "tsParticles Fireworks Purple Palette",
    background: "#060011",
    blendMode: "screen",
    colors: ["#FFFFFF", "#EEDDFF", "#CC99FF", "#AA55FF", "#7700FF", "#440088", "#110033"],
  },
  {
    category: FIREWORKS_CATEGORY,
    dir: "fireworksCopper",
    npmName: "@tsparticles/palette-fireworks-copper",
    description: "fireworks copper",
    displayName: "Fireworks - Copper",
    paletteName: "fireworks-copper",
    functionName: "loadFireworksCopperPalette",
    moduleName: "palette-fireworks-copper",
    webpackPaletteName: "Fireworks Copper Palette",
    typedocTitle: "tsParticles Fireworks Copper Palette",
    background: "#040100",
    blendMode: "screen",
    colors: ["#FFFFFF", "#FFEECC", "#DDAA55", "#BB7722", "#883300", "#551100", "#220800"],
  },
  // ── FIREWORKS: multi-color new variants ───────────────────────────────────
  {
    category: FIREWORKS_CATEGORY,
    dir: "fireworksPastel",
    npmName: "@tsparticles/palette-fireworks-pastel",
    description: "fireworks pastel",
    displayName: "Fireworks - Pastel",
    paletteName: "fireworks-pastel",
    functionName: "loadFireworksPastelPalette",
    moduleName: "palette-fireworks-pastel",
    webpackPaletteName: "Fireworks Pastel Palette",
    typedocTitle: "tsParticles Fireworks Pastel Palette",
    background: "#1a1a2e",
    blendMode: "screen",
    colors: [
      "#FFD1DC",
      "#FFE4B5",
      "#FFFACD",
      "#B5EAD7",
      "#B5C8FF",
      "#E8B5FF",
      "#FFC8C8",
      "#FFFFFF",
    ],
  },
  {
    category: FIREWORKS_CATEGORY,
    dir: "fireworksNeon",
    npmName: "@tsparticles/palette-fireworks-neon",
    description: "fireworks neon",
    displayName: "Fireworks - Neon",
    paletteName: "fireworks-neon",
    functionName: "loadFireworksNeonPalette",
    moduleName: "palette-fireworks-neon",
    webpackPaletteName: "Fireworks Neon Palette",
    typedocTitle: "tsParticles Fireworks Neon Palette",
    background: "#000000",
    blendMode: "lighter",
    colors: [
      "#FF0088",
      "#FF4400",
      "#FFFF00",
      "#00FF44",
      "#00FFFF",
      "#0088FF",
      "#FF00FF",
      "#AAFF00",
    ],
  },
  {
    category: FIREWORKS_CATEGORY,
    dir: "fireworksIce",
    npmName: "@tsparticles/palette-fireworks-ice",
    description: "fireworks ice",
    displayName: "Fireworks - Ice",
    paletteName: "fireworks-ice",
    functionName: "loadFireworksIcePalette",
    moduleName: "palette-fireworks-ice",
    webpackPaletteName: "Fireworks Ice Palette",
    typedocTitle: "tsParticles Fireworks Ice Palette",
    background: "#010a14",
    blendMode: "screen",
    colors: ["#FFFFFF", "#E8F8FF", "#AADDFF", "#66BBFF", "#2299FF", "#0055CC", "#001144"],
  },
  // ── FIREWORKS: stroke variant (new) ───────────────────────────────────────
  {
    category: FIREWORKS_CATEGORY,
    dir: "fireworksRainbowStroke",
    npmName: "@tsparticles/palette-fireworks-rainbow-stroke",
    description: "fireworks rainbow stroke",
    displayName: "Fireworks - Rainbow Stroke",
    paletteName: "fireworks-rainbow-stroke",
    functionName: "loadFireworksRainbowStrokePalette",
    moduleName: "palette-fireworks-rainbow-stroke",
    webpackPaletteName: "Fireworks Rainbow Stroke Palette",
    typedocTitle: "tsParticles Fireworks Rainbow Stroke Palette",
    background: "#000000",
    blendMode: "lighter",
    strokeLayers: [
      {
        colors: ["#FF0000", "#FF8800", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#FF00FF"],
        widthMin: 0.6,
        widthMax: 2.0,
      },
      {
        colors: ["#FF4400", "#FFCC00", "#00CC44", "#0088FF", "#CC00FF"],
        widthMin: 1.4,
        widthMax: 3.5,
      },
    ],
  },

  // ── CONFETTI: all variants ────────────────────────────────────────────────
  {
    category: CONFETTI_CATEGORY,
    dir: "confettiPastel",
    npmName: "@tsparticles/palette-confetti-pastel",
    description: "confetti pastel",
    displayName: "Confetti - Pastel",
    paletteName: "confetti-pastel",
    functionName: "loadConfettiPastelPalette",
    moduleName: "palette-confetti-pastel",
    webpackPaletteName: "Confetti Pastel Palette",
    typedocTitle: "tsParticles Confetti Pastel Palette",
    background: "#FFFFFF",
    blendMode: "source-over",
    colors: [
      "#FFB3C1",
      "#FFD59E",
      "#FFF4A0",
      "#B8F0B8",
      "#ADD8FF",
      "#D8B8FF",
      "#FFB3E6",
      "#B8FFF5",
    ],
  },
  {
    category: CONFETTI_CATEGORY,
    dir: "confettiGold",
    npmName: "@tsparticles/palette-confetti-gold",
    description: "confetti gold",
    displayName: "Confetti - Gold",
    paletteName: "confetti-gold",
    functionName: "loadConfettiGoldPalette",
    moduleName: "palette-confetti-gold",
    webpackPaletteName: "Confetti Gold Palette",
    typedocTitle: "tsParticles Confetti Gold Palette",
    background: "#0d0a00",
    blendMode: "source-over",
    colors: [
      "#FFDD00",
      "#FFAA00",
      "#FF8800",
      "#FF5500",
      "#FFEEAA",
      "#FFD700",
      "#FFC200",
      "#CC8800",
    ],
  },
  {
    category: CONFETTI_CATEGORY,
    dir: "confettiPatriotic",
    npmName: "@tsparticles/palette-confetti-patriotic",
    description: "confetti patriotic",
    displayName: "Confetti - Patriotic",
    paletteName: "confetti-patriotic",
    functionName: "loadConfettiPatrioticPalette",
    moduleName: "palette-confetti-patriotic",
    webpackPaletteName: "Confetti Patriotic Palette",
    typedocTitle: "tsParticles Confetti Patriotic Palette",
    background: "#FFFFFF",
    blendMode: "source-over",
    colors: [
      "#FF0000",
      "#EE1111",
      "#CC0000",
      "#0033BB",
      "#0055CC",
      "#0077EE",
      "#FFFFFF",
      "#EEEEEE",
    ],
  },
  {
    category: CONFETTI_CATEGORY,
    dir: "confettiNeon",
    npmName: "@tsparticles/palette-confetti-neon",
    description: "confetti neon",
    displayName: "Confetti - Neon",
    paletteName: "confetti-neon",
    functionName: "loadConfettiNeonPalette",
    moduleName: "palette-confetti-neon",
    webpackPaletteName: "Confetti Neon Palette",
    typedocTitle: "tsParticles Confetti Neon Palette",
    background: "#050505",
    blendMode: "screen",
    colors: [
      "#FF0088",
      "#FF4400",
      "#FFFF00",
      "#00FF44",
      "#00FFFF",
      "#0088FF",
      "#FF00FF",
      "#AAFF00",
    ],
  },
  {
    category: CONFETTI_CATEGORY,
    dir: "confettiRainbow",
    npmName: "@tsparticles/palette-confetti-rainbow",
    description: "confetti rainbow",
    displayName: "Confetti - Rainbow",
    paletteName: "confetti-rainbow",
    functionName: "loadConfettiRainbowPalette",
    moduleName: "palette-confetti-rainbow",
    webpackPaletteName: "Confetti Rainbow Palette",
    typedocTitle: "tsParticles Confetti Rainbow Palette",
    background: "#1a1a2e",
    blendMode: "source-over",
    colors: [
      "#FF0000",
      "#FF7700",
      "#FFFF00",
      "#00CC00",
      "#0000FF",
      "#8800FF",
      "#FF0099",
    ],
  },
  {
    category: CONFETTI_CATEGORY,
    dir: "confettiMonochromePink",
    npmName: "@tsparticles/palette-confetti-monochrome-pink",
    description: "confetti monochrome pink",
    displayName: "Confetti - Monochrome Pink",
    paletteName: "confetti-monochrome-pink",
    functionName: "loadConfettiMonochromePinkPalette",
    moduleName: "palette-confetti-monochrome-pink",
    webpackPaletteName: "Confetti Monochrome Pink Palette",
    typedocTitle: "tsParticles Confetti Monochrome Pink Palette",
    background: "#fff0f5",
    blendMode: "source-over",
    colors: [
      "#FF99BB",
      "#FF66AA",
      "#FF3388",
      "#CC1166",
      "#990044",
      "#FF0055",
      "#FFCCDD",
    ],
  },
  {
    category: CONFETTI_CATEGORY,
    dir: "confettiMonochromeBlue",
    npmName: "@tsparticles/palette-confetti-monochrome-blue",
    description: "confetti monochrome blue",
    displayName: "Confetti - Monochrome Blue",
    paletteName: "confetti-monochrome-blue",
    functionName: "loadConfettiMonochromeBluePalette",
    moduleName: "palette-confetti-monochrome-blue",
    webpackPaletteName: "Confetti Monochrome Blue Palette",
    typedocTitle: "tsParticles Confetti Monochrome Blue Palette",
    background: "#f0f4ff",
    blendMode: "source-over",
    colors: [
      "#99BBFF",
      "#6699FF",
      "#3366FF",
      "#1133CC",
      "#002299",
      "#0044FF",
      "#CCDDFF",
    ],
  },
  {
    category: CONFETTI_CATEGORY,
    dir: "confettiMonochromeGreen",
    npmName: "@tsparticles/palette-confetti-monochrome-green",
    description: "confetti monochrome green",
    displayName: "Confetti - Monochrome Green",
    paletteName: "confetti-monochrome-green",
    functionName: "loadConfettiMonochromeGreenPalette",
    moduleName: "palette-confetti-monochrome-green",
    webpackPaletteName: "Confetti Monochrome Green Palette",
    typedocTitle: "tsParticles Confetti Monochrome Green Palette",
    background: "#f0fff4",
    blendMode: "source-over",
    colors: [
      "#99FFB8",
      "#55EE88",
      "#22CC55",
      "#009933",
      "#006622",
      "#00FF44",
      "#CCFFDD",
    ],
  },
  {
    category: CONFETTI_CATEGORY,
    dir: "confettiWinter",
    npmName: "@tsparticles/palette-confetti-winter",
    description: "confetti winter",
    displayName: "Confetti - Winter",
    paletteName: "confetti-winter",
    functionName: "loadConfettiWinterPalette",
    moduleName: "palette-confetti-winter",
    webpackPaletteName: "Confetti Winter Palette",
    typedocTitle: "tsParticles Confetti Winter Palette",
    background: "#eaf4ff",
    blendMode: "source-over",
    colors: [
      "#FFFFFF",
      "#DDEEFF",
      "#AACCFF",
      "#88BBFF",
      "#FF9999",
      "#FFBBBB",
      "#99CCFF",
      "#CCEEFF",
    ],
  },

  // ── IMPACT: fill the gap (only had explosionDebris) ───────────────────────
  {
    category: "impact",
    dir: "bulletHit",
    npmName: "@tsparticles/palette-bullet-hit",
    description: "bullet hit impact",
    displayName: "Impact - Bullet Hit",
    paletteName: "bullet-hit",
    functionName: "loadBulletHitPalette",
    moduleName: "palette-bullet-hit",
    webpackPaletteName: "Bullet Hit Palette",
    typedocTitle: "tsParticles Bullet Hit Palette",
    background: "#0a0a0a",
    blendMode: "source-over",
    colors: [
      "#111111",
      "#444444",
      "#888888",
      "#CCCCCC",
      "#FFFFFF",
      "#FFAA44",
      "#FF6600",
    ],
  },
  {
    category: "impact",
    dir: "shockwaveBlast",
    npmName: "@tsparticles/palette-shockwave-blast",
    description: "shockwave blast impact",
    displayName: "Impact - Shockwave Blast",
    paletteName: "shockwave-blast",
    functionName: "loadShockwaveBlastPalette",
    moduleName: "palette-shockwave-blast",
    webpackPaletteName: "Shockwave Blast Palette",
    typedocTitle: "tsParticles Shockwave Blast Palette",
    background: "#000000",
    blendMode: "lighter",
    colors: [
      "#FFFFFF",
      "#FFFFCC",
      "#FFFF00",
      "#FFCC00",
      "#FF8800",
      "#FF4400",
      "#FFEECC",
    ],
  },
  {
    category: "impact",
    dir: "meteorImpact",
    npmName: "@tsparticles/palette-meteor-impact",
    description: "meteor impact",
    displayName: "Impact - Meteor",
    paletteName: "meteor-impact",
    functionName: "loadMeteorImpactPalette",
    moduleName: "palette-meteor-impact",
    webpackPaletteName: "Meteor Impact Palette",
    typedocTitle: "tsParticles Meteor Impact Palette",
    background: "#010104",
    blendMode: "source-over",
    colors: [
      "#FF6600",
      "#FF3300",
      "#CC2200",
      "#882200",
      "#441100",
      "#CCAA77",
      "#887744",
    ],
  },
  {
    category: "impact",
    dir: "glassBurst",
    npmName: "@tsparticles/palette-glass-burst",
    description: "glass burst impact",
    displayName: "Impact - Glass Burst",
    paletteName: "glass-burst",
    functionName: "loadGlassBurstPalette",
    moduleName: "palette-glass-burst",
    webpackPaletteName: "Glass Burst Palette",
    typedocTitle: "tsParticles Glass Burst Palette",
    background: "#111122",
    blendMode: "screen",
    colors: [
      "#FFFFFF",
      "#DDEEFF",
      "#AACCFF",
      "#88AACC",
      "#5577AA",
      "#334466",
      "#EEFFFF",
    ],
  },
  {
    category: "impact",
    dir: "splatterDark",
    npmName: "@tsparticles/palette-splatter-dark",
    description: "dark splatter impact",
    displayName: "Impact - Dark Splatter",
    paletteName: "splatter-dark",
    functionName: "loadSplatterDarkPalette",
    moduleName: "palette-splatter-dark",
    webpackPaletteName: "Dark Splatter Palette",
    typedocTitle: "tsParticles Dark Splatter Palette",
    background: "#050505",
    blendMode: "source-over",
    colors: [
      "#220000",
      "#440000",
      "#880000",
      "#AA1100",
      "#CC2200",
      "#111111",
      "#222222",
    ],
  },
  {
    category: "impact",
    dir: "nuclearGlow",
    npmName: "@tsparticles/palette-nuclear-glow",
    description: "nuclear glow impact",
    displayName: "Impact - Nuclear Glow",
    paletteName: "nuclear-glow",
    functionName: "loadNuclearGlowPalette",
    moduleName: "palette-nuclear-glow",
    webpackPaletteName: "Nuclear Glow Palette",
    typedocTitle: "tsParticles Nuclear Glow Palette",
    background: "#000a00",
    blendMode: "screen",
    colors: [
      "#AAFFAA",
      "#66FF66",
      "#33FF00",
      "#00CC00",
      "#FFFF00",
      "#AAFF00",
      "#FFFFFF",
    ],
  },

  // ── OPTICS: fill the gap (only had lensFlareDust) ─────────────────────────
  {
    category: "optics",
    dir: "bokehGold",
    npmName: "@tsparticles/palette-bokeh-gold",
    description: "bokeh gold optics",
    displayName: "Bokeh - Gold",
    paletteName: "bokeh-gold",
    functionName: "loadBokehGoldPalette",
    moduleName: "palette-bokeh-gold",
    webpackPaletteName: "Bokeh Gold Palette",
    typedocTitle: "tsParticles Bokeh Gold Palette",
    background: "#020100",
    blendMode: "color-dodge",
    colors: [
      "#FFDD88",
      "#FFCC44",
      "#FFAA00",
      "#FF8800",
      "#FFFFFF",
      "#FFEECC",
    ],
  },
  {
    category: "optics",
    dir: "prismSpectrum",
    npmName: "@tsparticles/palette-prism-spectrum",
    description: "prism spectrum optics",
    displayName: "Prism Spectrum",
    paletteName: "prism-spectrum",
    functionName: "loadPrismSpectrumPalette",
    moduleName: "palette-prism-spectrum",
    webpackPaletteName: "Prism Spectrum Palette",
    typedocTitle: "tsParticles Prism Spectrum Palette",
    background: "#000000",
    blendMode: "screen",
    colors: [
      "#FF0000",
      "#FF7700",
      "#FFFF00",
      "#00FF00",
      "#0000FF",
      "#4B0082",
      "#EE82EE",
    ],
  },
  {
    category: "optics",
    dir: "holographicShimmer",
    npmName: "@tsparticles/palette-holographic-shimmer",
    description: "holographic shimmer optics",
    displayName: "Holographic Shimmer",
    paletteName: "holographic-shimmer",
    functionName: "loadHolographicShimmerPalette",
    moduleName: "palette-holographic-shimmer",
    webpackPaletteName: "Holographic Shimmer Palette",
    typedocTitle: "tsParticles Holographic Shimmer Palette",
    background: "#050510",
    blendMode: "color-dodge",
    colors: [
      "#FF88FF",
      "#88FFFF",
      "#FFFF88",
      "#FF88CC",
      "#88CCFF",
      "#FFFFFF",
      "#CCAAFF",
    ],
  },
  {
    category: "optics",
    dir: "laserScatter",
    npmName: "@tsparticles/palette-laser-scatter",
    description: "laser scatter optics",
    displayName: "Laser Scatter",
    paletteName: "laser-scatter",
    functionName: "loadLaserScatterPalette",
    moduleName: "palette-laser-scatter",
    webpackPaletteName: "Laser Scatter Palette",
    typedocTitle: "tsParticles Laser Scatter Palette",
    background: "#000000",
    blendMode: "screen",
    colors: ["#FF0000", "#FF3300", "#FF6600", "#FFFFFF", "#FFCCCC"],
  },
  {
    category: "optics",
    dir: "bokehPastel",
    npmName: "@tsparticles/palette-bokeh-pastel",
    description: "bokeh pastel optics",
    displayName: "Bokeh - Pastel",
    paletteName: "bokeh-pastel",
    functionName: "loadBokehPastelPalette",
    moduleName: "palette-bokeh-pastel",
    webpackPaletteName: "Bokeh Pastel Palette",
    typedocTitle: "tsParticles Bokeh Pastel Palette",
    background: "#0a0010",
    blendMode: "color-dodge",
    colors: [
      "#FFCCFF",
      "#CCFFFF",
      "#FFFFCC",
      "#CCFFCC",
      "#FFFFFF",
      "#FFBBDD",
      "#BBDDFF",
    ],
  },
  {
    category: "optics",
    dir: "bokehCold",
    npmName: "@tsparticles/palette-bokeh-cold",
    description: "bokeh cold optics",
    displayName: "Bokeh - Cold",
    paletteName: "bokeh-cold",
    functionName: "loadBokehColdPalette",
    moduleName: "palette-bokeh-cold",
    webpackPaletteName: "Bokeh Cold Palette",
    typedocTitle: "tsParticles Bokeh Cold Palette",
    background: "#00010a",
    blendMode: "color-dodge",
    colors: [
      "#AACCFF",
      "#88AAFF",
      "#6688EE",
      "#4455CC",
      "#FFFFFF",
      "#DDEEFF",
    ],
  },

  // ── ATMOSPHERE: fill the gap (only had 2 colored smoke) ───────────────────
  {
    category: "atmosphere",
    dir: "coloredSmokeBlue",
    npmName: "@tsparticles/palette-colored-smoke-blue",
    description: "colored smoke blue",
    displayName: "Colored Smoke - Blue",
    paletteName: "colored-smoke-blue",
    functionName: "loadColoredSmokeBluePalette",
    moduleName: "palette-colored-smoke-blue",
    webpackPaletteName: "Colored Smoke Blue Palette",
    typedocTitle: "tsParticles Colored Smoke Blue Palette",
    background: "#020508",
    blendMode: "source-over",
    colors: [
      "#001133",
      "#002266",
      "#003399",
      "#1155CC",
      "#4488EE",
      "#88BBFF",
    ],
  },
  {
    category: "atmosphere",
    dir: "coloredSmokeGreen",
    npmName: "@tsparticles/palette-colored-smoke-green",
    description: "colored smoke green",
    displayName: "Colored Smoke - Green",
    paletteName: "colored-smoke-green",
    functionName: "loadColoredSmokeGreenPalette",
    moduleName: "palette-colored-smoke-green",
    webpackPaletteName: "Colored Smoke Green Palette",
    typedocTitle: "tsParticles Colored Smoke Green Palette",
    background: "#010802",
    blendMode: "source-over",
    colors: [
      "#001100",
      "#003300",
      "#005500",
      "#117722",
      "#33AA55",
      "#77DD88",
    ],
  },
  {
    category: "atmosphere",
    dir: "coloredSmokeOrange",
    npmName: "@tsparticles/palette-colored-smoke-orange",
    description: "colored smoke orange",
    displayName: "Colored Smoke - Orange",
    paletteName: "colored-smoke-orange",
    functionName: "loadColoredSmokeOrangePalette",
    moduleName: "palette-colored-smoke-orange",
    webpackPaletteName: "Colored Smoke Orange Palette",
    typedocTitle: "tsParticles Colored Smoke Orange Palette",
    background: "#080300",
    blendMode: "source-over",
    colors: [
      "#110500",
      "#330900",
      "#661500",
      "#AA3300",
      "#DD6600",
      "#FF9944",
    ],
  },
  {
    category: "atmosphere",
    dir: "coloredSmokePurple",
    npmName: "@tsparticles/palette-colored-smoke-purple",
    description: "colored smoke purple",
    displayName: "Colored Smoke - Purple",
    paletteName: "colored-smoke-purple",
    functionName: "loadColoredSmokePurplePalette",
    moduleName: "palette-colored-smoke-purple",
    webpackPaletteName: "Colored Smoke Purple Palette",
    typedocTitle: "tsParticles Colored Smoke Purple Palette",
    background: "#040010",
    blendMode: "source-over",
    colors: [
      "#110022",
      "#330055",
      "#550088",
      "#8811AA",
      "#BB33CC",
      "#EE77FF",
    ],
  },
  {
    category: "atmosphere",
    dir: "coloredSmokeRainbow",
    npmName: "@tsparticles/palette-colored-smoke-rainbow",
    description: "colored smoke rainbow",
    displayName: "Colored Smoke - Rainbow",
    paletteName: "colored-smoke-rainbow",
    functionName: "loadColoredSmokeRainbowPalette",
    moduleName: "palette-colored-smoke-rainbow",
    webpackPaletteName: "Colored Smoke Rainbow Palette",
    typedocTitle: "tsParticles Colored Smoke Rainbow Palette",
    background: "#050505",
    blendMode: "source-over",
    colors: [
      "#CC0000",
      "#CC6600",
      "#CCCC00",
      "#00CC00",
      "#0000CC",
      "#6600CC",
      "#CC00CC",
    ],
  },
  {
    category: "atmosphere",
    dir: "fogMorning",
    npmName: "@tsparticles/palette-fog-morning",
    description: "morning fog atmosphere",
    displayName: "Fog - Morning",
    paletteName: "fog-morning",
    functionName: "loadFogMorningPalette",
    moduleName: "palette-fog-morning",
    webpackPaletteName: "Fog Morning Palette",
    typedocTitle: "tsParticles Fog Morning Palette",
    background: "#d4dce8",
    blendMode: "source-over",
    colors: [
      "#E8EEF5",
      "#D4DCE8",
      "#C0CCDC",
      "#AABBD0",
      "#FFFFFF",
      "#F0F4FA",
    ],
  },
  {
    category: "atmosphere",
    dir: "dustHaze",
    npmName: "@tsparticles/palette-dust-haze",
    description: "dust haze atmosphere",
    displayName: "Dust Haze",
    paletteName: "dust-haze",
    functionName: "loadDustHazePalette",
    moduleName: "palette-dust-haze",
    webpackPaletteName: "Dust Haze Palette",
    typedocTitle: "tsParticles Dust Haze Palette",
    background: "#1a1200",
    blendMode: "source-over",
    colors: [
      "#443300",
      "#775500",
      "#AA8833",
      "#CCAA55",
      "#DDBB77",
      "#EED099",
    ],
  },
  {
    category: "atmosphere",
    dir: "volcanicAsh",
    npmName: "@tsparticles/palette-volcanic-ash",
    description: "volcanic ash atmosphere",
    displayName: "Volcanic Ash",
    paletteName: "volcanic-ash",
    functionName: "loadVolcanicAshPalette",
    moduleName: "palette-volcanic-ash",
    webpackPaletteName: "Volcanic Ash Palette",
    typedocTitle: "tsParticles Volcanic Ash Palette",
    background: "#080808",
    blendMode: "source-over",
    colors: [
      "#111111",
      "#333333",
      "#555555",
      "#777777",
      "#999999",
      "#BBBBBB",
      "#FF3300",
      "#FF6600",
    ],
  },

  // ── MONOCHROMATIC: additional shades ──────────────────────────────────────
  {
    category: "monochromatic",
    dir: "monochromeReds",
    npmName: "@tsparticles/palette-monochrome-reds",
    description: "monochrome reds",
    displayName: "Monochrome - Reds",
    paletteName: "monochrome-reds",
    functionName: "loadMonochromeRedsPalette",
    moduleName: "palette-monochrome-reds",
    webpackPaletteName: "Monochrome Reds Palette",
    typedocTitle: "tsParticles Monochrome Reds Palette",
    background: "#0d0000",
    blendMode: "source-over",
    colors: [
      "#FFDDDD",
      "#FF8888",
      "#FF3333",
      "#CC0000",
      "#880000",
      "#440000",
    ],
  },
  {
    category: "monochromatic",
    dir: "monochromeOranges",
    npmName: "@tsparticles/palette-monochrome-oranges",
    description: "monochrome oranges",
    displayName: "Monochrome - Oranges",
    paletteName: "monochrome-oranges",
    functionName: "loadMonochromeOrangesPalette",
    moduleName: "palette-monochrome-oranges",
    webpackPaletteName: "Monochrome Oranges Palette",
    typedocTitle: "tsParticles Monochrome Oranges Palette",
    background: "#0d0400",
    blendMode: "source-over",
    colors: [
      "#FFEEDD",
      "#FFCC88",
      "#FF8833",
      "#CC5500",
      "#882200",
      "#441100",
    ],
  },
  {
    category: "monochromatic",
    dir: "monochromeYellows",
    npmName: "@tsparticles/palette-monochrome-yellows",
    description: "monochrome yellows",
    displayName: "Monochrome - Yellows",
    paletteName: "monochrome-yellows",
    functionName: "loadMonochromeYellowsPalette",
    moduleName: "palette-monochrome-yellows",
    webpackPaletteName: "Monochrome Yellows Palette",
    typedocTitle: "tsParticles Monochrome Yellows Palette",
    background: "#0d0c00",
    blendMode: "source-over",
    colors: [
      "#FFFEDD",
      "#FFEE88",
      "#FFCC33",
      "#DDA000",
      "#886600",
      "#443300",
    ],
  },
  {
    category: "monochromatic",
    dir: "monochromeTeal",
    npmName: "@tsparticles/palette-monochrome-teal",
    description: "monochrome teal",
    displayName: "Monochrome - Teal",
    paletteName: "monochrome-teal",
    functionName: "loadMonochromeTealPalette",
    moduleName: "palette-monochrome-teal",
    webpackPaletteName: "Monochrome Teal Palette",
    typedocTitle: "tsParticles Monochrome Teal Palette",
    background: "#000d0c",
    blendMode: "source-over",
    colors: [
      "#DDFFF7",
      "#88FFEE",
      "#33DDCC",
      "#00AAAA",
      "#006666",
      "#003333",
    ],
  },
  {
    category: "monochromatic",
    dir: "monochromeBrown",
    npmName: "@tsparticles/palette-monochrome-brown",
    description: "monochrome brown",
    displayName: "Monochrome - Brown",
    paletteName: "monochrome-brown",
    functionName: "loadMonochromeBrownPalette",
    moduleName: "palette-monochrome-brown",
    webpackPaletteName: "Monochrome Brown Palette",
    typedocTitle: "tsParticles Monochrome Brown Palette",
    background: "#0a0600",
    blendMode: "source-over",
    colors: [
      "#F5DEB3",
      "#DEB887",
      "#CD853F",
      "#8B4513",
      "#5C3317",
      "#2F1B0A",
    ],
  },
  {
    category: "monochromatic",
    dir: "monochromeGold",
    npmName: "@tsparticles/palette-monochrome-gold",
    description: "monochrome gold",
    displayName: "Monochrome - Gold",
    paletteName: "monochrome-gold",
    functionName: "loadMonochromeGoldPalette",
    moduleName: "palette-monochrome-gold",
    webpackPaletteName: "Monochrome Gold Palette",
    typedocTitle: "tsParticles Monochrome Gold Palette",
    background: "#0a0700",
    blendMode: "source-over",
    colors: [
      "#FFF8E1",
      "#FFE082",
      "#FFD54F",
      "#FFCA28",
      "#FFB300",
      "#FF8F00",
    ],
  },
  {
    category: "monochromatic",
    dir: "monochromeWhite",
    npmName: "@tsparticles/palette-monochrome-white",
    description: "monochrome white",
    displayName: "Monochrome - White",
    paletteName: "monochrome-white",
    functionName: "loadMonochromeWhitePalette",
    moduleName: "palette-monochrome-white",
    webpackPaletteName: "Monochrome White Palette",
    typedocTitle: "tsParticles Monochrome White Palette",
    background: "#111111",
    blendMode: "source-over",
    colors: [
      "#FFFFFF",
      "#F5F5F5",
      "#E0E0E0",
      "#CCCCCC",
      "#AAAAAA",
      "#888888",
    ],
  },
  {
    category: "monochromatic",
    dir: "monochromeCyan",
    npmName: "@tsparticles/palette-monochrome-cyan",
    description: "monochrome cyan",
    displayName: "Monochrome - Cyan",
    paletteName: "monochrome-cyan",
    functionName: "loadMonochromeCyanPalette",
    moduleName: "palette-monochrome-cyan",
    webpackPaletteName: "Monochrome Cyan Palette",
    typedocTitle: "tsParticles Monochrome Cyan Palette",
    background: "#000d0d",
    blendMode: "source-over",
    colors: [
      "#DFFFFF",
      "#88FFFF",
      "#33EEEE",
      "#00AACC",
      "#006688",
      "#003344",
    ],
  },
];

// ---------------------------------------------------------------------------
// Packages to MOVE from celebration → dedicated categories
// ---------------------------------------------------------------------------

const toMove = [
  {
    fromCategory: "celebration",
    fromDir: "fireworksGold",
    toCategory: "fireworks",
    toDir: "fireworksGold",
    newDirectoryField: "palettes/fireworks/fireworksGold",
  },
  {
    fromCategory: "celebration",
    fromDir: "fireworksGoldStroke",
    toCategory: "fireworks",
    toDir: "fireworksGoldStroke",
    newDirectoryField: "palettes/fireworks/fireworksGoldStroke",
  },
  {
    fromCategory: "celebration",
    fromDir: "fireworksMulticolor",
    toCategory: "fireworks",
    toDir: "fireworksMulticolor",
    newDirectoryField: "palettes/fireworks/fireworksMulticolor",
  },
  {
    fromCategory: "celebration",
    fromDir: "fireworksMulticolorStroke",
    toCategory: "fireworks",
    toDir: "fireworksMulticolorStroke",
    newDirectoryField: "palettes/fireworks/fireworksMulticolorStroke",
  },
  {
    fromCategory: "celebration",
    fromDir: "confetti",
    toCategory: "confetti",
    toDir: "confetti",
    newDirectoryField: "palettes/confetti/confetti",
  },
];

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

console.log("\n🎨 tsParticles Palette Generator\n");

// Step 1: ensure new category dirs exist
for (const { toCategory } of toMove) {
  mkdirSync(join(palettesRoot, toCategory), { recursive: true });
}

// Step 2: move existing celebration packages
console.log("📦 Moving celebration packages...");
for (const m of toMove) {
  movePalette(m.fromCategory, m.fromDir, m.toCategory, m.toDir, m.newDirectoryField);
}

// Step 3: create new palettes
console.log("\n✨ Creating new palettes...");
for (const pkg of newPalettes) {
  createPalette(pkg);
}

console.log("\n✅ Done! Run `pnpm i` from the palettes root to link the new packages.\n");


