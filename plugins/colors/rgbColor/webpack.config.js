const { loadParticlesPlugin } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPlugin({
  moduleName: "rgbColor",
  pluginName: "RGB Color",
  version,
  dir: __dirname,
});
