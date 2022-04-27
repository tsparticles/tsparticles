const {loadParticlesPath} = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPath("curves", "Curves", version, __dirname);
