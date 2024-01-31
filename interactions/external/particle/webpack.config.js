const { loadParticlesInteractionExternal } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesInteractionExternal({
    moduleName: "particle",
    pluginName: "Particle",
    version,
    dir: __dirname
});
