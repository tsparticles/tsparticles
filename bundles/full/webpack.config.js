const {loadParticlesBundle} = require("webpack-tsparticles-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesBundle("", "", version, __dirname);
