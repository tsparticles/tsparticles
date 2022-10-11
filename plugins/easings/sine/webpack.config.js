const { loadParticlesPluginEasing } = require("webpack-tsparticles-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPluginEasing("sine", "Sine", version, __dirname);
