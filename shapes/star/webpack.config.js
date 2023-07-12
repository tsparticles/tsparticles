const { loadParticlesShape } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesShape({ moduleName: "star", shapeName: "Star", version, dir: __dirname });
