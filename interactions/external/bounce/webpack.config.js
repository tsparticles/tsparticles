const {loadParticlesInteractionExternal} = require("webpack-tsparticles-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesInteractionExternal("bounce", "Bounce", version, __dirname);
