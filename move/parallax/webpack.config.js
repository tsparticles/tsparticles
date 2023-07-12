const { loadParticlesMove } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesMove({ moduleName: "parallax", pluginName: "Parallax", version, dir: __dirname });
