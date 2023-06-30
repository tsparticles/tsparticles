const { loadParticlesShape } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesShape({
    moduleName: "multiline-text",
    pluginName: "Multiline Text",
    version,
    dir: __dirname
});
