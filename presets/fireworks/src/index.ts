import type { Main } from "tsparticles-engine";
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

export function loadFireworksPreset(tsParticles: Main): void {
    loadEmittersPlugin(tsParticles);
    loadCircleShape(tsParticles);
    loadLineShape(tsParticles);
    loadAngleUpdater(tsParticles);
    loadColorUpdater(tsParticles);
    loadLifeUpdater(tsParticles);
    loadOpacityUpdater(tsParticles);
    loadOutModesUpdater(tsParticles);
    loadSizeUpdater(tsParticles);
    loadStrokeColorUpdater(tsParticles);

    tsParticles.addPreset("fireworks", options);
}
