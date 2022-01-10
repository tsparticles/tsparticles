import type { Engine } from "tsparticles-engine";
import { options } from "./options";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadEmittersPlugin } from "tsparticles-plugin-emitters";
import { loadSizeUpdater } from "tsparticles-updater-size";

export async function loadBubblesPreset(tsParticles: Engine): Promise<void> {
    await loadCircleShape(tsParticles);
    await loadColorUpdater(tsParticles);
    await loadSizeUpdater(tsParticles);
    await loadOpacityUpdater(tsParticles);
    await loadOutModesUpdater(tsParticles);
    await loadEmittersPlugin(tsParticles);

    await tsParticles.addPreset("bubbles", options);
}
