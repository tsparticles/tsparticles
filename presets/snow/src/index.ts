import type { Engine } from "tsparticles-engine";
import { options } from "./options";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadSizeUpdater } from "tsparticles-updater-size";

export async function loadSnowPreset(tsParticles: Engine): Promise<void> {
    await loadCircleShape(tsParticles);
    await loadColorUpdater(tsParticles);
    await loadOpacityUpdater(tsParticles);
    await loadOutModesUpdater(tsParticles);
    await loadSizeUpdater(tsParticles);

    await tsParticles.addPreset("snow", options);
}
