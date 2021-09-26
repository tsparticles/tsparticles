import type { Main } from "tsparticles-engine";
import { options } from "./options";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadEmittersPlugin } from "tsparticles-plugin-emitters";
import { loadSizeUpdater } from "tsparticles-updater-size";

export function loadBubblesPreset(tsParticles: Main): void {
    loadCircleShape(tsParticles);
    loadColorUpdater(tsParticles);
    loadSizeUpdater(tsParticles);
    loadOpacityUpdater(tsParticles);
    loadOutModesUpdater(tsParticles);
    loadEmittersPlugin(tsParticles);

    tsParticles.addPreset("bubbles", options);
}
