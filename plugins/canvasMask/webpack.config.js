const {loadParticlesPlugin} = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPlugin("canvas-mask", "Canvas Mask", version, __dirname);
