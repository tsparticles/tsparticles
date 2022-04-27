const { loadParticlesMove } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesMove("parallax", "Parallax", version, __dirname);
