import { Main } from "tsparticles-engine";
import { loadParticlesMoveInteraction } from "tsparticles-interaction-particles-move";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadCircleShape } from "tsparticles-shape-circle";
import { options } from "./options";

export function loadSnowPreset(tsParticles: Main): void {
    loadParticlesMoveInteraction(tsParticles);
    loadOutModesUpdater(tsParticles);
    loadCircleShape(tsParticles);

    tsParticles.addPreset("snow", options);
}
