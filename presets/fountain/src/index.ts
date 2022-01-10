import type { Engine } from "tsparticles-engine";
import { options } from "./options";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadSizeUpdater } from "tsparticles-updater-size";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadEmittersPlugin } from "tsparticles-plugin-emitters";

export async function loadFountainPreset(tsParticles: Engine): Promise<void> {
    await loadCircleShape(tsParticles);
    await loadEmittersPlugin(tsParticles);
    await loadColorUpdater(tsParticles);
    await loadOpacityUpdater(tsParticles);
    await loadOutModesUpdater(tsParticles);
    await loadSizeUpdater(tsParticles);

    await tsParticles.addPreset("fountain", options);
}
