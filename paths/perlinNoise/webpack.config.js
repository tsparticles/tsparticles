const {loadParticlesPath} = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPath("perlin.noise", "Perlin Noise", version, __dirname);
