import type { Main } from "tsparticles-engine";
import { options } from "./options";
import { loadCircleShape } from "tsparticles-engine/Shapes/Circle";
import { loadColorUpdater } from "tsparticles-engine/Updaters/Color";
import { loadOpacityUpdater } from "tsparticles-engine/Updaters/Opacity";
import { loadOutModesUpdater } from "tsparticles-engine/Updaters/OutModes";
import { loadEmittersPlugin } from "tsparticles-engine/Plugins/Emitters/plugin";
import { loadSizeUpdater } from "tsparticles-engine/Updaters/Size";

export function loadBubblesPreset(tsParticles: Main): void {
    loadCircleShape(tsParticles);
    loadColorUpdater(tsParticles);
    loadSizeUpdater(tsParticles);
    loadOpacityUpdater(tsParticles);
    loadOutModesUpdater(tsParticles);
    loadEmittersPlugin(tsParticles);

    tsParticles.addPreset("bubbles", options);
}
