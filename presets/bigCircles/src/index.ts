import type { Main } from "tsparticles-engine";
import { options } from "./options";
import { loadEmittersPlugin } from "tsparticles-plugin-emitters";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadSizeUpdater } from "tsparticles-updater-size";

export async function loadBigCirclesPreset(tsParticles: Main): Promise<void> {
    await loadCircleShape(tsParticles);
    await loadColorUpdater(tsParticles);
    await loadSizeUpdater(tsParticles);
    await loadOpacityUpdater(tsParticles);
    await loadOutModesUpdater(tsParticles);
    await loadEmittersPlugin(tsParticles);

    tsParticles.addPreset("bigCircles", options);
    tsParticles.addPreset("big-circles", options);
}
