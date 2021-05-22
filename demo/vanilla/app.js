const express = require('express');
const helmet = require('helmet');
const stylus = require('stylus');

const app = express();

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
app.use("/tsparticles", express.static("./node_modules/tsparticles/dist"));
app.use("/preset-big-circles", express.static("./node_modules/tsparticles-preset-big-circles/dist"));
app.use("/preset-bubbles", express.static("./node_modules/tsparticles-preset-bubbles/dist"));
app.use("/preset-confetti", express.static("./node_modules/tsparticles-preset-confetti/dist"));
app.use("/preset-fire", express.static("./node_modules/tsparticles-preset-fire/dist"));
app.use("/preset-fountain", express.static("./node_modules/tsparticles-preset-fountain/dist"));
app.use("/preset-links", express.static("./node_modules/tsparticles-preset-links/dist"));
app.use("/preset-sea-anemone", express.static("./node_modules/tsparticles-preset-sea-anemone/dist"));
app.use("/preset-snow", express.static("./node_modules/tsparticles-preset-snow/dist"));
app.use("/preset-stars", express.static("./node_modules/tsparticles-preset-stars/dist"));
app.use("/shape-bubble", express.static("./node_modules/tsparticles-shape-bubble/dist"));
app.use("/shape-confetti", express.static("./node_modules/tsparticles-shape-confetti/dist"));
app.use("/shape-heart", express.static("./node_modules/tsparticles-shape-heart/dist"));
app.use("/shape-multiline-text", express.static("./node_modules/tsparticles-shape-multiline-text/dist"));
app.use("/shape-rounded-rect", express.static("./node_modules/tsparticles-shape-rounded-rect/dist"));
app.use("/shape-spiral", express.static("./node_modules/tsparticles-shape-spiral/dist"));
app.use("/three", express.static("./node_modules/three/"));
app.use("/pathseg", express.static("./node_modules/pathseg/"));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/slim', function (req, res) {
    res.render('slim');
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

app.get("/presets/fire", function (req, res) {
    res.render("presets/fire");
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

app.listen(port, () => console.log(`Demo app listening on port ${port}!`));
