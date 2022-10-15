const { loadParticlesPluginEasing } = require("webpack-tsparticles-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPluginEasing("quint", "Quint", version, __dirname);
