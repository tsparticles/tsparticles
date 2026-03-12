import express from "express";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import stylus from "stylus";
import livereload from "livereload";
import connectLiveReload from "connect-livereload";

const liveReloadPort = 35730,
  expressPort = 3015;

const app = express();

const __filename = fileURLToPath(import.meta.url),
  __dirname = dirname(__filename),
  workspaceRoot = resolve(__dirname, "../.."),
  presetsRoot = resolve(workspaceRoot, "presets"),
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
      const slug = camelToKebab(folder),
        packageName = `@tsparticles/${prefix}-${slug}`,
        title =
          mode === "palette"
            ? parsePaletteName(folder)
            : toTitleCase(slug.replaceAll("-", " ")),
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
          mode === "palette" ? `tsparticles.palette.palette-${slug}.min.js` : `tsparticles.preset.${slug}.bundle.min.js`,
        loader,
        optionValue: slug,
        description: `${title} ${mode} demo`,
      };
    });

const presets = loadCatalog({
  root: presetsRoot,
  prefix: "preset",
  loaderSuffix: "Preset",
  mode: "preset",
});

const palettes = loadCatalog({
  root: palettesRoot,
  prefix: "palette",
  loaderSuffix: "Palette",
  mode: "palette",
});

const presetMap = new Map(presets.map(item => [item.id, item])),
  paletteMap = new Map(palettes.map(item => [item.id, item]));

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
app.use("/stats.ts", express.static("./node_modules/stats.ts/"));
app.use("/tsparticles-basic", express.static("./node_modules/@tsparticles/basic"));

for (const item of [...presets, ...palettes]) {
  app.use(item.mountPath, express.static(`./node_modules/${item.packageName}`));
}

app.get("/", function (req, res) {
  res.render("index", { presets, palettes });
});

app.get("/presets/:id", function (req, res) {
  const item = presetMap.get(req.params.id);

  if (!item) {
    res.status(404).send("Preset not found");

    return;
  }

  res.render("preset", { item });
});

app.get("/palettes/:id", function (req, res) {
  const item = paletteMap.get(req.params.id);

  if (!item) {
    res.status(404).send("Palette not found");

    return;
  }

  res.render("palette", { item });
});

for (const item of presets) {
  app.get(`/${item.id}`, function (req, res) {
    res.redirect(item.route);
  });
}

app.listen(expressPort, () => console.log(`Demo app listening on port ${expressPort}!`));
