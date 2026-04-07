import express from "express";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import stylus from "stylus";
import livereload from "livereload";
import connectLiveReload from "connect-livereload";

const liveReloadPort = 35731,
  expressPort = 3016;

const app = express();

const __filename = fileURLToPath(import.meta.url),
  __dirname = dirname(__filename),
  workspaceRoot = resolve(__dirname, "../.."),
  palettesRoot = resolve(workspaceRoot, "palettes");

const toTitleCase = value => value.replaceAll(/\b\w/g, char => char.toUpperCase());

const camelToKebab = value =>
  value
    .replaceAll(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replaceAll(/([A-Z]+)([A-Z][a-z0-9]+)/g, "$1-$2")
    .toLowerCase();

const toPascal = value => `${value[0].toUpperCase()}${value.slice(1)}`;

const parsePaletteName = folder => {
  const optionsPath = join(palettesRoot, folder, "src", "options.ts");

  if (!existsSync(optionsPath)) {
    return toTitleCase(camelToKebab(folder).replaceAll("-", " "));
  }

  const optionsContent = readFileSync(optionsPath, "utf8"),
    match = optionsContent.match(/name:\s*"([^"]+)"/);

  return match?.[1] ?? toTitleCase(camelToKebab(folder).replaceAll("-", " "));
};

