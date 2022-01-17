const { loadParticlesMove } = require("webpack-tsparticles-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesMove("parallax", "Parallax", version, __dirname);
