const { loadParticlesPluginEmittersShape } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPluginEmittersShape({ moduleName: "path", pluginName: "Path", version, dir: __dirname });
