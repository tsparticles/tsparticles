const {loadParticlesPreset} = require("./presets/buildPreset");
const {loadParticlesShape} = require("./shapes/buildShape");
const {loadParticlesPlugin} = require("./plugins/buildPlugin");

module.exports = {
    loadParticlesPreset,
    loadParticlesShape,
    loadParticlesPlugin
};
