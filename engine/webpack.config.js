const { loadParticlesEngine } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesEngine(version, __dirname);
