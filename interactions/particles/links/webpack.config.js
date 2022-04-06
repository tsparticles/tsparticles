const {loadParticlesInteractionParticles} = require("webpack-tsparticles-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesInteractionParticles("links", "Links", version, __dirname);
