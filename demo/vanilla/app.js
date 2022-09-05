const express = require('express');
const helmet = require('helmet');
const stylus = require('stylus');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
//const rateLimit = require("express-rate-limit");

const app = express();

const liveReloadServer = livereload.createServer();

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

app.use(connectLiveReload());

/*const limiter = rateLimit({
    windowMs: 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);*/
// app.use(helmet()); // Safari requires https, probably a bug

const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');
app.use(stylus.middleware('./public'));
app.use(express.static('./public'));
app.use("/docs", express.static("../../engine/docs"));
app.use("/fontawesome", express.static("./node_modules/@fortawesome/fontawesome-free"));
app.use("/jsoneditor", express.static("./node_modules/jsoneditor/dist"));
app.use("/jquery", express.static("./node_modules/jquery/dist"));
app.use("/lodash", express.static("./node_modules/lodash"));
app.use("/popper.js", express.static("./node_modules/popper.js/dist"));
app.use("/bootstrap", express.static("./node_modules/bootstrap/dist"));
app.use("/tsparticles-engine", express.static("./node_modules/tsparticles-engine/dist"));
app.use("/tsparticles-particles.js", express.static("./node_modules/tsparticles-particles.js/dist"));
app.use("/tsparticles-slim", express.static("./node_modules/tsparticles-slim/dist"));
app.use("/tsparticles", express.static("./node_modules/tsparticles/dist"));
app.use("/interaction-external-attract", express.static("./node_modules/tsparticles-interaction-external-attract/dist"));
app.use("/interaction-external-bounce", express.static("./node_modules/tsparticles-interaction-external-bounce/dist"));
app.use("/interaction-external-bubble", express.static("./node_modules/tsparticles-interaction-external-bubble/dist"));
app.use("/interaction-external-connect", express.static("./node_modules/tsparticles-interaction-external-connect/dist"));
app.use("/interaction-external-grab", express.static("./node_modules/tsparticles-interaction-external-grab/dist"));
app.use("/interaction-external-pause", express.static("./node_modules/tsparticles-interaction-external-pause/dist"));
app.use("/interaction-external-push", express.static("./node_modules/tsparticles-interaction-external-push/dist"));
app.use("/interaction-external-remove", express.static("./node_modules/tsparticles-interaction-external-remove/dist"));
app.use("/interaction-external-repulse", express.static("./node_modules/tsparticles-interaction-external-repulse/dist"));
app.use("/interaction-external-slow", express.static("./node_modules/tsparticles-interaction-external-slow/dist"));
app.use("/interaction-particles-attract", express.static("./node_modules/tsparticles-interaction-particles-attract/dist"));
app.use("/interaction-particles-collisions", express.static("./node_modules/tsparticles-interaction-particles-collisions/dist"));
app.use("/interaction-particles-links", express.static("./node_modules/tsparticles-interaction-particles-links/dist"));
app.use("/shape-circle", express.static("./node_modules/tsparticles-shape-circle/dist"));
app.use("/shape-image", express.static("./node_modules/tsparticles-shape-image/dist"));
app.use("/shape-line", express.static("./node_modules/tsparticles-shape-line/dist"));
app.use("/shape-polygon", express.static("./node_modules/tsparticles-shape-polygon/dist"));
app.use("/shape-square", express.static("./node_modules/tsparticles-shape-square/dist"));
app.use("/shape-star", express.static("./node_modules/tsparticles-shape-star/dist"));
app.use("/shape-text", express.static("./node_modules/tsparticles-shape-text/dist"));
app.use("/updater-life", express.static("./node_modules/tsparticles-updater-life/dist"));
app.use("/updater-opacity", express.static("./node_modules/tsparticles-updater-opacity/dist"));
app.use("/updater-size", express.static("./node_modules/tsparticles-updater-size/dist"));
app.use("/updater-angle", express.static("./node_modules/tsparticles-updater-angle/dist"));
app.use("/updater-color", express.static("./node_modules/tsparticles-updater-color/dist"));
app.use("/updater-destroy", express.static("./node_modules/tsparticles-updater-destroy/dist"));
app.use("/updater-stroke-color", express.static("./node_modules/tsparticles-updater-stroke-color/dist"));
app.use("/updater-out-modes", express.static("./node_modules/tsparticles-updater-out-modes/dist"));
app.use("/updater-tilt", express.static("./node_modules/tsparticles-updater-tilt/dist"))
app.use("/updater-twinkle", express.static("./node_modules/tsparticles-updater-twinkle/dist"))
app.use("/updater-roll", express.static("./node_modules/tsparticles-updater-roll/dist"))
app.use("/updater-wobble", express.static("./node_modules/tsparticles-updater-wobble/dist"))
app.use("/interaction-external-trail", express.static("./node_modules/tsparticles-interaction-external-trail/dist"))
app.use("/plugin-absorbers", express.static("./node_modules/tsparticles-plugin-absorbers/dist"))
app.use("/plugin-emitters", express.static("./node_modules/tsparticles-plugin-emitters/dist"))
app.use("/plugin-polygon-mask", express.static("./node_modules/tsparticles-plugin-polygon-mask/dist"))
app.use("/interaction-light", express.static("./node_modules/tsparticles-interaction-light/dist"));
app.use("/interaction-particles-repulse", express.static("./node_modules/tsparticles-interaction-particles-repulse/dist"));
app.use("/updater-gradient", express.static("./node_modules/tsparticles-updater-gradient/dist"));
app.use("/updater-orbit", express.static("./node_modules/tsparticles-updater-orbit/dist"));
app.use("/move-base", express.static("./node_modules/tsparticles-move-base/dist"));
app.use("/move-parallax", express.static("./node_modules/tsparticles-move-parallax/dist"));
app.use("/path-curves", express.static("./node_modules/tsparticles-path-curves/dist"));
app.use("/path-polygon", express.static("./node_modules/tsparticles-path-polygon/dist"));
app.use("/path-perlin-noise", express.static("./node_modules/tsparticles-path-perlin-noise/dist"));
app.use("/path-simplex-noise", express.static("./node_modules/tsparticles-path-simplex-noise/dist"));
app.use("/plugin-hsv-color", express.static("./node_modules/tsparticles-plugin-hsv-color/dist"));
app.use("/plugin-canvas-mask", express.static("./node_modules/tsparticles-plugin-canvas-mask/dist"))
app.use("/plugin-infection", express.static("./node_modules/tsparticles-plugin-infection/dist"));
app.use("/preset-big-circles", express.static("./node_modules/tsparticles-preset-big-circles/dist"));
app.use("/preset-bubbles", express.static("./node_modules/tsparticles-preset-bubbles/dist"));
app.use("/preset-confetti", express.static("./node_modules/tsparticles-preset-confetti/dist"));
app.use("/preset-fire", express.static("./node_modules/tsparticles-preset-fire/dist"));
app.use("/preset-firefly", express.static("./node_modules/tsparticles-preset-firefly/dist"));
app.use("/preset-fireworks", express.static("./node_modules/tsparticles-preset-fireworks/dist"));
app.use("/preset-fountain", express.static("./node_modules/tsparticles-preset-fountain/dist"));
app.use("/preset-links", express.static("./node_modules/tsparticles-preset-links/dist"));
app.use("/preset-sea-anemone", express.static("./node_modules/tsparticles-preset-sea-anemone/dist"));
app.use("/preset-snow", express.static("./node_modules/tsparticles-preset-snow/dist"));
app.use("/preset-stars", express.static("./node_modules/tsparticles-preset-stars/dist"));
app.use("/preset-triangles", express.static("./node_modules/tsparticles-preset-triangles/dist"));
app.use("/shape-bubble", express.static("./node_modules/tsparticles-shape-bubble/dist"));
app.use("/shape-heart", express.static("./node_modules/tsparticles-shape-heart/dist"));
app.use("/shape-multiline-text", express.static("./node_modules/tsparticles-shape-multiline-text/dist"));
app.use("/shape-rounded-rect", express.static("./node_modules/tsparticles-shape-rounded-rect/dist"));
app.use("/shape-spiral", express.static("./node_modules/tsparticles-shape-spiral/dist"));
app.use("/stats.ts", express.static("./node_modules/stats.ts/"));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/domEmitters', function (req, res) {
    res.render('domEmitters');
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
