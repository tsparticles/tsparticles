import type { Main } from "tsparticles-engine";
import { loadParticlesMoveInteraction } from "tsparticles-interaction-particles-move";
import { loadEmittersPlugin } from "tsparticles-plugin-emitters";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadSizeUpdater } from "tsparticles-updater-size";
import { seaPathGenerator } from "./pathGen";
import { options, pathGeneratorName, presetName } from "./options";

export function loadSeaAnemonePreset(tsParticles: Main): void {
    loadParticlesMoveInteraction(tsParticles);
    loadEmittersPlugin(tsParticles);
    loadCircleShape(tsParticles);
    loadSizeUpdater(tsParticles);

    tsParticles.addPreset(presetName, options);
    tsParticles.addPathGenerator(pathGeneratorName, seaPathGenerator);
}
