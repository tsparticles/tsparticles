const {loadParticlesBundle} = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesBundle("slim", "Slim", version, __dirname);
