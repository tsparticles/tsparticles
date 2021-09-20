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
app.use("/tsparticles", express.static("./node_modules/tsparticles/dist"));
app.use("/web-particles", express.static("./node_modules/web-particles/dist"));
app.use("/webcomponentsjs", express.static("./node_modules/@webcomponents/webcomponentsjs/"));

app.get('/', function (req, res) {
    res.render('index');
});

app.listen(port, () => console.log(`Demo app listening on port ${port}!`));
