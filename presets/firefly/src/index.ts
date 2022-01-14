import type { Engine } from "tsparticles-engine";
import { options } from "./options";
import { loadExternalTrailInteraction } from "tsparticles-interaction-external-trail";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadLifeUpdater } from "tsparticles-updater-life";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadSizeUpdater } from "tsparticles-updater-size";
import { loadCircleShape } from "tsparticles-shape-circle";

export async function loadFireflyPreset(engine: Engine): Promise<void> {
    await loadExternalTrailInteraction(engine);
    await loadCircleShape(engine);
    await loadColorUpdater(engine);
    await loadLifeUpdater(engine);
    await loadOpacityUpdater(engine);
    await loadSizeUpdater(engine);

    await engine.addPreset("firefly", options);
}
