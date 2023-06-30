const { loadParticlesInteractionParticles } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesInteractionParticles({
    moduleName: "collisions",
    pluginName: "Collisions",
    version,
    dir: __dirname
});
