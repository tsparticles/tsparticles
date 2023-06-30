const { loadParticlesPluginEasing } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPluginEasing({ moduleName: "quint", pluginName: "Quint", version, dir: __dirname });
