const {loadParticlesPlugin} = require("webpack-tsparticles-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPlugin("sounds", "Sounds", version, __dirname);
