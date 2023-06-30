const { loadParticlesPlugin } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPlugin({ moduleName: "motion", pluginName: "Motion", version, dir: __dirname });
