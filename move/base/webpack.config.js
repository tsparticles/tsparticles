const { loadParticlesMove } = require("webpack-tsparticles-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesMove("base", "Base", version, __dirname);
