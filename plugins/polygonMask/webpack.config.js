const {loadParticlesPlugin} = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPlugin("polygon-mask", "Polygon Mask", version, __dirname);
