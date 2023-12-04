const { loadParticlesBundle } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesBundle({ moduleName: "perlin.noise", bundle: false, bundleName: "Perlin Noise", version, dir: __dirname });
