import type { Engine } from "tsparticles-engine";
import { options, presetName } from "./options";
import { loadCurvesPath } from "tsparticles-path-curves";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadSizeUpdater } from "tsparticles-updater-size";
import { loadEmittersPlugin } from "tsparticles-plugin-emitters";
import { loadColorUpdater } from "tsparticles-updater-color";

export async function loadSeaAnemonePreset(tsParticles: Engine): Promise<void> {
    await loadCircleShape(tsParticles);
    await loadColorUpdater(tsParticles);
    await loadOpacityUpdater(tsParticles);
    await loadOutModesUpdater(tsParticles);
    await loadSizeUpdater(tsParticles);
    await loadEmittersPlugin(tsParticles);
    await loadCurvesPath(tsParticles);

    await tsParticles.addPreset(presetName, options);
}
