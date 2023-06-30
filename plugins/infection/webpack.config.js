const { loadParticlesPlugin } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPlugin({ moduleName: "infection", pluginName: "Infection", version, dir: __dirname });
