import type { Engine } from "tsparticles-engine";
import { options } from "./options";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadEmittersPlugin } from "tsparticles-plugin-emitters";
import { loadLifeUpdater } from "tsparticles-updater-life";
import { loadStrokeColorUpdater } from "tsparticles-updater-stroke-color";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadSizeUpdater } from "tsparticles-updater-size";
import { loadLineShape } from "tsparticles-shape-line";
import { loadAngleUpdater } from "tsparticles-updater-angle";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadColorUpdater } from "tsparticles-updater-color";

export async function loadFireworksPreset(tsParticles: Engine): Promise<void> {
    await loadEmittersPlugin(tsParticles);
    await loadCircleShape(tsParticles);
    await loadLineShape(tsParticles);
    await loadAngleUpdater(tsParticles);
    await loadColorUpdater(tsParticles);
    await loadLifeUpdater(tsParticles);
    await loadOpacityUpdater(tsParticles);
    await loadOutModesUpdater(tsParticles);
    await loadSizeUpdater(tsParticles);
    await loadStrokeColorUpdater(tsParticles);

    await tsParticles.addPreset("fireworks", options);
}
