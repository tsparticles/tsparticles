const {loadParticlesInteractionParticles} = require("webpack-tsparticles-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesInteractionParticles("collisions", "Collisions", version, __dirname);
