import type { Engine } from "tsparticles-engine";
import { loadAngleUpdater } from "tsparticles-updater-angle";
import { loadBaseMover } from "tsparticles-move-base";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadDestroyUpdater } from "tsparticles-updater-destroy";
import { loadEmittersPlugin } from "tsparticles-plugin-emitters";
import { loadLifeUpdater } from "tsparticles-updater-life";
import { loadLineShape } from "tsparticles-shape-line";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadSizeUpdater } from "tsparticles-updater-size";
import { loadSoundsPlugin } from "tsparticles-plugin-sounds";
import { loadStrokeColorUpdater } from "tsparticles-updater-stroke-color";
import { options } from "./options";

export async function loadFireworksPreset(engine: Engine): Promise<void> {
    await loadBaseMover(engine);
    await loadEmittersPlugin(engine);
    await loadSoundsPlugin(engine);
    await loadCircleShape(engine);
    await loadLineShape(engine);
    await loadAngleUpdater(engine);
    await loadColorUpdater(engine);
    await loadDestroyUpdater(engine);
    await loadLifeUpdater(engine);
    await loadOpacityUpdater(engine);
    await loadOutModesUpdater(engine);
    await loadSizeUpdater(engine);
    await loadStrokeColorUpdater(engine);

    await engine.addPreset("fireworks", options);
}
