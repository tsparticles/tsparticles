const { loadParticlesPlugin } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPlugin({
  moduleName: "namedColor",
  pluginName: "Named Color",
  version,
  dir: __dirname,
});
