const { loadParticlesUpdater } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesUpdater({ moduleName: "orbit", updaterName: "Orbit", version, dir: __dirname });
