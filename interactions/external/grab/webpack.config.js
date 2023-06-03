const {loadParticlesInteractionExternal} = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesInteractionExternal("grab", "Grab", version, __dirname);
