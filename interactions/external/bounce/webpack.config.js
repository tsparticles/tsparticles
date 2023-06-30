const { loadParticlesInteractionExternal } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesInteractionExternal({
    moduleName: "bounce",
    pluginName: "Bounce",
    version,
    dir: __dirname
});
