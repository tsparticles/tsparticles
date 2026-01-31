import { SeqTransport } from "@datalust/winston-seq";
import cluster from "node:cluster";
//import helmet from "helmet";
import connectLiveReload from "connect-livereload";
import { dirname } from 'path';
import dotenv from "dotenv";
import express from "express";
import { fileURLToPath } from 'url';
import livereload from "livereload";
import path from "path";
import os from "os";
//import rateLimit from "express-rate-limit";
import stylus from "stylus";
import winston from "winston";

const fileName = fileURLToPath(import.meta.url),
    dirName = dirname(fileName),
    app = express(), numCpus = os.cpus().length;

dotenv.config({ path: path.join(dirName, "..", ".env") });

let seqTransport = undefined;

if (process.env.USE_SEQ === "1") {
    seqTransport = new SeqTransport({
        serverUrl: `http${process.env.SEQ_SSL === "1" ? "s" : ""}://${process.env.SEQ_HOST}:${process.env.SEQ_PORT}`,
        apiKey: process.env.SEQ_KEY,
        onError: (e => {
            console.error(e);
        }),
        handleExceptions: true,
        handleRejections: true
    });
}

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(  /* This is required to get errors to log with stack traces. See https://github.com/winstonjs/winston/issues/1498 */
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    defaultMeta: { application: "tsParticles Demo" },
    transports: [
        seqTransport || new winston.transports.Console({
            format: winston.format.simple()
        })
    ]
});

