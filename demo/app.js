const express = require('express');
const stylus = require('stylus');

const app = express();
const port = 3000;

app.set('views', './demo/views');
app.set('view engine', 'pug');
app.use(stylus.middleware('./demo/public'));
app.use(express.static('./demo/public'));
app.use("/jsoneditor", express.static("./node_modules/jsoneditor/dist"));
app.use("/tsparticles", express.static("./dist"));
app.use("/docs", express.static("./docs"));

app.get('/', function (req, res) {
    res.render('index');
});

app.listen(port, () => console.log(`Demo app listening on port ${port}!`));
