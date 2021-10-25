const {loadParticlesConfigs} = require("webpack-tsparticles-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesConfigs(version, __dirname);
