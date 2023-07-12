const { loadParticlesInteractionExternal } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesInteractionExternal({
    moduleName: "repulse",
    pluginName: "Repulse",
    version,
    dir: __dirname
});
