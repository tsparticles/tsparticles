const { loadParticlesInteraction } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesInteraction({ moduleName: "light", pluginName: "Light", version, dir: __dirname });
