const { loadParticlesUpdater } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesUpdater({ moduleName: "wobble", pluginName: "Wobble", version, dir: __dirname });
