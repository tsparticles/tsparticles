const {loadParticlesInteractionExternal} = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesInteractionExternal("bubble", "Bubble", version, __dirname);
