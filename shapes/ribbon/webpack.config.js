const {loadParticlesShape} = require("webpack-tsparticles-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesShape("ribbon", "Ribbon", version, __dirname);
