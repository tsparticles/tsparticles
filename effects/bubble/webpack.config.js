const { loadParticlesEffect } = require("@tsparticles/webpack-plugin");
const version = require("./package.json").version;

module.exports = loadParticlesEffect({ moduleName: "bubble", effectName: "Bubble", version, dir: __dirname });
