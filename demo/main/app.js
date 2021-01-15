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
app.use("/tsparticles", express.static("./node_modules/tsparticles"));
app.use("/tsparticles-core", express.static("./node_modules/tsparticles-core"));
app.use("/tsparticles-slim", express.static("./node_modules/tsparticles-slim"));
app.use("/tsparticles-plugin-absorbers", express.static("./node_modules/tsparticles-plugin-absorbers"));
app.use("/tsparticles-plugin-emitters", express.static("./node_modules/tsparticles-plugin-emitters"));
app.use("/tsparticles-plugin-polygon-mask", express.static("./node_modules/tsparticles-plugin-polygon-mask"));
app.use("/preset-big-circles", express.static("./node_modules/tsparticles-preset-big-circles"));
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

app.listen(port, () => console.log(`Demo app listening on port ${port}!`));
