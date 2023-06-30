const { loadParticlesPluginEasing } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPluginEasing({ moduleName: "expo", pluginName: "Expo", version, dir: __dirname });
