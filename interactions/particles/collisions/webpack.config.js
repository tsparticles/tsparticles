const {loadParticlesInteractionParticles} = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesInteractionParticles("collisions", "Collisions", version, __dirname);
