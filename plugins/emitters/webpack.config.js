const { loadParticlesPlugin } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPlugin({ moduleName: "emitters", pluginName: "Emitters", version, dir: __dirname });
