const {loadParticlesPlugin} = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPlugin("motion", "Motion", version, __dirname);
