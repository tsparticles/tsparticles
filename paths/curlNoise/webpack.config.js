const { loadParticlesPath } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesPath({
    moduleName: "curl.noise",
    pluginName: "Curl Noise",
    version,
    dir: __dirname
});
