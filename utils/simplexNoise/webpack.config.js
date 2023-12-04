const {loadParticlesBundle} = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesBundle({
    moduleName: "simplex.noise",
    bundle: false,
    bundleName: "Simplex Noise",
    version,
    dir: __dirname
});
