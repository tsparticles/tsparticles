import type { Main } from "tsparticles-engine";
import { options } from "./options";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadParticlesLinksInteraction } from "tsparticles-interaction-particles-links";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadSizeUpdater } from "tsparticles-updater-size";

export function loadLinksPreset(tsParticles: Main): void {
    loadCircleShape(tsParticles);
    loadParticlesLinksInteraction(tsParticles);
    loadOutModesUpdater(tsParticles);
    loadSizeUpdater(tsParticles);

    tsParticles.addPreset("links", options);
}
