const { loadParticlesPluginEmittersShape } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPluginEmittersShape({ moduleName: "polygon", pluginName: "Polygon", version, dir: __dirname });
