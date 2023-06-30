const { loadParticlesInteractionExternal } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesInteractionExternal({
    moduleName: "attract",
    pluginName: "Attract",
    version,
    dir: __dirname
});
