import type { Engine } from "tsparticles-engine";
import { options } from "./options";
import { loadExternalTrailInteraction } from "tsparticles-interaction-external-trail";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadLifeUpdater } from "tsparticles-updater-life";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadSizeUpdater } from "tsparticles-updater-size";
import { loadCircleShape } from "tsparticles-shape-circle";

export async function loadFireflyPreset(tsParticles: Engine): Promise<void> {
    await loadExternalTrailInteraction(tsParticles);
    await loadCircleShape(tsParticles);
    await loadColorUpdater(tsParticles);
    await loadLifeUpdater(tsParticles);
    await loadOpacityUpdater(tsParticles);
    await loadSizeUpdater(tsParticles);

    await tsParticles.addPreset("firefly", options);
}
