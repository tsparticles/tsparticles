const { loadParticlesUpdater } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesUpdater({
    moduleName: "stroke-color",
    updaterName: "Stroke Color",
    version,
    dir: __dirname
});