app.set("views", "./views");
app.set("view engine", "pug");
app.use(stylus.middleware("./public"));
app.use(express.static("./public"));
app.use("/docs", express.static("../../engine/docs"));
app.use("/fontawesome", express.static("./node_modules/@fortawesome/fontawesome-free"));
app.use("/jsoneditor", express.static("./node_modules/jsoneditor/dist"));
app.use("/jquery", express.static("./node_modules/jquery/dist"));
app.use("/lodash", express.static("./node_modules/lodash"));
app.use("/ace", express.static("./node_modules/ace-builds"));
app.use("/bootstrap", express.static("./node_modules/bootstrap/dist"));
app.use("/tsparticles-smooth-value-noise", express.static("./node_modules/@tsparticles/smooth-value-noise"));
app.use("/tsparticles-perlin-noise", express.static("./node_modules/@tsparticles/perlin-noise"));
app.use("/tsparticles-simplex-noise", express.static("./node_modules/@tsparticles/simplex-noise"));
app.use("/tsparticles-fractal-noise", express.static("./node_modules/@tsparticles/fractal-noise"));
app.use("/tsparticles-noise-field", express.static("./node_modules/@tsparticles/noise-field"));
app.use("/tsparticles-all", express.static("./node_modules/@tsparticles/all"));
app.use("/tsparticles-basic", express.static("./node_modules/@tsparticles/basic"));
app.use("/tsparticles-engine", express.static("./node_modules/@tsparticles/engine"));
app.use("/tsparticles-pjs", express.static("./node_modules/@tsparticles/pjs"));
app.use("/tsparticles-slim", express.static("./node_modules/@tsparticles/slim"));
app.use("/tsparticles-confetti", express.static("./node_modules/@tsparticles/confetti"));
app.use("/tsparticles-fireworks", express.static("./node_modules/@tsparticles/fireworks"));
app.use("/tsparticles", express.static("./node_modules/tsparticles"));
app.use("/tsparticles-configs", express.static("./node_modules/@tsparticles/configs"));
app.use("/canvas-utils", express.static("./node_modules/@tsparticles/canvas-utils"));
app.use("/path-utils", express.static("./node_modules/@tsparticles/path-utils"));
app.use("/interaction-external-attract", express.static("./node_modules/@tsparticles/interaction-external-attract"));
app.use("/interaction-external-bounce", express.static("./node_modules/@tsparticles/interaction-external-bounce"));
app.use("/interaction-external-bubble", express.static("./node_modules/@tsparticles/interaction-external-bubble"));
app.use("/interaction-external-connect", express.static("./node_modules/@tsparticles/interaction-external-connect"));
app.use("/interaction-external-grab", express.static("./node_modules/@tsparticles/interaction-external-grab"));
app.use("/interaction-external-pause", express.static("./node_modules/@tsparticles/interaction-external-pause"));
app.use("/interaction-external-push", express.static("./node_modules/@tsparticles/interaction-external-push"));
app.use("/interaction-external-remove", express.static("./node_modules/@tsparticles/interaction-external-remove"));
app.use("/interaction-external-repulse", express.static("./node_modules/@tsparticles/interaction-external-repulse"));
app.use("/interaction-external-slow", express.static("./node_modules/@tsparticles/interaction-external-slow"));
app.use("/interaction-particles-attract", express.static("./node_modules/@tsparticles/interaction-particles-attract"));
app.use(
    "/interaction-particles-collisions",
    express.static("./node_modules/@tsparticles/interaction-particles-collisions")
);
app.use("/interaction-particles-links", express.static("./node_modules/@tsparticles/interaction-particles-links"));
app.use("/shape-circle", express.static("./node_modules/@tsparticles/shape-circle"));
app.use("/shape-emoji", express.static("./node_modules/@tsparticles/shape-emoji"));
app.use("/shape-image", express.static("./node_modules/@tsparticles/shape-image"));
app.use("/shape-line", express.static("./node_modules/@tsparticles/shape-line"));
app.use("/shape-polygon", express.static("./node_modules/@tsparticles/shape-polygon"));
app.use("/shape-square", express.static("./node_modules/@tsparticles/shape-square"));
app.use("/shape-star", express.static("./node_modules/@tsparticles/shape-star"));
app.use("/shape-text", express.static("./node_modules/@tsparticles/shape-text"));
app.use("/updater-life", express.static("./node_modules/@tsparticles/updater-life"));
app.use("/updater-opacity", express.static("./node_modules/@tsparticles/updater-opacity"));
app.use("/updater-size", express.static("./node_modules/@tsparticles/updater-size"));
app.use("/updater-color", express.static("./node_modules/@tsparticles/updater-color"));
app.use("/updater-destroy", express.static("./node_modules/@tsparticles/updater-destroy"));
app.use("/updater-stroke-color", express.static("./node_modules/@tsparticles/updater-stroke-color"));
app.use("/updater-out-modes", express.static("./node_modules/@tsparticles/updater-out-modes"));
app.use("/updater-rotate", express.static("./node_modules/@tsparticles/updater-rotate"));
app.use("/updater-tilt", express.static("./node_modules/@tsparticles/updater-tilt"));
app.use("/updater-twinkle", express.static("./node_modules/@tsparticles/updater-twinkle"));
app.use("/updater-roll", express.static("./node_modules/@tsparticles/updater-roll"));
app.use("/updater-wobble", express.static("./node_modules/@tsparticles/updater-wobble"));
app.use("/interaction-external-trail", express.static("./node_modules/@tsparticles/interaction-external-trail"));
app.use("/plugin-absorbers", express.static("./node_modules/@tsparticles/plugin-absorbers"));
app.use("/plugin-emitters", express.static("./node_modules/@tsparticles/plugin-emitters"));
app.use("/plugin-interactivity", express.static("./node_modules/@tsparticles/plugin-interactivity"));
app.use("/plugin-polygon-mask", express.static("./node_modules/@tsparticles/plugin-polygon-mask"));
app.use("/plugin-poisson-disc", express.static("./node_modules/@tsparticles/plugin-poisson-disc"));
app.use("/interaction-external-parallax", express.static("./node_modules/@tsparticles/interaction-external-parallax"));
app.use("/interaction-external-particle", express.static("./node_modules/@tsparticles/interaction-external-particle"));
app.use("/interaction-external-pop", express.static("./node_modules/@tsparticles/interaction-external-pop"));
app.use("/interaction-light", express.static("./node_modules/@tsparticles/interaction-light"));
app.use("/interaction-particles-repulse", express.static("./node_modules/@tsparticles/interaction-particles-repulse"));
app.use("/updater-gradient", express.static("./node_modules/@tsparticles/updater-gradient"));
app.use("/updater-orbit", express.static("./node_modules/@tsparticles/updater-orbit"));
app.use("/move-base", express.static("./node_modules/@tsparticles/move-base"));
app.use("/path-branches", express.static("./node_modules/@tsparticles/path-branches"));
app.use("/path-brownian", express.static("./node_modules/@tsparticles/path-brownian"));
app.use("/path-curves", express.static("./node_modules/@tsparticles/path-curves"));
app.use("/path-curl-noise", express.static("./node_modules/@tsparticles/path-curl-noise"));
app.use("/path-fractal-noise", express.static("./node_modules/@tsparticles/path-fractal-noise"));
app.use("/path-grid", express.static("./node_modules/@tsparticles/path-grid"));
app.use("/path-levy", express.static("./node_modules/@tsparticles/path-levy"));
app.use("/path-perlin-noise", express.static("./node_modules/@tsparticles/path-perlin-noise"));
app.use("/path-polygon", express.static("./node_modules/@tsparticles/path-polygon"));
app.use("/path-simplex-noise", express.static("./node_modules/@tsparticles/path-simplex-noise"));
app.use("/path-spiral", express.static("./node_modules/@tsparticles/path-spiral"));
app.use("/path-svg", express.static("./node_modules/@tsparticles/path-svg"));
app.use("/path-utils", express.static("./node_modules/@tsparticles/path-utils"));
app.use("/path-zig-zag", express.static("./node_modules/@tsparticles/path-zig-zag"));
app.use("/plugin-background-mask", express.static("./node_modules/@tsparticles/plugin-background-mask"));
app.use("/plugin-blend", express.static("./node_modules/@tsparticles/plugin-blend"));
app.use("/plugin-canvas-mask", express.static("./node_modules/@tsparticles/plugin-canvas-mask"));
app.use("/plugin-easing-back", express.static("./node_modules/@tsparticles/plugin-easing-back"));
app.use("/plugin-easing-bounce", express.static("./node_modules/@tsparticles/plugin-easing-bounce"));
app.use("/plugin-easing-circ", express.static("./node_modules/@tsparticles/plugin-easing-circ"));
app.use("/plugin-easing-cubic", express.static("./node_modules/@tsparticles/plugin-easing-cubic"));
app.use("/plugin-easing-elastic", express.static("./node_modules/@tsparticles/plugin-easing-elastic"));
app.use("/plugin-easing-expo", express.static("./node_modules/@tsparticles/plugin-easing-expo"));
app.use("/plugin-easing-gaussian", express.static("./node_modules/@tsparticles/plugin-easing-gaussian"));
app.use("/plugin-easing-linear", express.static("./node_modules/@tsparticles/plugin-easing-linear"));
app.use("/plugin-easing-quad", express.static("./node_modules/@tsparticles/plugin-easing-quad"));
app.use("/plugin-easing-quart", express.static("./node_modules/@tsparticles/plugin-easing-quart"));
app.use("/plugin-easing-quint", express.static("./node_modules/@tsparticles/plugin-easing-quint"));
app.use("/plugin-easing-sigmoid", express.static("./node_modules/@tsparticles/plugin-easing-sigmoid"));
app.use("/plugin-easing-sine", express.static("./node_modules/@tsparticles/plugin-easing-sine"));
app.use("/plugin-easing-smoothstep", express.static("./node_modules/@tsparticles/plugin-easing-smoothstep"));
app.use("/plugin-emitters-shape-canvas", express.static("./node_modules/@tsparticles/plugin-emitters-shape-canvas"));
app.use("/plugin-emitters-shape-circle", express.static("./node_modules/@tsparticles/plugin-emitters-shape-circle"));
app.use("/plugin-emitters-shape-path", express.static("./node_modules/@tsparticles/plugin-emitters-shape-path"));
app.use("/plugin-emitters-shape-polygon", express.static("./node_modules/@tsparticles/plugin-emitters-shape-polygon"));
app.use("/plugin-emitters-shape-square", express.static("./node_modules/@tsparticles/plugin-emitters-shape-square"));
app.use("/plugin-export-image", express.static("./node_modules/@tsparticles/plugin-export-image"));
app.use("/plugin-export-json", express.static("./node_modules/@tsparticles/plugin-export-json"));
app.use("/plugin-export-video", express.static("./node_modules/@tsparticles/plugin-export-video"));
app.use("/plugin-hex-color", express.static("./node_modules/@tsparticles/plugin-hex-color"));
app.use("/plugin-hsl-color", express.static("./node_modules/@tsparticles/plugin-hsl-color"));
app.use("/plugin-hsv-color", express.static("./node_modules/@tsparticles/plugin-hsv-color"));
app.use("/plugin-hwb-color", express.static("./node_modules/@tsparticles/plugin-hwb-color"));
app.use("/plugin-lab-color", express.static("./node_modules/@tsparticles/plugin-lab-color"));
app.use("/plugin-lch-color", express.static("./node_modules/@tsparticles/plugin-lch-color"));
app.use("/plugin-named-color", express.static("./node_modules/@tsparticles/plugin-named-color"));
app.use("/plugin-oklab-color", express.static("./node_modules/@tsparticles/plugin-oklab-color"));
app.use("/plugin-oklch-color", express.static("./node_modules/@tsparticles/plugin-oklch-color"));
app.use("/plugin-rgb-color", express.static("./node_modules/@tsparticles/plugin-rgb-color"));
app.use("/plugin-infection", express.static("./node_modules/@tsparticles/plugin-infection"));
app.use("/plugin-manual-particles", express.static("./node_modules/@tsparticles/plugin-manual-particles"));
app.use("/plugin-motion", express.static("./node_modules/@tsparticles/plugin-motion"));
app.use("/plugin-responsive", express.static("./node_modules/@tsparticles/plugin-responsive"));
app.use("/plugin-sounds", express.static("./node_modules/@tsparticles/plugin-sounds"));
app.use("/plugin-themes", express.static("./node_modules/@tsparticles/plugin-themes"));
app.use("/plugin-trail", express.static("./node_modules/@tsparticles/plugin-trail"));
app.use("/effect-bubble", express.static("./node_modules/@tsparticles/effect-bubble"));
app.use("/effect-shadow", express.static("./node_modules/@tsparticles/effect-shadow"));
app.use("/effect-trail", express.static("./node_modules/@tsparticles/effect-trail"));
app.use("/shape-arrow", express.static("./node_modules/@tsparticles/shape-arrow"));
app.use("/shape-cards", express.static("./node_modules/@tsparticles/shape-cards"));
app.use("/shape-cog", express.static("./node_modules/@tsparticles/shape-cog"));
app.use("/shape-heart", express.static("./node_modules/@tsparticles/shape-heart"));
app.use("/shape-infinity", express.static("./node_modules/@tsparticles/shape-infinity"));
app.use("/shape-path", express.static("./node_modules/@tsparticles/shape-path"));
app.use("/shape-rounded-polygon", express.static("./node_modules/@tsparticles/shape-rounded-polygon"));
app.use("/shape-rounded-rect", express.static("./node_modules/@tsparticles/shape-rounded-rect"));
app.use("/shape-spiral", express.static("./node_modules/@tsparticles/shape-spiral"));
app.use("/stats.ts", express.static("./node_modules/stats.ts/"));

