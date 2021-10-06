const {loadParticlesPath} = require("webpack-tsparticles-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPath("perlin.noise", "Perlin Noise", version, __dirname);
