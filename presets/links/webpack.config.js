const { loadParticlesPreset } = require("webpack-tsparticles-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPreset("links", "Links", version, __dirname);
