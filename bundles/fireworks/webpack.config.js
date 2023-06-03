const { loadParticlesBundle } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesBundle("fireworks", "Fireworks", version, __dirname);
