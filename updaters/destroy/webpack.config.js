const { loadParticlesUpdater } = require("webpack-tsparticles-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesUpdater("destroy", "Destroy", version, __dirname);
