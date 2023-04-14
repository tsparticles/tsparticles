const {loadParticlesInteractionParticles} = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesInteractionParticles("repulse", "Repulse", version, __dirname);
