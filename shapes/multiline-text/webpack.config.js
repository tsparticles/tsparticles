const { loadParticlesShape } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesShape({
    moduleName: "multiline-text",
    shapeName: "Multiline Text",
    version,
    dir: __dirname
});
