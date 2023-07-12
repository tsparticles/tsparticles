const { loadParticlesShape } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesShape({ moduleName: "rounded-polygon", shapeName: "RoundedPolygon", version, dir: __dirname });
