const { loadParticlesUpdater } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesUpdater("rotate", "Rotate", version, __dirname);
