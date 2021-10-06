import type { Main } from "tsparticles-engine";
import { options } from "./options";
import { loadExternalTrailInteraction } from "tsparticles-interaction-external-trail";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadLifeUpdater } from "tsparticles-updater-life";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadSizeUpdater } from "tsparticles-updater-size";
import { loadCircleShape } from "tsparticles-shape-circle";

export function loadFireflyPreset(tsParticles: Main): void {
    loadExternalTrailInteraction(tsParticles);
    loadCircleShape(tsParticles);
    loadColorUpdater(tsParticles);
    loadLifeUpdater(tsParticles);
    loadOpacityUpdater(tsParticles);
    loadSizeUpdater(tsParticles);

    tsParticles.addPreset("firefly", options);
}
