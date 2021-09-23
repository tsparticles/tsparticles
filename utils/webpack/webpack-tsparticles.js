const {loadParticlesBundle} = require("./bundles/buildBundle");
const {loadParticlesPlugin} = require("./plugins/buildPlugin");
const {loadParticlesPreset} = require("./presets/buildPreset");
const {loadParticlesShape} = require("./shapes/buildShape");

module.exports = {
    loadParticlesBundle,
    loadParticlesPlugin,
    loadParticlesPreset,
    loadParticlesShape
};
