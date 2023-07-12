const { loadParticlesUpdater } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesUpdater({ moduleName: "color", updaterName: "Color", version, dir: __dirname });
