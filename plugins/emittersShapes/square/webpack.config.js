const { loadParticlesPluginEmittersShape } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPluginEmittersShape({ moduleName: "square", pluginName: "Square", version, dir: __dirname });
