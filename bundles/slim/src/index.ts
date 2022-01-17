import type { Engine } from "tsparticles-engine";
import { loadAngleUpdater } from "tsparticles-updater-angle";
import { loadBaseMover } from "tsparticles-move-base";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadExternalAttractInteraction } from "tsparticles-interaction-external-attract";
import { loadExternalBounceInteraction } from "tsparticles-interaction-external-bounce";
import { loadExternalBubbleInteraction } from "tsparticles-interaction-external-bubble";
import { loadExternalConnectInteraction } from "tsparticles-interaction-external-connect";
import { loadExternalGrabInteraction } from "tsparticles-interaction-external-grab";
import { loadExternalPauseInteraction } from "tsparticles-interaction-external-pause";
import { loadExternalPushInteraction } from "tsparticles-interaction-external-push";
import { loadExternalRemoveInteraction } from "tsparticles-interaction-external-remove";
import { loadExternalRepulseInteraction } from "tsparticles-interaction-external-repulse";
import { loadImageShape } from "tsparticles-shape-image";
import { loadLifeUpdater } from "tsparticles-updater-life";
import { loadLineShape } from "tsparticles-shape-line";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadParallaxMover } from "tsparticles-move-parallax";
import { loadParticlesAttractInteraction } from "tsparticles-interaction-particles-attract";
import { loadParticlesCollisionsInteraction } from "tsparticles-interaction-particles-collisions";
import { loadParticlesLinksInteraction } from "tsparticles-interaction-particles-links";
import { loadPolygonShape } from "tsparticles-shape-polygon";
import { loadSizeUpdater } from "tsparticles-updater-size";
import { loadSquareShape } from "tsparticles-shape-square";
import { loadStarShape } from "tsparticles-shape-star";
import { loadStrokeColorUpdater } from "tsparticles-updater-stroke-color";
import { loadTextShape } from "tsparticles-shape-text";

export async function loadSlim(engine: Engine): Promise<void> {
    await loadBaseMover(engine);
    await loadParallaxMover(engine);

    await loadExternalAttractInteraction(engine);
    await loadExternalBounceInteraction(engine);
    await loadExternalBubbleInteraction(engine);
    await loadExternalConnectInteraction(engine);
    await loadExternalGrabInteraction(engine);
    await loadExternalPauseInteraction(engine);
    await loadExternalPushInteraction(engine);
    await loadExternalRemoveInteraction(engine);
    await loadExternalRepulseInteraction(engine);

    await loadParticlesAttractInteraction(engine);
    await loadParticlesCollisionsInteraction(engine);
    await loadParticlesLinksInteraction(engine);

    await loadCircleShape(engine);
    await loadImageShape(engine);
    await loadLineShape(engine);
    await loadPolygonShape(engine);
    await loadSquareShape(engine);
    await loadStarShape(engine);
    await loadTextShape(engine);

    await loadLifeUpdater(engine);
    await loadOpacityUpdater(engine);
    await loadSizeUpdater(engine);
    await loadAngleUpdater(engine);
    await loadColorUpdater(engine);
    await loadStrokeColorUpdater(engine);
    await loadOutModesUpdater(engine);
}
