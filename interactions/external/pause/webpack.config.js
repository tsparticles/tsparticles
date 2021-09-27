const {loadParticlesInteractionExternal} = require("webpack-tsparticles-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesInteractionExternal("pause", "Pause", version, __dirname);
