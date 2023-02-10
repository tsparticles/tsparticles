import type { Engine } from "tsparticles-engine";
import { loadAngleUpdater } from "tsparticles-updater-angle";
import { loadBaseMover } from "tsparticles-move-base";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadEmittersPlugin } from "tsparticles-plugin-emitters";
import { loadLifeUpdater } from "tsparticles-updater-life";
import { loadMotionPlugin } from "tsparticles-plugin-motion";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadRollUpdater } from "tsparticles-updater-roll";
import { loadSizeUpdater } from "tsparticles-updater-size";
import { loadSquareShape } from "tsparticles-shape-square";
import { loadTiltUpdater } from "tsparticles-updater-tilt";
import { loadWobbleUpdater } from "tsparticles-updater-wobble";
import { options } from "./options";

async function loadPreset(engine: Engine): Promise<void> {
    await loadBaseMover(engine);
    await loadCircleShape(engine);
    await loadSquareShape(engine);
    await loadColorUpdater(engine);
    await loadSizeUpdater(engine);
    await loadOpacityUpdater(engine);
    await loadOutModesUpdater(engine);
    await loadEmittersPlugin(engine);
    await loadMotionPlugin(engine);
    await loadWobbleUpdater(engine);
    await loadRollUpdater(engine);
    await loadAngleUpdater(engine);
    await loadTiltUpdater(engine);
    await loadLifeUpdater(engine);

    await engine.addPreset("confetti", options);
}

export async function loadConfettiPreset(main: Engine): Promise<void> {
    await loadPreset(main);
}
