const { loadParticlesEffect } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesEffect({ moduleName: "trail", effectName: "Trail", version, dir: __dirname });
