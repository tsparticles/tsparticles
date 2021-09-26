const { loadParticlesUpdater } = require("webpack-tsparticles-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesUpdater("tilt", "Tilt", version, __dirname);
