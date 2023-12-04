const { loadParticlesPluginEmittersShape } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPluginEmittersShape({ moduleName: "canvas", pluginName: "Canvas", version, dir: __dirname });
