const { loadParticlesInteractionParticles } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesInteractionParticles({
    moduleName: "attract",
    pluginName: "Attract",
    version,
    dir: __dirname
});
