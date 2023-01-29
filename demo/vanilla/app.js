const cluster = require('node:cluster');
const express = require('express');
const helmet = require('helmet');
const stylus = require('stylus');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');
const os = require('os');
const winston = require('winston');
const { SeqTransport } = require('@datalust/winston-seq');
const dotenv = require('dotenv');
//const rateLimit = require("express-rate-limit");

const app = express();
const numCpus = os.cpus().length;

dotenv.config();

/*const limiter = rateLimit({
    windowMs: 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);*/
// app.use(helmet()); // Safari requires https, probably a bug

let seqTransport = undefined;

if (process.env.USE_SEQ) {
    seqTransport = new SeqTransport({
        serverUrl: `http${process.env.SEQ_SSL === "true" ? "s" : ""}://${process.env.SEQ_HOST}:${process.env.SEQ_PORT}`,
        apiKey: process.env.SEQ_KEY,
        onError: (e => {
            console.error(e)
        }),
        handleExceptions: true,
        handleRejections: true,
    });
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(  /* This is required to get errors to log with stack traces. See https://github.com/winstonjs/winston/issues/1498 */
        winston.format.errors({ stack: true }),
        winston.format.json(),
    ),
    defaultMeta: { /* application: 'your-app-name' */ },
    transports: [
        seqTransport || new winston.transports.Console({
            format: winston.format.simple(),
        }),
    ]
});

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
app.use("/tsparticles-engine", express.static("./node_modules/@tsparticles/engine"));
app.use("/tsparticles-pjs", express.static("./node_modules/@tsparticles/pjs"));
app.use("/tsparticles-slim", express.static("./node_modules/@tsparticles/slim"));
app.use("/tsparticles", express.static("./node_modules/tsparticles"));
app.use("/demo-configs", express.static("./node_modules/@tsparticles/demo-configs"));
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
app.use("/interaction-particles-collisions", express.static("./node_modules/@tsparticles/interaction-particles-collisions"));
app.use("/interaction-particles-links", express.static("./node_modules/@tsparticles/interaction-particles-links"));
app.use("/shape-circle", express.static("./node_modules/@tsparticles/shape-circle"));
app.use("/shape-image", express.static("./node_modules/@tsparticles/shape-image"));
app.use("/shape-line", express.static("./node_modules/@tsparticles/shape-line"));
app.use("/shape-polygon", express.static("./node_modules/@tsparticles/shape-polygon"));
app.use("/shape-square", express.static("./node_modules/@tsparticles/shape-square"));
app.use("/shape-star", express.static("./node_modules/@tsparticles/shape-star"));
app.use("/shape-text", express.static("./node_modules/@tsparticles/shape-text"));
app.use("/updater-life", express.static("./node_modules/@tsparticles/updater-life"));
app.use("/updater-opacity", express.static("./node_modules/@tsparticles/updater-opacity"));
app.use("/updater-size", express.static("./node_modules/@tsparticles/updater-size"));
app.use("/updater-angle", express.static("./node_modules/@tsparticles/updater-angle"));
app.use("/updater-color", express.static("./node_modules/@tsparticles/updater-color"));
app.use("/updater-destroy", express.static("./node_modules/@tsparticles/updater-destroy"));
app.use("/updater-stroke-color", express.static("./node_modules/@tsparticles/updater-stroke-color"));
app.use("/updater-out-modes", express.static("./node_modules/@tsparticles/updater-out-modes"));
app.use("/updater-tilt", express.static("./node_modules/@tsparticles/updater-tilt"))
app.use("/updater-twinkle", express.static("./node_modules/@tsparticles/updater-twinkle"))
app.use("/updater-roll", express.static("./node_modules/@tsparticles/updater-roll"))
app.use("/updater-wobble", express.static("./node_modules/@tsparticles/updater-wobble"))
app.use("/interaction-external-trail", express.static("./node_modules/@tsparticles/interaction-external-trail"))
app.use("/plugin-absorbers", express.static("./node_modules/@tsparticles/plugin-absorbers"))
app.use("/plugin-emitters", express.static("./node_modules/@tsparticles/plugin-emitters"))
app.use("/plugin-polygon-mask", express.static("./node_modules/@tsparticles/plugin-polygon-mask"))
app.use("/interaction-light", express.static("./node_modules/@tsparticles/interaction-light"));
app.use("/interaction-particles-repulse", express.static("./node_modules/@tsparticles/interaction-particles-repulse"));
app.use("/updater-gradient", express.static("./node_modules/@tsparticles/updater-gradient"));
app.use("/updater-orbit", express.static("./node_modules/@tsparticles/updater-orbit"));
app.use("/move-base", express.static("./node_modules/@tsparticles/move-base"));
app.use("/move-parallax", express.static("./node_modules/@tsparticles/move-parallax"));
app.use("/path-curves", express.static("./node_modules/@tsparticles/path-curves"));
app.use("/path-polygon", express.static("./node_modules/@tsparticles/path-polygon"));
app.use("/path-perlin-noise", express.static("./node_modules/@tsparticles/path-perlin-noise"));
app.use("/path-simplex-noise", express.static("./node_modules/@tsparticles/path-simplex-noise"));
app.use("/plugin-canvas-mask", express.static("./node_modules/@tsparticles/plugin-canvas-mask"));
app.use("/plugin-easing-back", express.static("./node_modules/@tsparticles/plugin-easing-back"));
app.use("/plugin-easing-circ", express.static("./node_modules/@tsparticles/plugin-easing-circ"));
app.use("/plugin-easing-cubic", express.static("./node_modules/@tsparticles/plugin-easing-cubic"));
app.use("/plugin-easing-expo", express.static("./node_modules/@tsparticles/plugin-easing-expo"));
app.use("/plugin-easing-quad", express.static("./node_modules/@tsparticles/plugin-easing-quad"));
app.use("/plugin-easing-quart", express.static("./node_modules/@tsparticles/plugin-easing-quart"));
app.use("/plugin-easing-quint", express.static("./node_modules/@tsparticles/plugin-easing-quint"));
app.use("/plugin-easing-sine", express.static("./node_modules/@tsparticles/plugin-easing-sine"));
app.use("/plugin-hsv-color", express.static("./node_modules/@tsparticles/plugin-hsv-color"));
app.use("/plugin-infection", express.static("./node_modules/@tsparticles/plugin-infection"));
app.use("/plugin-motion", express.static("./node_modules/@tsparticles/plugin-motion"));
app.use("/plugin-sounds", express.static("./node_modules/@tsparticles/plugin-sounds"));
app.use("/shape-bubble", express.static("./node_modules/@tsparticles/shape-bubble"));
app.use("/shape-cards", express.static("./node_modules/@tsparticles/shape-cards"));
app.use("/shape-heart", express.static("./node_modules/@tsparticles/shape-heart"));
app.use("/shape-multiline-text", express.static("./node_modules/@tsparticles/shape-multiline-text"));
app.use("/shape-path", express.static("./node_modules/@tsparticles/shape-path"));
app.use("/shape-ribbon", express.static("./node_modules/@tsparticles/shape-ribbon"));
app.use("/shape-rounded-rect", express.static("./node_modules/@tsparticles/shape-rounded-rect"));
app.use("/shape-spiral", express.static("./node_modules/@tsparticles/shape-spiral"));
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

const port = 3000;

if (cluster.isMaster) {
    for (let i = 0; i < numCpus; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        logger.info(`worker ${worker.process.pid} died`);

        cluster.fork();
    });

    process.on("SIGHUP", function () {
        for (const worker of Object.values(cluster.workers)) {
            worker.process.kill("SIGTERM");
        }
    });

    const liveReloadServer = livereload.createServer();

    liveReloadServer.server.once("connection", () => {
        setTimeout(() => {
            liveReloadServer.refresh("/");
        }, 100);
    });

    logger.info(`Cluster started with pid ${process.pid}`);
} else {
    process.on("SIGHUP", function () {
        //no-op
    })

    app.use(connectLiveReload());

    app.listen(port, () => logger.info(`Server working with pid ${process.pid} at localhost with port ${port}`));
}
