const { loadParticlesPluginEasing } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPluginEasing({ moduleName: "cubic", pluginName: "Cubic", version, dir: __dirname });
