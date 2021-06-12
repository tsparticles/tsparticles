import type { Main } from "tsparticles-engine";
import { loadParticlesMoveInteraction } from "tsparticles-interaction-particles-move";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadEmittersPlugin } from "tsparticles-plugin-emitters";
import { options } from "./options";

export function loadBigCirclesPreset(tsParticles: Main): void {
    loadCircleShape(tsParticles);
    loadParticlesMoveInteraction(tsParticles);
    loadOutModesUpdater(tsParticles);
    loadEmittersPlugin(tsParticles);

    tsParticles.addPreset("bigCircles", options);
    tsParticles.addPreset("big-circles", options);
}
