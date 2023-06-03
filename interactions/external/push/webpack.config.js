const {loadParticlesInteractionExternal} = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesInteractionExternal("push", "Push", version, __dirname);
