const { loadParticlesBundle } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesBundle({ moduleName: "basic", bundleName: "Basic", version, dir: __dirname });
