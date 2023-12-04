const { loadParticlesPluginEmittersShape } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPluginEmittersShape({ moduleName: "circle", pluginName: "Circle", version, dir: __dirname });
