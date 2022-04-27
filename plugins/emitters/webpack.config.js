const {loadParticlesPlugin} = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPlugin("emitters", "Emitters", version, __dirname);
