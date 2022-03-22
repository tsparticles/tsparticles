const express = require('express');
const helmet = require('helmet');
const stylus = require('stylus');
const rateLimit = require("express-rate-limit");

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
// app.use(helmet()); // Safari requires https, probably a bug

const port = 3001;

app.set('views', './views');
app.set('view engine', 'pug');
app.use(stylus.middleware('./public'));
app.use(express.static('./public'));
app.use("/tsparticles", express.static("./node_modules/tsparticles"));
app.use("/object-gui", express.static("./node_modules/object-gui/dist"));
app.use("/tsparticles-editor", express.static("./node_modules/tsparticles-editor/dist"));

app.get('/', function (req, res) {
    res.render('index');
});

app.listen(port, () => console.log(`Demo app listening on port ${port}!`));
