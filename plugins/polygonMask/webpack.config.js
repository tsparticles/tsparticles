const { loadParticlesPlugin } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPlugin({
    moduleName: "polygon-mask",
    pluginName: "Polygon Mask",
    version,
    dir: __dirname
});
