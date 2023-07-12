const { loadParticlesShape } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesShape({ moduleName: "circle", shapeName: "Circle", version, dir: __dirname });
