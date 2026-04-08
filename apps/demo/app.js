import express from "express";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import stylus from "stylus";
import livereload from "livereload";
import connectLiveReload from "connect-livereload";

const liveReloadPort = Number.parseInt(process.env.LIVE_RELOAD_PORT ?? "35731", 10),
  expressPort = Number.parseInt(process.env.PORT ?? "3016", 10);

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

const parsePaletteName = (fullPath, folder) => {
  const optionsPath = join(fullPath, "src", "options.ts");

  if (!existsSync(optionsPath)) {
    return toTitleCase(camelToKebab(folder).replaceAll("-", " "));
  }

  const optionsContent = readFileSync(optionsPath, "utf8"),
    match = optionsContent.match(/name:\s*"([^"]+)"/);

  return match?.[1] ?? toTitleCase(camelToKebab(folder).replaceAll("-", " "));
};

const parsePaletteScriptFile = (fullPath, slug) => {
  const distPath = join(fullPath, "dist"),
    defaultScriptFile = `tsparticles.palette.palette-${slug}.min.js`;

  if (!existsSync(distPath)) {
    return defaultScriptFile;
  }

  const generatedScript = readdirSync(distPath).find(file =>
    /^tsparticles\.palette\..+\.min\.js$/u.test(file),
  );

  return generatedScript ?? defaultScriptFile;
};

const hasPaletteOptions = path => existsSync(join(path, "src", "options.ts"));

const isDirectoryEntry = entry => entry.isDirectory();

const toPaletteDir = (parentPath, entry) => ({
  folder: entry.name,
  fullPath: join(parentPath, entry.name),
});

const isPaletteDir = ({ fullPath }) => hasPaletteOptions(fullPath);

// eslint-disable-next-line sonarjs/cognitive-complexity
const collectNestedPaletteDirs = path =>
  readdirSync(path, { withFileTypes: true })
    .filter(isDirectoryEntry)
    .map(entry => toPaletteDir(path, entry))
    .filter(isPaletteDir);

const getPaletteDirsFromEntry = (root, entry) => {
  const fullPath = join(root, entry.name);

  return hasPaletteOptions(fullPath)
    ? [{ folder: entry.name, fullPath }]
    : collectNestedPaletteDirs(fullPath);
};

/**
 * Discovers all palette directories under `root`, supporting both:
 *   - legacy flat layout:    palettes/<palette>/src/options.ts
 *   - new category layout:   palettes/<category>/<palette>/src/options.ts
 */
const discoverPaletteDirs = root => {
  return readdirSync(root, { withFileTypes: true })
    .filter(isDirectoryEntry)
    .flatMap(entry => getPaletteDirsFromEntry(root, entry))
    .sort((a, b) => a.folder.localeCompare(b.folder));
};

const palettes = discoverPaletteDirs(palettesRoot).map(({ folder, fullPath }) => {
  const slug = camelToKebab(folder),
    packageName = `@tsparticles/palette-${slug}`,
    title = parsePaletteName(fullPath, folder),
    loader = `load${toPascal(folder)}Palette`,
    scriptFile = parsePaletteScriptFile(fullPath, slug);

  return {
    id: folder,
    slug,
    title,
    packageName,
    mountPath: `/palette-${slug}`,
    route: `/palettes/${folder}`,
    image: `/images/palettes/${folder}.png`,
    scriptFile,
    loader,
    optionValue: slug,
    description: `${title} palette demo`,
  };
});

