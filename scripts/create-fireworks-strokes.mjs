#!/usr/bin/env node
/**
 * Creates stroke variants for all monochromatic fireworks palettes.
 * Run from the repo root: node palettes/scripts/create-fireworks-strokes.mjs
 */

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const palettesRoot = join(__dirname, "..", "palettes");

const VERSION = "4.0.0-alpha.5";

// ── Boilerplate (identical for all packages) ─────────────────────────────────

const BROWSERSLISTRC = "since 2021\nnot dead\n";

const LICENSE = `MIT License

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
  "front-end","frontend","tsparticles","particles.js","particlesjs","particles","particle","canvas",
  "jsparticles","xparticles","particles-js","particles-bg","particles-bg-vue","particles-ts",
  "particles.ts","react-particles-js","react-particles.js","react-particles","react","reactjs",
  "vue-particles","ngx-particles","angular-particles","particleground","vue","vuejs","preact",
  "preactjs","jquery","angularjs","angular","typescript","javascript","animation","web","html5",
  "web-design","webdesign","css","html","css3","animated","background","confetti","canvas",
  "fireworks","fireworks-js","confetti-js","confettijs","fireworksjs","canvas-confetti",
  "tsparticles-palette",
];

const FUNDING = [
  { type: "github", url: "https://github.com/sponsors/matteobruni" },
  { type: "github", url: "https://github.com/sponsors/tsparticles" },
  { type: "buymeacoffee", url: "https://www.buymeacoffee.com/matteobruni" },
];

// ── Template builders ─────────────────────────────────────────────────────────

function packageJson(p) {
  return {
    name: p.npmName,
    version: VERSION,
    description: `tsParticles ${p.description} palette`,
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
      directory: `palettes/fireworks/${p.dir}`,
    },
    keywords: SHARED_KEYWORDS,
    publishConfig: { directory: "dist", linkDirectory: true, access: "public" },
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
    dependencies: { "@tsparticles/engine": "^4.0.0-beta.11" },
    type: "module",
  };
}

function packageDistJson(p) {
  const { scripts, publishConfig: _pub, prettier: _pr, ...rest } = packageJson(p);
  return {
    ...rest,
    jsdelivr: `tsparticles.${p.moduleName}.min.js`,
    unpkg: `tsparticles.${p.moduleName}.min.js`,
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

function indexTs(p) {
  return `import { type Engine } from "@tsparticles/engine";

const paletteName = "${p.paletteName}";

/**
 * @param engine -
 */
