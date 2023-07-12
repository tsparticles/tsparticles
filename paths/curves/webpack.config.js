const { loadParticlesPath } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPath({ moduleName: "curves", pluginName: "Curves", version, dir: __dirname });
