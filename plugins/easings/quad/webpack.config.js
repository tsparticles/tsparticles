const { loadParticlesPluginEasing } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPluginEasing({ moduleName: "quad", pluginName: "Quad", version, dir: __dirname });
