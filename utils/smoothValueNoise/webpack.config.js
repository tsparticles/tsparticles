const { loadParticlesBundle } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesBundle({ moduleName: "smooth.value.noise", bundle: false, bundleName: "Smooth Value Noise", version, dir: __dirname });
