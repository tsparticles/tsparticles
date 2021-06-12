import { Main } from "tsparticles-engine";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadEmittersPlugin } from "tsparticles-plugin-emitters";
import { loadParticlesMoveInteraction } from "tsparticles-interaction-particles-move";
import { options } from "./options";

export function loadFountainPreset(tsParticles: Main): void {
    loadCircleShape(tsParticles);
    loadParticlesMoveInteraction(tsParticles);
    loadOutModesUpdater(tsParticles);
    loadEmittersPlugin(tsParticles);

    tsParticles.addPreset("fountain", options);
}
