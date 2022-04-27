const {loadParticlesInteractionParticles} = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesInteractionParticles("links", "Links", version, __dirname);
