const {loadParticlesInteractionParticles} = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesInteractionParticles("attract", "Attract", version, __dirname);
