const express = require('express');
const helmet = require('helmet');
const stylus = require('stylus');

const app = express();

app.use(helmet());

const port = 3000;

app.set('views', './demo/views');
app.set('view engine', 'pug');
app.use(stylus.middleware('./demo/public'));
app.use(express.static('./demo/public'));
app.use("/fontawesome", express.static("../../node_modules/@fortawesome/fontawesome-free"));
app.use("/jsoneditor", express.static("../../node_modules/jsoneditor/dist"));
app.use("/tsparticles", express.static("../../node_modules/tsparticles/dist"));
app.use("/jquery-tsparticles", express.static("./dist"));
app.use("/three", express.static("../../node_modules/three/"));
app.use("/jquery", express.static("../../node_modules/jquery/dist/"));

app.get('/', function (req, res) {
    res.render('index');
});

app.listen(port, () => console.log(`Demo app listening on port ${port}!`));
