const { loadParticlesPluginExport } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPluginExport({ moduleName: "image", pluginName: "Image", version, dir: __dirname });
