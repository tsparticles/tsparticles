const express = require('express');
const helmet = require('helmet');
const stylus = require('stylus');
const rateLimit = require("express-rate-limit");

const app = express();

const limiter = rateLimit({
    windowMs: 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
// app.use(helmet()); // Safari requires https, probably a bug

const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');
app.use(stylus.middleware('./public'));
app.use(express.static('./public'));
app.use("/docs", express.static("../../core/main/docs"));
app.use("/fontawesome", express.static("./node_modules/@fortawesome/fontawesome-free"));
app.use("/jsoneditor", express.static("./node_modules/jsoneditor/dist"));
app.use("/jquery", express.static("./node_modules/jquery/dist"));
app.use("/popper.js", express.static("./node_modules/popper.js/dist"));
app.use("/bootstrap", express.static("./node_modules/bootstrap/dist"));
app.use("/tsparticles-engine", express.static("./node_modules/tsparticles-engine"));
app.use("/tsparticles-slim", express.static("./node_modules/tsparticles-slim"));
app.use("/tsparticles", express.static("./node_modules/tsparticles"));
app.use("/interaction-light", express.static("./node_modules/tsparticles-interaction-light"));
app.use("/interaction-particles-repulse", express.static("./node_modules/tsparticles-interaction-particles-repulse"));
app.use("/updater-gradient", express.static("./node_modules/tsparticles-updater-gradient"));
app.use("/updater-orbit", express.static("./node_modules/tsparticles-updater-orbit"));
app.use("/path-curves", express.static("./node_modules/tsparticles-path-curves"));
app.use("/path-polygon", express.static("./node_modules/tsparticles-path-polygon"));
app.use("/path-perlin-noise", express.static("./node_modules/tsparticles-path-perlin-noise"));
app.use("/path-simplex-noise", express.static("./node_modules/tsparticles-path-simplex-noise"));
app.use("/plugin-infection", express.static("./node_modules/tsparticles-plugin-infection"));
app.use("/preset-big-circles", express.static("./node_modules/tsparticles-preset-big-circles"));
app.use("/preset-bubbles", express.static("./node_modules/tsparticles-preset-bubbles"));
app.use("/preset-confetti", express.static("./node_modules/tsparticles-preset-confetti"));
app.use("/preset-fire", express.static("./node_modules/tsparticles-preset-fire"));
app.use("/preset-firefly", express.static("./node_modules/tsparticles-preset-firefly"));
app.use("/preset-fireworks", express.static("./node_modules/tsparticles-preset-fireworks"));
app.use("/preset-fountain", express.static("./node_modules/tsparticles-preset-fountain"));
app.use("/preset-links", express.static("./node_modules/tsparticles-preset-links"));
app.use("/preset-sea-anemone", express.static("./node_modules/tsparticles-preset-sea-anemone"));
app.use("/preset-snow", express.static("./node_modules/tsparticles-preset-snow"));
app.use("/preset-stars", express.static("./node_modules/tsparticles-preset-stars"));
app.use("/preset-triangles", express.static("./node_modules/tsparticles-preset-triangles"));
app.use("/shape-bubble", express.static("./node_modules/tsparticles-shape-bubble"));
app.use("/shape-heart", express.static("./node_modules/tsparticles-shape-heart"));
app.use("/shape-multiline-text", express.static("./node_modules/tsparticles-shape-multiline-text"));
app.use("/shape-rounded-rect", express.static("./node_modules/tsparticles-shape-rounded-rect"));
app.use("/shape-spiral", express.static("./node_modules/tsparticles-shape-spiral"));
app.use("/three", express.static("./node_modules/three/"));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/slim', function (req, res) {
    res.render('slim');
});

app.get('/themes', function (req, res) {
    res.render('themes');
});

app.get('/click', function (req, res) {
    res.render('click');
});

app.get('/noid', function (req, res) {
    res.render('noid');
});

app.get("/presets", function (req, res) {
    res.render("presets/index");
});

app.get("/presets/bigCircles", function (req, res) {
    res.render("presets/bigCircles");
});

app.get("/presets/bubbles", function (req, res) {
    res.render("presets/bubbles");
});

app.get("/presets/confetti", function (req, res) {
    res.render("presets/confetti");
});

app.get("/presets/fire", function (req, res) {
    res.render("presets/fire");
});

app.get("/presets/firefly", function (req, res) {
    res.render("presets/firefly");
});

app.get("/presets/fireworks", function (req, res) {
    res.render("presets/fireworks");
});

app.get("/presets/fountain", function (req, res) {
    res.render("presets/fountain");
});

app.get("/presets/links", function (req, res) {
    res.render("presets/links");
});

app.get("/presets/seaAnemone", function (req, res) {
    res.render("presets/seaAnemone");
});

app.get("/presets/snow", function (req, res) {
    res.render("presets/snow");
});

app.get("/presets/stars", function (req, res) {
    res.render("presets/stars");
});

app.get("/presets/triangles", function (req, res) {
    res.render("presets/triangles");
});

app.listen(port, () => console.log(`Demo app listening on port ${port}!`));
