const { loadParticlesInteractionExternal } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesInteractionExternal({
    moduleName: "pause",
    pluginName: "Pause",
    version,
    dir: __dirname
});
