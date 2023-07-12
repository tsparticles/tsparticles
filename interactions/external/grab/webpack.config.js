const { loadParticlesInteractionExternal } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesInteractionExternal({ moduleName: "grab", pluginName: "Grab", version, dir: __dirname });
