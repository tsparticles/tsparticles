const { loadParticlesPath } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPath({ moduleName: "polygon", pluginName: "Polygon", version, dir: __dirname });
