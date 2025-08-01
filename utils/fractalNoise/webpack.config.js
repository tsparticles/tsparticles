const { loadParticlesBundle } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesBundle({ moduleName: "fractal.noise", bundle: false, bundleName: "Fractal Noise", version, dir: __dirname });
