import type { Main } from "tsparticles-engine";
import { loadParticlesMoveInteraction } from "tsparticles-interaction-particles-move";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { options } from "./options";

export function loadFirePreset(tsParticles: Main): void {
    loadCircleShape(tsParticles);
    loadParticlesMoveInteraction(tsParticles);
    loadOutModesUpdater(tsParticles);

    tsParticles.addPreset("fire", options);
}
