const { loadParticlesShape } = require("webpack-tsparticles-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesShape("cards", "Cards", version, __dirname);
