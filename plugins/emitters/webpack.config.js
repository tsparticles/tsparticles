const {loadParticlesPlugin} = require("webpack-tsparticles-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPlugin("emitters", "Emitters", version, __dirname);
