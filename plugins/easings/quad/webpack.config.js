const { loadParticlesPluginEasing } = require("webpack-tsparticles-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPluginEasing("quad", "Quad", version, __dirname);
