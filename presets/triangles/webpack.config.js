const { loadParticlesPreset } = require("webpack-tsparticles-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPreset("triangles", "Triangles", version, __dirname);
