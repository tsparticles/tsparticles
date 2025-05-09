const { loadParticlesPath } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPath({ moduleName: "fractal.noise", pluginName: "Fractal Noise", version, dir: __dirname });
