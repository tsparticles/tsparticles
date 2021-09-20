import type { Main } from "tsparticles-engine";
import { options } from "./options";
import { loadColorUpdater } from "tsparticles-engine/Updaters/Color";
import { loadEmittersPlugin } from "tsparticles-engine/Plugins/Emitters/plugin";
import { loadCircleShape } from "tsparticles-engine/Shapes/Circle";
import { loadSizeUpdater } from "tsparticles-engine/Updaters/Size";
import { loadOpacityUpdater } from "tsparticles-engine/Updaters/Opacity";
import { loadOutModesUpdater } from "tsparticles-engine/Updaters/OutModes";

export function loadBigCirclesPreset(tsParticles: Main): void {
    loadCircleShape(tsParticles);
    loadColorUpdater(tsParticles);
    loadSizeUpdater(tsParticles);
    loadOpacityUpdater(tsParticles);
    loadOutModesUpdater(tsParticles);
    loadEmittersPlugin(tsParticles);

    tsParticles.addPreset("bigCircles", options);
    tsParticles.addPreset("big-circles", options);
}
