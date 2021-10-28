const {loadParticlesBundle} = require("webpack-tsparticles-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesBundle("pjs", "Particles.js", version, __dirname);
