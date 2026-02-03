import express from "express";
//import helmet from "helmet";
import stylus from "stylus";
import livereload from "livereload";
import connectLiveReload from "connect-livereload";
//import rateLimit from "express-rate-limit";

const liveReloadPort = 35730,
    expressPort = 3015;

const app = express();

const liveReloadServer = livereload.createServer({
    port: liveReloadPort
});

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

app.use(connectLiveReload({
    port: liveReloadPort
}));

/*const limiter = rateLimit({
    windowMs: 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);*/
// app.use(helmet()); // Safari requires https, probably a bug

app.set("views", "./views");
app.set("view engine", "pug");
app.use(stylus.middleware("./public"));
app.use(express.static("./public"));
app.use("/docs", express.static("../../engine/docs"));
app.use("/fontawesome", express.static("./node_modules/@fortawesome/fontawesome-free"));
app.use("/jsoneditor", express.static("./node_modules/jsoneditor/dist"));
app.use("/jquery", express.static("./node_modules/jquery/dist"));
app.use("/lodash", express.static("./node_modules/lodash"));
app.use("/popper.js", express.static("./node_modules/popper.js/dist"));
app.use("/bootstrap", express.static("./node_modules/bootstrap/dist"));
app.use("/preset-big-circles", express.static("./node_modules/@tsparticles/preset-big-circles"));
app.use("/preset-bubbles", express.static("./node_modules/@tsparticles/preset-bubbles"));
app.use("/preset-confetti", express.static("./node_modules/@tsparticles/preset-confetti"));
app.use("/preset-fire", express.static("./node_modules/@tsparticles/preset-fire"));
app.use("/preset-firefly", express.static("./node_modules/@tsparticles/preset-firefly"));
app.use("/preset-fireworks", express.static("./node_modules/@tsparticles/preset-fireworks"));
app.use("/preset-fountain", express.static("./node_modules/@tsparticles/preset-fountain"));
app.use("/preset-hyperspace", express.static("./node_modules/@tsparticles/preset-hyperspace"));
app.use("/preset-links", express.static("./node_modules/@tsparticles/preset-links"));
app.use("/preset-sea-anemone", express.static("./node_modules/@tsparticles/preset-sea-anemone"));
app.use("/preset-squares", express.static("./node_modules/@tsparticles/preset-squares"));
app.use("/preset-snow", express.static("./node_modules/@tsparticles/preset-snow"));
app.use("/preset-stars", express.static("./node_modules/@tsparticles/preset-stars"));
app.use("/preset-triangles", express.static("./node_modules/@tsparticles/preset-triangles"));
app.use("/stats.ts", express.static("./node_modules/stats.ts/"));

app.get("/", function (req, res) {
    res.render("index");
});

app.get("/bigCircles", function (req, res) {
    res.render("bigCircles");
});

app.get("/bubbles", function (req, res) {
    res.render("bubbles");
});

app.get("/confetti", function (req, res) {
    res.render("confetti");
});

app.get("/fire", function (req, res) {
    res.render("fire");
});

app.get("/firefly", function (req, res) {
    res.render("firefly");
});

app.get("/fireworks", function (req, res) {
    res.render("fireworks");
});

app.get("/fountain", function (req, res) {
    res.render("fountain");
});

app.get("/hyperspace", function (req, res) {
    res.render("hyperspace");
});

app.get("/links", function (req, res) {
    res.render("links");
});

app.get("/seaAnemone", function (req, res) {
    res.render("seaAnemone");
});

app.get("/squares", function (req, res) {
    res.render("squares");
});

app.get("/snow", function (req, res) {
    res.render("snow");
});

app.get("/stars", function (req, res) {
    res.render("stars");
});

app.get("/triangles", function (req, res) {
    res.render("triangles");
});

app.listen(expressPort, () => console.log(`Demo app listening on port ${expressPort}!`));
