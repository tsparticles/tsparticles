const { loadParticlesPlugin } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPlugin({ moduleName: "sounds", pluginName: "Sounds", version, dir: __dirname });
