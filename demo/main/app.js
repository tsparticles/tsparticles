const express = require('express');
const helmet = require('helmet');
const stylus = require('stylus');

const app = express();

app.use(helmet());

const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');
app.use(stylus.middleware('./public'));
app.use(express.static('./public'));
app.use("/fontawesome", express.static("../../node_modules/@fortawesome/fontawesome-free"));
app.use("/jsoneditor", express.static("../../node_modules/jsoneditor/dist"));
app.use("/jquery", express.static("../../node_modules/jquery/dist"));
app.use("/popper.js", express.static("../../node_modules/popper.js/dist"));
app.use("/bootstrap", express.static("../../node_modules/bootstrap/dist"));
app.use("/tsparticles", express.static("../../node_modules/tsparticles/dist"));
app.use("/preset-basic", express.static("../../node_modules/tsparticles-preset-basic/dist"));
app.use("/three", express.static("../../node_modules/three/"));
app.use("/pathseg", express.static("../../node_modules/pathseg/"));

app.get('/', function (req, res) {
    res.render('index');
});

app.listen(port, () => console.log(`Demo app listening on port ${port}!`));
