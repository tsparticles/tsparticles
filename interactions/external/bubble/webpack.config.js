const {loadParticlesInteractionExternal} = require("webpack-tsparticles-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesInteractionExternal("bubble", "Bubble", version, __dirname);
