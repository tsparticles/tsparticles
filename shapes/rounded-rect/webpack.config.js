const { loadParticlesShape } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesShape({
    moduleName: "rounded-rect",
    shapeName: "Rounded Rect",
    version,
    dir: __dirname
});
