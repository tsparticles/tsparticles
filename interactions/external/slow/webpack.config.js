const { loadParticlesInteractionExternal } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesInteractionExternal({ moduleName: "slow", pluginName: "Slow", version, dir: __dirname });
