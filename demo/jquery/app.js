const express = require('express');
const helmet = require('helmet');
const stylus = require('stylus');

const app = express();

//app.use(helmet());

const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');
app.use(stylus.middleware('./public'));
app.use(express.static('./public'));
app.use("/fontawesome", express.static("./node_modules/@fortawesome/fontawesome-free"));
app.use("/jsoneditor", express.static("./node_modules/jsoneditor/dist"));
app.use("/tsparticles", express.static("./node_modules/tsparticles/dist"));
app.use("/jquery-particles", express.static("./node_modules/jquery-particles/dist"));
app.use("/preset-links", express.static("./node_modules/tsparticles-preset-links/dist"));
app.use("/stats", express.static("./node_modules/stats.ts/"));
app.use("/jquery", express.static("./node_modules/jquery/dist/"));

app.get('/', function (req, res) {
    res.render('index');
});

app.listen(port, () => console.log(`Demo app listening on port ${port}!`));
