import { Main } from "tsparticles-engine";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadParticlesLinksInteraction } from "tsparticles-interaction-particles-links";
import { loadParticlesMoveInteraction } from "tsparticles-interaction-particles-move";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { options } from "./options";

export function loadLinksPreset(tsParticles: Main): void {
    loadCircleShape(tsParticles);
    loadParticlesMoveInteraction(tsParticles);
    loadOutModesUpdater(tsParticles);
    loadParticlesLinksInteraction(tsParticles);

    tsParticles.addPreset("links", options);
}
