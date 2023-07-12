const { loadParticlesPluginEasing } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPluginEasing({ moduleName: "back", pluginName: "Back", version, dir: __dirname });
