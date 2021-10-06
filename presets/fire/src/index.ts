import type { Main } from "tsparticles-engine";
import { options } from "./options";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadSizeUpdater } from "tsparticles-updater-size";
import { loadExternalPushInteraction } from "tsparticles-interaction-external-push";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";

export function loadFirePreset(tsParticles: Main): void {
    loadExternalPushInteraction(tsParticles);
    loadCircleShape(tsParticles);
    loadColorUpdater(tsParticles);
    loadOpacityUpdater(tsParticles);
    loadOutModesUpdater(tsParticles);
    loadSizeUpdater(tsParticles);

    tsParticles.addPreset("fire", options);
}