app.get("/", function (req, res) {
    logger.info("index requested");

    res.render("index");
});

app.get("/basic", function (req, res) {
    logger.info("basic requested");

    res.render("basic");
});

app.get("/bundle", function (req, res) {
    logger.info("bundle requested");

    res.render("bundle");
});

app.get("/playground", function (req, res) {
    logger.info("playground requested");

    res.render("playground");
});

app.get("/confetti", function (req, res) {
    logger.info("confetti requested");

    res.render("confetti");
});

app.get("/fireworks", function (req, res) {
    logger.info("firefox requested");

    res.render("fireworks");
});

app.get("/domEmitters", function (req, res) {
    logger.info("dom emitters requested");

    res.render("domEmitters");
});

app.get("/slim", function (req, res) {
    logger.info("slim requested");

    res.render("slim");
});

app.get("/themes", function (req, res) {
    logger.info("themes requested");

    res.render("themes");
});

app.get("/click", function (req, res) {
    logger.info("click requested");

    res.render("click");
});

app.get("/noid", function (req, res) {
    logger.info("noid requested");

    res.render("noid");
});

app.get("/pjs", function (req, res) {
    logger.info("pjs requested");

    res.render("pjs");
});

app.get("/pjs2", function (req, res) {
    logger.info("pjs2 requested");

    res.render("pjs2");
});

const port = 3000;

if (cluster.isMaster) {
    for (let i = 0; i < numCpus; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker) => {
        logger.info(`worker ${worker.process.pid} died`);

        cluster.fork();
    });

    process.on("SIGHUP", function () {
        if (!cluster.workers) {
            return;
        }

        for (const worker of Object.values(cluster.workers)) {
            worker?.process.kill("SIGTERM");
        }
    });

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
    //app.use(helmet()); // Safari requires https, probably a bug
} else {
    process.on("SIGHUP", function () {
        //no-op
    });

    app.use(connectLiveReload());

    app.listen(port, () => logger.info(`Server working with pid ${process.pid} at localhost with port ${port}`));
}
