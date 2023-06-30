const { loadParticlesPath } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPath({ moduleName: "perlin.noise", pluginName: "Perlin Noise", version, dir: __dirname });
