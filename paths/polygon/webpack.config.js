const {loadParticlesPath} = require("webpack-tsparticles-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPath("polygon", "Polygon", version, __dirname);
