const {loadParticlesShape} = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesShape("circle", "Circle", version, __dirname);
