import type { Main } from "tsparticles-engine";
import { options, presetName } from "./options";
import { loadCurvesPath } from "tsparticles-path-curves";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadSizeUpdater } from "tsparticles-updater-size";
import { loadEmittersPlugin } from "tsparticles-plugin-emitters";
import { loadColorUpdater } from "tsparticles-updater-color";

export function loadSeaAnemonePreset(tsParticles: Main): void {
    loadCircleShape(tsParticles);
    loadColorUpdater(tsParticles);
    loadOpacityUpdater(tsParticles);
    loadOutModesUpdater(tsParticles);
    loadSizeUpdater(tsParticles);
    loadEmittersPlugin(tsParticles);
    loadCurvesPath(tsParticles);

    tsParticles.addPreset(presetName, options);
}
