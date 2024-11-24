const { loadParticlesPlugin } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPlugin({
  moduleName: "hexColor",
  pluginName: "Hex Color",
  version,
  dir: __dirname,
});
