const { loadParticlesMove } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesMove("base", "Base", version, __dirname);
