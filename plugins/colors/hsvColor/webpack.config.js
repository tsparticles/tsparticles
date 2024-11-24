const { loadParticlesPlugin } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPlugin({
  moduleName: "hsvColor",
  pluginName: "HSV Color",
  version,
  dir: __dirname,
});
