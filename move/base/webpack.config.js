const { loadParticlesMove } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesMove({ moduleName: "base", pluginName: "Base", version, dir: __dirname });