const loadCatalog = ({ root, prefix, loaderSuffix, mode }) =>
  readdirSync(root, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort((a, b) => a.localeCompare(b))
    .map(folder => {
      const slug = mode === "palette" ? camelToKebab(folder) : folder,
        packageName = `@tsparticles/${prefix}-${camelToKebab(slug)}`,
        title = mode === "palette" ? parsePaletteName(folder) : toTitleCase(slug.replaceAll("-", " ")),
        loader = `load${toPascal(folder)}${loaderSuffix}`;

      return {
        id: folder,
        slug,
        title,
        packageName,
        mountPath: `/${prefix}-${slug}`,
        route: `/${mode === "palette" ? "palettes" : "presets"}/${folder}`,
        image: `/images/${mode === "palette" ? "palettes" : "presets"}/${folder}.png`,
        scriptFile:
          mode === "palette"
            ? `tsparticles.palette.palette-${slug}.min.js`
            : `tsparticles.preset.${slug}.bundle.min.js`,
        loader,
        optionValue: slug,
        description: `${title} ${mode} demo`,
      };
    });

const palettes = loadCatalog({
  root: palettesRoot,
  prefix: "palette",
  loaderSuffix: "Palette",
  mode: "palette",
});

const paletteGroupDefinitions = [
  {
    title: "Accessible & High Contrast",
    slugs: [
      "okabe-ito-accessible",
      "monochrome-noir",
      "rgb-primaries",
      "cmy-secondaries",
      "duality-blue-yellow",
      "duality-green-magenta",
      "duality-red-cyan",
      "sunset-binary",
      "crt-phosphor",
      "network-nodes",
    ],
  },
  {
    title: "Nature & Organic",
    slugs: [
      "autumn-leaves",
      "cherry-blossom",
      "forest-canopy",
      "spring-bloom",
      "dandelion-seeds",
      "pollen-and-spores",
      "fireflies",
      "skin-and-organic",
      "desert-sand",
      "mud-and-dirt",
      "rock-and-gravel",
      "rust-and-corrosion",
      "poison-and-venom",
    ],
  },
  {
    title: "Water, Ice & Weather",
    slugs: [
      "water",
      "water-splash",
      "deep-ocean",
      "caustics",
      "foam-and-bubbles",
      "rising-bubbles",
      "rain",
      "snowfall",
      "thunderstorm",
      "fog-coastal",
      "ice-magic",
      "ice-triad",
    ],
  },
  {
    title: "Fire, Heat & Energy",
    slugs: [
      "fire",
      "fire-seed",
      "full-fire-gradient",
      "heat-duality",
      "heat-haze",
      "lava-lamp",
      "molten-metal",
      "embers-and-ash",
      "explosion-debris",
      "metal-sparks",
      "shockwave",
      "solar-wind",
      "sunrise-gold",
      "candlelight",
      "holy-light",
      "lightning",
      "plasma-arc",
      "thermal-map",
    ],
  },
  {
    title: "Cosmic, Neon & Digital",
    slugs: [
      "aurora-borealis",
      "bioluminescence",
      "cosmic-radiation",
      "dark-matter",
      "galaxy-dust",
      "hologram",
      "jellyfish-glow",
      "lens-flare-dust",
      "portal",
      "prism-scatter",
      "pulsar",
      "supernova",
      "vaporwave",
      "neon-city",
      "matrix-rain",
      "glitch",
    ],
  },
  {
    title: "Smoke & Atmosphere",
    slugs: [
      "colored-smoke-magenta",
      "colored-smoke-teal",
      "smoke-cold",
      "smoke-warm",
      "ink-in-water",
      "fairy-dust",
      "lofi-warm",
    ],
  },
  {
    title: "Vivid & Celebration",
    slugs: [
      "confetti",
      "fireworks-gold",
      "fireworks-multicolor",
      "rainbow",
      "full-spectrum",
      "acid-pair",
      "oil-slick",
      "blood-and-gore",
    ],
  },
];

const paletteBySlug = new Map(palettes.map(item => [item.slug, item]));

const paletteGroups = paletteGroupDefinitions
  .map(group => ({
    ...group,
    items: group.slugs.map(slug => paletteBySlug.get(slug)).filter(Boolean),
  }))
  .filter(group => group.items.length > 0);

const groupedPaletteSlugs = new Set(paletteGroups.flatMap(group => group.items.map(item => item.slug)));
const uncategorizedPalettes = palettes.filter(item => !groupedPaletteSlugs.has(item.slug));

if (uncategorizedPalettes.length > 0) {
  paletteGroups.push({
    title: "Other",
    items: uncategorizedPalettes,
  });
}

const paletteMap = new Map(palettes.map(item => [item.id, item]));

const liveReloadServer = livereload.createServer({
  port: liveReloadPort,
});

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.use(
  connectLiveReload({
    port: liveReloadPort,
  }),
);

app.set("views", "./views");
app.set("view engine", "pug");
app.use(stylus.middleware("./public"));
app.use(express.static("./public"));
app.use("/docs", express.static("../../engine/docs"));
app.use("/fontawesome", express.static("./node_modules/@fortawesome/fontawesome-free"));
app.use("/jsoneditor", express.static("./node_modules/jsoneditor/dist"));
app.use("/jquery", express.static("./node_modules/jquery/dist"));
app.use("/lodash", express.static("./node_modules/lodash"));
app.use("/popper.js", express.static("./node_modules/@popperjs/core/dist"));
app.use("/bootstrap", express.static("./node_modules/bootstrap/dist"));
app.use("/tsparticles-basic", express.static("./node_modules/@tsparticles/basic/"));
app.use("/tsparticles-updater-stroke-color", express.static("./node_modules/@tsparticles/updater-stroke-color/"));
app.use("/stats.ts", express.static("./node_modules/stats.ts/"));
app.use("/tsparticles-basic", express.static("./node_modules/@tsparticles/basic"));

for (const item of palettes) {
  app.use(item.mountPath, express.static(`./node_modules/${item.packageName}`));
}

app.get("/", function (req, res) {
  res.render("index", { paletteGroups });
});

app.get("/palettes/:id", function (req, res) {
  const item = paletteMap.get(req.params.id);

  if (!item) {
    res.status(404).send("Palette not found");

    return;
  }

  res.render("palette", { item });
});

for (const item of palettes) {
  app.get(`/${item.id}`, function (req, res) {
    res.redirect(item.route);
  });
}

app.listen(expressPort, () => console.log(`Demo app listening on port ${expressPort}!`));
