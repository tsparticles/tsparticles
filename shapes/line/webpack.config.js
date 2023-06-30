const { loadParticlesShape } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesShape({ moduleName: "line", pluginName: "Line", version, dir: __dirname });
