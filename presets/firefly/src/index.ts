import type { Engine } from "tsparticles-engine";
import { loadBaseMover } from "tsparticles-move-base";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadExternalTrailInteraction } from "tsparticles-interaction-external-trail";
import { loadLifeUpdater } from "tsparticles-updater-life";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadSizeUpdater } from "tsparticles-updater-size";
import { options } from "./options";

export async function loadFireflyPreset(engine: Engine): Promise<void> {
    await loadBaseMover(engine);
    await loadExternalTrailInteraction(engine);
    await loadCircleShape(engine);
    await loadColorUpdater(engine);
    await loadLifeUpdater(engine);
    await loadOpacityUpdater(engine);
    await loadSizeUpdater(engine);

    await engine.addPreset("firefly", options);
}
