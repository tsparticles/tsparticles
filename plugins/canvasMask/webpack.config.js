const { loadParticlesPlugin } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPlugin({ moduleName: "canvas-mask", pluginName: "Canvas Mask", version, dir: __dirname });
