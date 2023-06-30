const { loadParticlesPath } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPath({
    moduleName: "simplex.noise",
    pluginName: "Simplex Noise",
    version,
    dir: __dirname
});
