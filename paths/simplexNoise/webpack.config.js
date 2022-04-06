const {loadParticlesPath} = require("webpack-tsparticles-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPath("simplex.noise", "Simplex Noise", version, __dirname);
