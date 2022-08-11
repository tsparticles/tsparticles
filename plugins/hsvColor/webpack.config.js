const { loadParticlesPlugin } = require("webpack-tsparticles-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPlugin("hsvColor", "HSV Color", version, __dirname);
