const express = require("express");
const helmet = require("helmet");
const stylus = require("stylus");

const app = express();

// app.use(helmet()); // Safari requires https, probably a bug

const port = 3000;

app.set("views", "./views");
app.set("view engine", "pug");
app.use(stylus.middleware("./public"));
app.use(express.static("./public"));
app.use("/fontawesome", express.static("./node_modules/@fortawesome/fontawesome-free"));
app.use("/jsoneditor", express.static("./node_modules/jsoneditor/dist"));
app.use("/jquery", express.static("./node_modules/jquery/dist"));
app.use("/popper.js", express.static("./node_modules/popper.js/dist"));
app.use("/bootstrap", express.static("./node_modules/bootstrap/dist"));
app.use("/tsparticles-engine", express.static("./node_modules/tsparticles-engine"));
app.use("/tsparticles-interaction-external-attract", express.static("./node_modules/tsparticles-interaction-external-attract"));
app.use("/tsparticles-interaction-external-bounce", express.static("./node_modules/tsparticles-interaction-external-bounce"));
app.use("/tsparticles-interaction-external-bubble", express.static("./node_modules/tsparticles-interaction-external-bubble"));
app.use("/tsparticles-interaction-external-connect", express.static("./node_modules/tsparticles-interaction-external-connect"));
app.use("/tsparticles-interaction-external-grab", express.static("./node_modules/tsparticles-interaction-external-grab"));
app.use("/tsparticles-interaction-external-repulse", express.static("./node_modules/tsparticles-interaction-external-repulse"));
app.use("/tsparticles-interaction-particles-attract", express.static("./node_modules/tsparticles-interaction-particles-attract"));
app.use("/tsparticles-interaction-particles-collisions", express.static("./node_modules/tsparticles-interaction-particles-collisions"));
app.use("/tsparticles-interaction-particles-links", express.static("./node_modules/tsparticles-interaction-particles-links"));
app.use("/tsparticles-interaction-particles-move", express.static("./node_modules/tsparticles-interaction-particles-move"));
app.use("/tsparticles-interaction-particles-parallax", express.static("./node_modules/tsparticles-interaction-particles-parallax"));
app.use("/tsparticles-interaction-particles-repulse", express.static("./node_modules/tsparticles-interaction-particles-repulse"));
app.use("/tsparticles-shape-circle", express.static("./node_modules/tsparticles-shape-circle"));
app.use("/tsparticles-shape-image", express.static("./node_modules/tsparticles-shape-image"));
app.use("/tsparticles-shape-line", express.static("./node_modules/tsparticles-shape-line"));
app.use("/tsparticles-shape-polygon", express.static("./node_modules/tsparticles-shape-polygon"));
app.use("/tsparticles-shape-square", express.static("./node_modules/tsparticles-shape-square"));
app.use("/tsparticles-shape-star", express.static("./node_modules/tsparticles-shape-star"));
app.use("/tsparticles-shape-text", express.static("./node_modules/tsparticles-shape-text"));
app.use("/tsparticles-updater-angle", express.static("./node_modules/tsparticles-updater-angle"));
app.use("/tsparticles-updater-color", express.static("./node_modules/tsparticles-updater-color"));
app.use("/tsparticles-updater-life", express.static("./node_modules/tsparticles-updater-life"));
app.use("/tsparticles-updater-opacity", express.static("./node_modules/tsparticles-updater-opacity"));
app.use("/tsparticles-updater-out-modes", express.static("./node_modules/tsparticles-updater-out-modes"));
app.use("/tsparticles-updater-size", express.static("./node_modules/tsparticles-updater-size"));
app.use("/tsparticles-updater-stroke-color", express.static("./node_modules/tsparticles-updater-stroke-color"));
app.use("/tsparticles-slim", express.static("./node_modules/tsparticles-slim"));
app.use("/tsparticles-plugin-absorbers", express.static("./node_modules/tsparticles-plugin-absorbers"));
app.use("/tsparticles-plugin-emitters", express.static("./node_modules/tsparticles-plugin-emitters"));
app.use("/tsparticles-plugin-infection", express.static("./node_modules/tsparticles-plugin-infection"));
app.use("/tsparticles-plugin-polygon-mask", express.static("./node_modules/tsparticles-plugin-polygon-mask"));
app.use("/tsparticles-interaction-external-trail", express.static("./node_modules/tsparticles-interaction-external-trail"));
app.use("/tsparticles-interaction-light", express.static("./node_modules/tsparticles-interaction-light"));
app.use("/tsparticles-updater-orbit", express.static("./node_modules/tsparticles-updater-orbit"));
app.use("/tsparticles", express.static("./node_modules/tsparticles"));
app.use("/tsparticles-plugin-absorbers", express.static("./node_modules/tsparticles-plugin-absorbers"));
app.use("/tsparticles-plugin-emitters", express.static("./node_modules/tsparticles-plugin-emitters"));
app.use("/tsparticles-plugin-polygon-mask", express.static("./node_modules/tsparticles-plugin-polygon-mask"));
app.use("/preset-big-circles", express.static("./node_modules/tsparticles-preset-big-circles"));
app.use("/preset-bubbles", express.static("./node_modules/tsparticles-preset-bubbles"));
app.use("/preset-fire", express.static("./node_modules/tsparticles-preset-fire"));
app.use("/preset-links", express.static("./node_modules/tsparticles-preset-links"));
app.use("/preset-sea-anemone", express.static("./node_modules/tsparticles-preset-sea-anemone"));
app.use("/preset-fountain", express.static("./node_modules/tsparticles-preset-fountain"));
app.use("/preset-snow", express.static("./node_modules/tsparticles-preset-snow"));
app.use("/preset-stars", express.static("./node_modules/tsparticles-preset-stars"));
app.use("/shape-bubble", express.static("./node_modules/tsparticles-shape-bubble"));
app.use("/shape-heart", express.static("./node_modules/tsparticles-shape-heart"));
app.use("/shape-multiline-text", express.static("./node_modules/tsparticles-shape-multiline-text"));
app.use("/shape-spiral", express.static("./node_modules/tsparticles-shape-spiral"));
app.use("/stats", express.static("./node_modules/stats.ts/"));
app.use("/pathseg", express.static("./node_modules/pathseg/"));

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/slim", function(req, res) {
  res.render("slim");
});

app.get("/presets", function(req, res) {
  res.render("presets/index");
});

app.get("/presets/bigCircles", function(req, res) {
  res.render("presets/bigCircles");
});

app.get("/presets/bubbles", function(req, res) {
  res.render("presets/bubbles");
});

app.get("/presets/fire", function(req, res) {
  res.render("presets/fire");
});

app.get("/presets/fountain", function(req, res) {
  res.render("presets/fountain");
});

app.get("/presets/links", function(req, res) {
  res.render("presets/links");
});

app.get("/presets/seaAnemone", function(req, res) {
  res.render("presets/seaAnemone");
});

app.get("/presets/snow", function(req, res) {
  res.render("presets/snow");
});

app.get("/presets/stars", function(req, res) {
  res.render("presets/stars");
});

app.listen(port, () => console.log(`Demo app listening on port ${port}!`));
