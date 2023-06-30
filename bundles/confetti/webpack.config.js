const { loadParticlesBundle } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesBundle({ moduleName: "confetti", pluginName: "Confetti", version, dir: __dirname });
