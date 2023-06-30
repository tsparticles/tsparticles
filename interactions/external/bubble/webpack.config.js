const { loadParticlesInteractionExternal } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesInteractionExternal({
    moduleName: "bubble",
    pluginName: "Bubble",
    version,
    dir: __dirname
});
