const {loadParticlesPath} = require("webpack-tsparticles-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPath("curves", "Curves", version, __dirname);
