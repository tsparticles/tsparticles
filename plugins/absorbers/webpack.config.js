const { loadParticlesPlugin } = require("webpack-tsparticles-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPlugin("absorbers", "Absorbers", version, __dirname);
