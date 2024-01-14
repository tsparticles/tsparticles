const { loadParticlesPath } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPath({ moduleName: "zigzag", pluginName: "Zig Zag", version, dir: __dirname });