export async function ${p.functionName}(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
`;
}

function optionsTs(p) {
  const layers = p.strokeLayers
    .map(layer => {
      const vals = layer.colors.map(c => `          "${c}",`).join("\n");
      return `    {
      stroke: {
        value: [
${vals}
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
  name: "${p.displayName}",
  background: "${p.background}",
  blendMode: "${p.blendMode}",
  colors: [
${layers}
  ],
};
`;
}

function webpackConfigJs(p) {
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
  moduleName: "${p.moduleName}",
  paletteName: "${p.webpackPaletteName}",
  version,
});
`;
}

function typedocJson(p) {
  return JSON.stringify({
    includes: "./markdown",
    entryPoints: ["./src/"],
    entryPointStrategy: "expand",
    name: p.typedocTitle,
    includeVersion: true,
    hideGenerator: true,
    out: "./docs",
    validation: { invalidLink: true, notDocumented: true },
  }, null, 4) + "\n";
}

function changelog(p) {
  return `# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [${VERSION}]

**Note:** Initial version of package ${p.npmName}
`;
}

function readme(p) {
  const slug = p.npmName.replace("@tsparticles/", "");
  return `[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# ${p.typedocTitle}

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/${p.npmName}/badge)](https://www.jsdelivr.com/package/npm/${p.npmName}) [![npmjs](https://badge.fury.io/js/${encodeURIComponent(p.npmName)}.svg)](https://www.npmjs.com/package/${p.npmName}) [![npmjs](https://img.shields.io/npm/dt/${encodeURIComponent(p.npmName)})](https://www.npmjs.com/package/${p.npmName}) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) palette for ${p.description}.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/palettes/main/palettes/fireworks/${p.dir}/images/sample.png)](https://particles.js.org/samples/palettes/${p.paletteName})

## Colors

See the palette source for stroke layer details.

## Quick checklist

1. Install \`@tsparticles/engine\` (or use the CDN bundle below)
2. Call the package loader function(s) before \`tsParticles.load(...)\`
3. Apply the package options in your \`tsParticles.load(...)\` config

## How to use it

### CDN / Vanilla JS / jQuery

\`\`\`html
<script src="https://cdn.jsdelivr.net/npm/${p.npmName}@4/tsparticles.${slug}.bundle.min.js"></script>
\`\`\`

### Usage

\`\`\`javascript
(async () => {
  await ${p.functionName}(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: { palette: "${p.paletteName}" },
  });
})();
\`\`\`

## Related docs

- Presets and palettes catalog: <https://github.com/tsparticles/palettes>
- Main docs: <https://particles.js.org/docs/>
`;
}

// ── Create a single package ───────────────────────────────────────────────────

function create(p) {
  const dir = join(palettesRoot, "fireworks", p.dir);

  if (existsSync(dir)) {
    console.log(`  ⚠  skipping (exists): fireworks/${p.dir}`);
    return false;
  }

  mkdirSync(join(dir, "src"), { recursive: true });
  mkdirSync(join(dir, "images"), { recursive: true });

  writeFileSync(join(dir, ".browserslistrc"), BROWSERSLISTRC);
  writeFileSync(join(dir, "eslint.config.js"), ESLINT_CONFIG);
  writeFileSync(join(dir, "LICENSE"), LICENSE);
  writeFileSync(join(dir, "tsconfig.json"), TSCONFIG_JSON);
  writeFileSync(join(dir, "tsconfig.base.json"), TSCONFIG_BASE_JSON);
  writeFileSync(join(dir, "tsconfig.browser.json"), TSCONFIG_BROWSER_JSON);
  writeFileSync(join(dir, "tsconfig.module.json"), TSCONFIG_MODULE_JSON);
  writeFileSync(join(dir, "tsconfig.types.json"), TSCONFIG_TYPES_JSON);
  writeFileSync(join(dir, "package.json"), JSON.stringify(packageJson(p), null, 2) + "\n");
  writeFileSync(join(dir, "package.dist.json"), JSON.stringify(packageDistJson(p), null, 2) + "\n");
  writeFileSync(join(dir, "src", "index.ts"), indexTs(p));
  writeFileSync(join(dir, "src", "options.ts"), optionsTs(p));
  writeFileSync(join(dir, "webpack.config.js"), webpackConfigJs(p));
  writeFileSync(join(dir, "typedoc.json"), typedocJson(p));
  writeFileSync(join(dir, "CHANGELOG.md"), changelog(p));
  writeFileSync(join(dir, "README.md"), readme(p));

  console.log(`  ✓  created: fireworks/${p.dir}  (${p.npmName})`);
  return true;
}

// ── Palette definitions ───────────────────────────────────────────────────────

const strokes = [
  {
    dir: "fireworksSilverStroke",
    npmName: "@tsparticles/palette-fireworks-silver-stroke",
    description: "fireworks silver stroke",
    displayName: "Fireworks - Silver Stroke",
    paletteName: "fireworks-silver-stroke",
    functionName: "loadFireworksSilverStrokePalette",
    moduleName: "palette-fireworks-silver-stroke",
    webpackPaletteName: "Fireworks Silver Stroke Palette",
    typedocTitle: "tsParticles Fireworks Silver Stroke Palette",
    background: "#000000",
    blendMode: "screen",
    strokeLayers: [
      { colors: ["#FFFFFF","#EEEEFF","#CCCCDD","#AAAACC","#8888BB"], widthMin: 0.6, widthMax: 1.8 },
      { colors: ["#EEEEFF","#CCCCDD","#AAAACC","#555577"], widthMin: 1.4, widthMax: 3.2 },
    ],
  },
  {
    dir: "fireworksBlueStroke",
    npmName: "@tsparticles/palette-fireworks-blue-stroke",
    description: "fireworks blue stroke",
    displayName: "Fireworks - Blue Stroke",
    paletteName: "fireworks-blue-stroke",
    functionName: "loadFireworksBlueStrokePalette",
    moduleName: "palette-fireworks-blue-stroke",
    webpackPaletteName: "Fireworks Blue Stroke Palette",
    typedocTitle: "tsParticles Fireworks Blue Stroke Palette",
    background: "#000011",
    blendMode: "screen",
    strokeLayers: [
      { colors: ["#FFFFFF","#CCDDFF","#88AAFF","#4477FF","#1144DD"], widthMin: 0.6, widthMax: 1.8 },
      { colors: ["#CCDDFF","#88AAFF","#4477FF","#002299"], widthMin: 1.4, widthMax: 3.2 },
    ],
  },
  {
    dir: "fireworksRedStroke",
    npmName: "@tsparticles/palette-fireworks-red-stroke",
    description: "fireworks red stroke",
    displayName: "Fireworks - Red Stroke",
    paletteName: "fireworks-red-stroke",
    functionName: "loadFireworksRedStrokePalette",
    moduleName: "palette-fireworks-red-stroke",
    webpackPaletteName: "Fireworks Red Stroke Palette",
    typedocTitle: "tsParticles Fireworks Red Stroke Palette",
    background: "#110000",
    blendMode: "screen",
    strokeLayers: [
      { colors: ["#FFFFFF","#FFDDCC","#FF9966","#FF4422","#CC1100"], widthMin: 0.6, widthMax: 1.8 },
      { colors: ["#FFDDCC","#FF9966","#FF4422","#880000"], widthMin: 1.4, widthMax: 3.2 },
    ],
  },
  {
    dir: "fireworksGreenStroke",
    npmName: "@tsparticles/palette-fireworks-green-stroke",
    description: "fireworks green stroke",
    displayName: "Fireworks - Green Stroke",
    paletteName: "fireworks-green-stroke",
    functionName: "loadFireworksGreenStrokePalette",
    moduleName: "palette-fireworks-green-stroke",
    webpackPaletteName: "Fireworks Green Stroke Palette",
    typedocTitle: "tsParticles Fireworks Green Stroke Palette",
    background: "#001100",
    blendMode: "screen",
    strokeLayers: [
      { colors: ["#FFFFFF","#CCFFDD","#88FFAA","#33FF66","#00CC33"], widthMin: 0.6, widthMax: 1.8 },
      { colors: ["#CCFFDD","#88FFAA","#33FF66","#007722"], widthMin: 1.4, widthMax: 3.2 },
    ],
  },
  {
    dir: "fireworksPurpleStroke",
    npmName: "@tsparticles/palette-fireworks-purple-stroke",
    description: "fireworks purple stroke",
    displayName: "Fireworks - Purple Stroke",
    paletteName: "fireworks-purple-stroke",
    functionName: "loadFireworksPurpleStrokePalette",
    moduleName: "palette-fireworks-purple-stroke",
    webpackPaletteName: "Fireworks Purple Stroke Palette",
    typedocTitle: "tsParticles Fireworks Purple Stroke Palette",
    background: "#060011",
    blendMode: "screen",
    strokeLayers: [
      { colors: ["#FFFFFF","#EEDDFF","#CC99FF","#AA55FF","#7700FF"], widthMin: 0.6, widthMax: 1.8 },
      { colors: ["#EEDDFF","#CC99FF","#AA55FF","#440088"], widthMin: 1.4, widthMax: 3.2 },
    ],
  },
  {
    dir: "fireworksCopperStroke",
    npmName: "@tsparticles/palette-fireworks-copper-stroke",
    description: "fireworks copper stroke",
    displayName: "Fireworks - Copper Stroke",
    paletteName: "fireworks-copper-stroke",
    functionName: "loadFireworksCopperStrokePalette",
    moduleName: "palette-fireworks-copper-stroke",
    webpackPaletteName: "Fireworks Copper Stroke Palette",
    typedocTitle: "tsParticles Fireworks Copper Stroke Palette",
    background: "#040100",
    blendMode: "screen",
    strokeLayers: [
      { colors: ["#FFFFFF","#FFEECC","#DDAA55","#BB7722","#883300"], widthMin: 0.6, widthMax: 1.8 },
      { colors: ["#FFEECC","#DDAA55","#BB7722","#551100"], widthMin: 1.4, widthMax: 3.2 },
    ],
  },
  {
    dir: "fireworksIceStroke",
    npmName: "@tsparticles/palette-fireworks-ice-stroke",
    description: "fireworks ice stroke",
    displayName: "Fireworks - Ice Stroke",
    paletteName: "fireworks-ice-stroke",
    functionName: "loadFireworksIceStrokePalette",
    moduleName: "palette-fireworks-ice-stroke",
    webpackPaletteName: "Fireworks Ice Stroke Palette",
    typedocTitle: "tsParticles Fireworks Ice Stroke Palette",
    background: "#010a14",
    blendMode: "screen",
    strokeLayers: [
      { colors: ["#FFFFFF","#E8F8FF","#AADDFF","#66BBFF","#2299FF"], widthMin: 0.6, widthMax: 1.8 },
      { colors: ["#E8F8FF","#AADDFF","#66BBFF","#0055CC"], widthMin: 1.4, widthMax: 3.2 },
    ],
  },
  {
    dir: "fireworksPastelStroke",
    npmName: "@tsparticles/palette-fireworks-pastel-stroke",
    description: "fireworks pastel stroke",
    displayName: "Fireworks - Pastel Stroke",
    paletteName: "fireworks-pastel-stroke",
    functionName: "loadFireworksPastelStrokePalette",
    moduleName: "palette-fireworks-pastel-stroke",
    webpackPaletteName: "Fireworks Pastel Stroke Palette",
    typedocTitle: "tsParticles Fireworks Pastel Stroke Palette",
    background: "#1a1a2e",
    blendMode: "screen",
    strokeLayers: [
      { colors: ["#FFD1DC","#FFE4B5","#FFFACD","#B5EAD7","#B5C8FF","#E8B5FF","#FFFFFF"], widthMin: 0.6, widthMax: 1.8 },
      { colors: ["#FFD1DC","#B5EAD7","#B5C8FF","#FFFFFF"], widthMin: 1.4, widthMax: 3.2 },
    ],
  },
  {
    dir: "fireworksNeonStroke",
    npmName: "@tsparticles/palette-fireworks-neon-stroke",
    description: "fireworks neon stroke",
    displayName: "Fireworks - Neon Stroke",
    paletteName: "fireworks-neon-stroke",
    functionName: "loadFireworksNeonStrokePalette",
    moduleName: "palette-fireworks-neon-stroke",
    webpackPaletteName: "Fireworks Neon Stroke Palette",
    typedocTitle: "tsParticles Fireworks Neon Stroke Palette",
    background: "#000000",
    blendMode: "lighter",
    strokeLayers: [
      { colors: ["#FF0088","#FF4400","#FFFF00","#00FF44","#00FFFF","#0088FF","#FF00FF","#AAFF00"], widthMin: 0.6, widthMax: 2.0 },
      { colors: ["#FF0088","#FFFF00","#00FFFF","#0088FF","#FF00FF"], widthMin: 1.4, widthMax: 3.5 },
    ],
  },
];

// ── Main ──────────────────────────────────────────────────────────────────────

console.log("\n🎆 Creating fireworks stroke variants...\n");
let created = 0;
for (const p of strokes) {
  if (create(p)) created++;
}
console.log(`\n✅ Done – ${created} new package(s) created.\n`);
console.log("Next steps:");
console.log("  1. pnpm i          (link new packages)");
console.log("  2. pnpm nx run-many -t build  (build all new packages)");
console.log("  3. node scripts/generate-samples.mjs --skip-existing\n");

