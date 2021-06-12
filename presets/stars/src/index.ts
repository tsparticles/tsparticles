import { Main } from "tsparticles-engine";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadParticlesMoveInteraction } from "tsparticles-interaction-particles-move";
import { options } from "./options";

export function loadStarsPreset(tsParticles: Main): void {
    loadCircleShape(tsParticles);
    loadOpacityUpdater(tsParticles);
    loadParticlesMoveInteraction(tsParticles);
    loadOutModesUpdater(tsParticles);

    tsParticles.addPreset("stars", options);
}
