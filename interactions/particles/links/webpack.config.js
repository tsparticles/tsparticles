const { loadParticlesInteractionParticles } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesInteractionParticles({
    moduleName: "links",
    pluginName: "Links",
    version,
    dir: __dirname
});
