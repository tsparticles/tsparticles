const { loadParticlesPluginExport } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPluginExport({ moduleName: "json", pluginName: "JSON", version, dir: __dirname });
