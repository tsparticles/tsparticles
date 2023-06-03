const { loadParticlesPlugin } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPlugin("infection", "Infection", version, __dirname);
