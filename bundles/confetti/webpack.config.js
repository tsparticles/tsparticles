const { loadParticlesBundle } = require("webpack-tsparticles-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesBundle("confetti", "Confetti", version, __dirname);
