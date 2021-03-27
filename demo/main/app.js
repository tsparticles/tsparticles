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
app.use("/preset-60fps", express.static("./node_modules/tsparticles-preset-60fps/dist"));
app.use("/preset-background-mask", express.static("./node_modules/tsparticles-preset-background-mask/dist"));
app.use("/preset-basic", express.static("./node_modules/tsparticles-preset-basic/dist"));
app.use("/preset-big-circles", express.static("./node_modules/tsparticles-preset-big-circles/dist"));
app.use("/preset-bouncing", express.static("./node_modules/tsparticles-preset-bouncing/dist"));
app.use("/preset-fire", express.static("./node_modules/tsparticles-preset-fire/dist"));
app.use("/preset-font-awesome", express.static("./node_modules/tsparticles-preset-font-awesome/dist"));
app.use("/preset-fountain", express.static("./node_modules/tsparticles-preset-fountain/dist"));
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

app.listen(port, () => console.log(`Demo app listening on port ${port}!`));
