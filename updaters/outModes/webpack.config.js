const { loadParticlesUpdater } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesUpdater({ moduleName: "out-modes", updaterName: "Out Modes", version, dir: __dirname });
