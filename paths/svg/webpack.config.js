const {loadParticlesPath} = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPath("svg", "SVG", version, __dirname);
