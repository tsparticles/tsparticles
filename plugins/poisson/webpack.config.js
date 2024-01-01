const { loadParticlesPlugin } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPlugin({
    moduleName: "poisson",
    pluginName: "Poisson Disc",
    version,
    dir: __dirname
});
