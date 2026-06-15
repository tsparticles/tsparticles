const express = require("express");
const helmet = require("helmet");
const stylus = require("stylus");

const app = express();
const path = require("path");

// app.use(helmet()); // Safari requires https, probably a bug

// Allow overriding the demo port via environment variable when the default
// port is already in use on the developer machine.
const port = process.env.PORT || 3005;

 app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
 app.use(stylus.middleware(path.join(__dirname, "public")));
 app.use(express.static(path.join(__dirname, "public")));
// Serve the engine bundle from the repo's bundles output so the demo works
// without installing tsparticles into node_modules. The workspace contains
// bundles/full/dist/tsparticles.bundle.min.js which exposes the global
// tsParticles object the webcomponents wrapper reads at runtime.
app.use("/tsparticles", express.static(path.join(__dirname, "./node_modules/tsparticles")));

// Serve demo-local presets so the demo can reference /@tsparticles/configs/*
// without requiring the @tsparticles/configs package to be installed.
app.use("/@tsparticles/configs", express.static(path.join(__dirname, "./public/presets")));
// Serve the local build of the webcomponents wrapper so the demo picks up
// local changes during development instead of a package installed in
// node_modules. This points to the workspace package build output.
app.use(
  "/@tsparticles/webcomponents",
  express.static(path.join(__dirname, "./node_modules/@tsparticles/webcomponents")),
);
 app.use(
   "/webcomponentsjs",
   express.static(path.join(__dirname, "../../node_modules/@webcomponents/webcomponentsjs/")),
 );

app.get("/", function (req, res) {
  res.render("index");
});

app.listen(port, () => console.log(`Demo app listening on port ${port}!`));
