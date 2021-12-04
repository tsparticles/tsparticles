import type { Main } from "tsparticles-engine";
import { loadExternalAttractInteraction } from "tsparticles-interaction-external-attract";
import { loadExternalBounceInteraction } from "tsparticles-interaction-external-bounce";
import { loadExternalBubbleInteraction } from "tsparticles-interaction-external-bubble";
import { loadExternalConnectInteraction } from "tsparticles-interaction-external-connect";
import { loadExternalGrabInteraction } from "tsparticles-interaction-external-grab";
import { loadExternalPauseInteraction } from "tsparticles-interaction-external-pause";
import { loadExternalPushInteraction } from "tsparticles-interaction-external-push";
import { loadExternalRemoveInteraction } from "tsparticles-interaction-external-remove";
import { loadExternalRepulseInteraction } from "tsparticles-interaction-external-repulse";
import { loadParticlesAttractInteraction } from "tsparticles-interaction-particles-attract";
import { loadParticlesCollisionsInteraction } from "tsparticles-interaction-particles-collisions";
import { loadParticlesLinksInteraction } from "tsparticles-interaction-particles-links";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadImageShape } from "tsparticles-shape-image";
import { loadLineShape } from "tsparticles-shape-line";
import { loadPolygonShape } from "tsparticles-shape-polygon";
import { loadSquareShape } from "tsparticles-shape-square";
import { loadStarShape } from "tsparticles-shape-star";
import { loadTextShape } from "tsparticles-shape-text";
import { loadLifeUpdater } from "tsparticles-updater-life";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadSizeUpdater } from "tsparticles-updater-size";
import { loadAngleUpdater } from "tsparticles-updater-angle";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadStrokeColorUpdater } from "tsparticles-updater-stroke-color";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";

export async function loadSlim(tsParticles: Main): Promise<void> {
    await loadExternalAttractInteraction(tsParticles);
    await loadExternalBounceInteraction(tsParticles);
    await loadExternalBubbleInteraction(tsParticles);
    await loadExternalConnectInteraction(tsParticles);
    await loadExternalGrabInteraction(tsParticles);
    await loadExternalPauseInteraction(tsParticles);
    await loadExternalPushInteraction(tsParticles);
    await loadExternalRemoveInteraction(tsParticles);
    await loadExternalRepulseInteraction(tsParticles);

    await loadParticlesAttractInteraction(tsParticles);
    await loadParticlesCollisionsInteraction(tsParticles);
    await loadParticlesLinksInteraction(tsParticles);

    await loadCircleShape(tsParticles);
    await loadImageShape(tsParticles);
    await loadLineShape(tsParticles);
    await loadPolygonShape(tsParticles);
    await loadSquareShape(tsParticles);
    await loadStarShape(tsParticles);
    await loadTextShape(tsParticles);

    loadLifeUpdater(tsParticles);
    loadOpacityUpdater(tsParticles);
    loadSizeUpdater(tsParticles);
    loadAngleUpdater(tsParticles);
    loadColorUpdater(tsParticles);
    loadStrokeColorUpdater(tsParticles);
    loadOutModesUpdater(tsParticles);
}
