import type { Main } from "tsparticles-engine";
import { options } from "./options";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadSizeUpdater } from "tsparticles-updater-size";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadEmittersPlugin } from "tsparticles-plugin-emitters";

export function loadFountainPreset(tsParticles: Main): void {
    loadCircleShape(tsParticles);
    loadEmittersPlugin(tsParticles);
    loadColorUpdater(tsParticles);
    loadOpacityUpdater(tsParticles);
    loadOutModesUpdater(tsParticles);
    loadSizeUpdater(tsParticles);

    tsParticles.addPreset("fountain", options);
}
