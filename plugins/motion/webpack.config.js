const {loadParticlesPlugin} = require("webpack-tsparticles-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPlugin("motion", "Motion", version, __dirname);
