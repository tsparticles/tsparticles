import type { Engine } from "tsparticles-engine";
import { options } from "./options";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadSizeUpdater } from "tsparticles-updater-size";
import { loadExternalPushInteraction } from "tsparticles-interaction-external-push";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";

export async function loadFirePreset(tsParticles: Engine): Promise<void> {
    await loadExternalPushInteraction(tsParticles);
    await loadCircleShape(tsParticles);
    await loadColorUpdater(tsParticles);
    await loadOpacityUpdater(tsParticles);
    await loadOutModesUpdater(tsParticles);
    await loadSizeUpdater(tsParticles);

    await tsParticles.addPreset("fire", options);
}
