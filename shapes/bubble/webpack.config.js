const { loadParticlesShape } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesShape({ moduleName: "bubble", shapeName: "Bubble", version, dir: __dirname });
