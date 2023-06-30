const { loadParticlesUpdater } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesUpdater({
    moduleName: "stroke-color",
    pluginName: "Stroke Color",
    version,
    dir: __dirname
});
