const { loadParticlesBundle } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesBundle({ moduleName: "configs", bundleName: "Configs", version, dir: __dirname });
