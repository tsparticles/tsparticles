import type { Engine } from "tsparticles-engine";
import { loadBaseMover } from "tsparticles-move-base";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadExternalPushInteraction } from "tsparticles-interaction-external-push";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadSizeUpdater } from "tsparticles-updater-size";
import { options } from "./options";

export async function loadFirePreset(engine: Engine): Promise<void> {
    await loadBaseMover(engine);
    await loadExternalPushInteraction(engine);
    await loadCircleShape(engine);
    await loadColorUpdater(engine);
    await loadOpacityUpdater(engine);
    await loadOutModesUpdater(engine);
    await loadSizeUpdater(engine);

    await engine.addPreset("fire", options);
}
