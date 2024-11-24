const { loadParticlesPlugin } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPlugin({
  moduleName: "hslColor",
  pluginName: "HSL Color",
  version,
  dir: __dirname,
});
