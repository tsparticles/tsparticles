const { loadParticlesPreset } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPreset("fire", "Fire", version, __dirname);
