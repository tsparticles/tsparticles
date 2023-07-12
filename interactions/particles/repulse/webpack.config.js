const { loadParticlesInteractionParticles } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesInteractionParticles({
    moduleName: "repulse",
    pluginName: "Repulse",
    version,
    dir: __dirname
});
