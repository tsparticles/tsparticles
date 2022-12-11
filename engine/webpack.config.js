const { loadParticlesEngine } = require("webpack-tsparticles-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesEngine(version, __dirname);
