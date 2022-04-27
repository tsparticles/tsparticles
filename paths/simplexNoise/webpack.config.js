const {loadParticlesPath} = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPath("simplex.noise", "Simplex Noise", version, __dirname);
