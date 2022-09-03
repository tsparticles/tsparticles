const {loadParticlesPlugin} = require("webpack-tsparticles-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPlugin("image-mask", "Image Mask", version, __dirname);
