const { loadParticlesPluginExport } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPluginExport({ moduleName: "video", pluginName: "Video", version, dir: __dirname });
