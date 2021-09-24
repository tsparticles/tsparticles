const {loadParticlesBundle} = require("./bundles/buildBundle");
const {loadParticlesInteraction} = require("./interactions/buildInteraction");
const {loadParticlesInteractionParticles} = require("./interactions/particles/buildInteractionParticles");
const {loadParticlesPath} = require("./paths/buildPath");
const {loadParticlesPlugin} = require("./plugins/buildPlugin");
const {loadParticlesPreset} = require("./presets/buildPreset");
const {loadParticlesShape} = require("./shapes/buildShape");
const {loadParticlesUpdater} = require("./updaters/buildUpdater")

module.exports = {
    loadParticlesBundle,
    loadParticlesInteraction,
    loadParticlesInteractionParticles,
    loadParticlesPath,
    loadParticlesPlugin,
    loadParticlesPreset,
    loadParticlesShape,
    loadParticlesUpdater
};
