import { options, presetName } from "./options";
import type { Engine } from "tsparticles-engine";
import { loadBaseMover } from "tsparticles-move-base";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadCurvesPath } from "tsparticles-path-curves";
import { loadEmittersPlugin } from "tsparticles-plugin-emitters";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadSizeUpdater } from "tsparticles-updater-size";

export async function loadSeaAnemonePreset(engine: Engine): Promise<void> {
    await loadBaseMover(engine);
    await loadCircleShape(engine);
    await loadColorUpdater(engine);
    await loadOpacityUpdater(engine);
    await loadOutModesUpdater(engine);
    await loadSizeUpdater(engine);
    await loadEmittersPlugin(engine);
    await loadCurvesPath(engine);

    await engine.addPreset(presetName, options);
}
