import type { Engine } from "tsparticles-engine";
import { options } from "./options";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadParticlesLinksInteraction } from "tsparticles-interaction-particles-links";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadSizeUpdater } from "tsparticles-updater-size";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";

export async function loadLinksPreset(tsParticles: Engine): Promise<void> {
    await loadCircleShape(tsParticles);
    await loadColorUpdater(tsParticles);
    await loadParticlesLinksInteraction(tsParticles);
    await loadOutModesUpdater(tsParticles);
    await loadOpacityUpdater(tsParticles);
    await loadSizeUpdater(tsParticles);

    await tsParticles.addPreset("links", options);
}