const paletteGroupDefinitions = [
  // ── fireworks/ ────────────────────────────────────────────────────────────
  {
    title: "Fireworks",
    slugs: [
      // monochromatic — fill + stroke pairs
      "fireworks-gold",
      "fireworks-gold-stroke",
      "fireworks-silver",
      "fireworks-silver-stroke",
      "fireworks-blue",
      "fireworks-blue-stroke",
      "fireworks-red",
      "fireworks-red-stroke",
      "fireworks-green",
      "fireworks-green-stroke",
      "fireworks-purple",
      "fireworks-purple-stroke",
      "fireworks-copper",
      "fireworks-copper-stroke",
      "fireworks-ice",
      "fireworks-ice-stroke",
      // multicolor — fill + stroke pairs
      "fireworks-multicolor",
      "fireworks-multicolor-stroke",
      "fireworks-rainbow-stroke",
      // special
      "fireworks-pastel",
      "fireworks-pastel-stroke",
      "fireworks-neon",
      "fireworks-neon-stroke",
    ],
  },
  // ── confetti/ ─────────────────────────────────────────────────────────────
  {
    title: "Confetti",
    slugs: [
      "confetti",
      "confetti-rainbow",
      "confetti-neon",
      "confetti-gold",
      "confetti-patriotic",
      "confetti-winter",
      "confetti-pastel",
      "confetti-monochrome-pink",
      "confetti-monochrome-blue",
      "confetti-monochrome-green",
    ],
  },
  // ── impact/ ───────────────────────────────────────────────────────────────
  {
    title: "Impact & Explosion",
    slugs: [
      "explosion-debris",
      "shockwave-blast",
      "bullet-hit",
      "meteor-impact",
      "glass-burst",
      "nuclear-glow",
      "splatter-dark",
    ],
  },
  // ── monochromatic/ ────────────────────────────────────────────────────────
  {
    title: "Monochromatic",
    slugs: [
      "monochrome-noir",
      "monochrome-white",
      "monochrome-blues",
      "monochrome-cyan",
      "monochrome-teal",
      "monochrome-greens",
      "monochrome-yellows",
      "monochrome-oranges",
      "monochrome-reds",
      "monochrome-pinks",
      "monochrome-purples",
      "monochrome-brown",
      "monochrome-gold",
    ],
  },
  // ── pastel/ ───────────────────────────────────────────────────────────────
  {
    title: "Pastel",
    slugs: [
      "pastel-dream",
      "pastel-warm",
      "pastel-cool",
      "pastel-mint",
      "pastel-sunset",
    ],
  },
  // ── vibrant/ ──────────────────────────────────────────────────────────────
  {
    title: "Vibrant",
    slugs: [
      "vibrant",
      "vibrant-neon",
      "vibrant-electric",
      "vibrant-retro",
      "vibrant-tropical",
    ],
  },
  // ── spectrum/ ─────────────────────────────────────────────────────────────
  {
    title: "Spectrum & Color Theory",
    slugs: [
      "rainbow",
      "full-spectrum",
      "rgb-primaries",
      "cmy-secondaries",
      "acid-pair",
      "prism-scatter",
      "duality-blue-yellow",
      "duality-green-magenta",
      "duality-red-cyan",
      "okabe-ito-accessible",
    ],
  },
  // ── nature/ ───────────────────────────────────────────────────────────────
  {
    title: "Nature & Seasons",
    slugs: [
      "spring-bloom",
      "cherry-blossom",
      "forest-canopy",
      "autumn-leaves",
      "dandelion-seeds",
      "pollen-and-spores",
      "fireflies",
      "snowfall",
      "earthy-nature",
    ],
  },
  // ── earth/ ────────────────────────────────────────────────────────────────
  {
    title: "Earth & Terrain",
    slugs: [
      "desert-sand",
      "mud-and-dirt",
      "rock-and-gravel",
      "rust-and-corrosion",
      "caustics",
      "skin-and-organic",
      "oil-slick",
    ],
  },
  // ── water/ ────────────────────────────────────────────────────────────────
  {
    title: "Water",
    slugs: [
      "water",
      "water-splash",
      "deep-ocean",
      "foam-and-bubbles",
      "rising-bubbles",
      "rain",
      "fog-coastal",
      "ink-in-water",
    ],
  },
  // ── fire/ ─────────────────────────────────────────────────────────────────
  {
    title: "Fire & Heat",
    slugs: [
      "fire",
      "fire-seed",
      "full-fire-gradient",
      "lava-lamp",
      "molten-metal",
      "embers-and-ash",
      "metal-sparks",
      "candlelight",
    ],
  },
  // ── atmospheric/ ──────────────────────────────────────────────────────────
  {
    title: "Atmospheric Phenomena",
    slugs: [
      "lightning",
      "thunderstorm",
      "shockwave",
      "heat-duality",
      "heat-haze",
      "thermal-map",
      "sunrise-gold",
      "sunset-binary",
      "smoke-cold",
      "smoke-warm",
    ],
  },
  // ── atmosphere/ ───────────────────────────────────────────────────────────
  {
    title: "Smoke & Colored Mist",
    slugs: [
      "colored-smoke-magenta",
      "colored-smoke-teal",
      "colored-smoke-blue",
      "colored-smoke-green",
      "colored-smoke-orange",
      "colored-smoke-purple",
      "colored-smoke-rainbow",
      "fog-morning",
      "dust-haze",
      "volcanic-ash",
    ],
  },
  // ── fantasy/ ──────────────────────────────────────────────────────────────
  {
    title: "Fantasy & Magic",
    slugs: [
      "bioluminescence",
      "fairy-dust",
      "holy-light",
      "jellyfish-glow",
      "ice-magic",
      "ice-triad",
      "blood-and-gore",
      "poison-and-venom",
    ],
  },
  // ── space/ ────────────────────────────────────────────────────────────────
  {
    title: "Space & Cosmic",
    slugs: [
      "aurora-borealis",
      "supernova",
      "cosmic-radiation",
      "dark-matter",
      "galaxy-dust",
      "portal",
      "pulsar",
      "solar-wind",
    ],
  },
  // ── tech/ ─────────────────────────────────────────────────────────────────
  {
    title: "Tech & Digital",
    slugs: [
      "neon-city",
      "matrix-rain",
      "glitch",
      "hologram",
      "vaporwave",
      "crt-phosphor",
      "lofi-warm",
      "network-nodes",
      "plasma-arc",
    ],
  },
  // ── optics/ ───────────────────────────────────────────────────────────────
  {
    title: "Optics & Light",
    slugs: [
      "lens-flare-dust",
      "prism-spectrum",
      "bokeh-gold",
      "bokeh-cold",
      "bokeh-pastel",
      "holographic-shimmer",
      "laser-scatter",
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
app.use("/tsparticles-updater-paint", express.static("./node_modules/@tsparticles/updater-paint/"));
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
