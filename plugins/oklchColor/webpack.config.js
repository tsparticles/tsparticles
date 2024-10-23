const { loadParticlesPlugin } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPlugin({
  moduleName: "oklchColor",
  pluginName: "OKLCH Color",
  version,
  dir: __dirname,
});
