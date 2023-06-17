import type { Engine } from "tsparticles-engine";
import { initPjs } from "tsparticles-particles.js";
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
import { loadExternalSlowInteraction } from "tsparticles-interaction-external-slow";
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
import { loadRotateUpdater } from "tsparticles-updater-rotate";
import { loadSizeUpdater } from "tsparticles-updater-size";
import { loadSquareShape } from "tsparticles-shape-square";
import { loadStarShape } from "tsparticles-shape-star";
import { loadStrokeColorUpdater } from "tsparticles-updater-stroke-color";
import { loadTextShape } from "tsparticles-shape-text";

/**
 * Loads the slime bundle with all plugins needed for running the tsParticles Slim package.
 * This function must be called to make tsParticles Slim work.
 * This function is not mandatory, the plugins can be loaded manually, or using other plugin bundles.
 * If this function is not called, the tsparticles-slim package/dependency can be safely removed.
 * This function is called automatically using CDN bundle files.
 * @param engine - the engine to use for loading all plugins
 * @param refresh -
 */
export async function loadSlim(engine: Engine, refresh = false): Promise<void> {
    initPjs(engine);

    await loadBaseMover(engine, refresh);
    await loadParallaxMover(engine, refresh);

    await loadExternalAttractInteraction(engine, refresh);
    await loadExternalBounceInteraction(engine, refresh);
    await loadExternalBubbleInteraction(engine, refresh);
    await loadExternalConnectInteraction(engine, refresh);
    await loadExternalGrabInteraction(engine, refresh);
    await loadExternalPauseInteraction(engine, refresh);
    await loadExternalPushInteraction(engine, refresh);
    await loadExternalRemoveInteraction(engine, refresh);
    await loadExternalRepulseInteraction(engine, refresh);
    await loadExternalSlowInteraction(engine, refresh);

    await loadParticlesAttractInteraction(engine, refresh);
    await loadParticlesCollisionsInteraction(engine, refresh);
    await loadParticlesLinksInteraction(engine, refresh);

    await loadCircleShape(engine, refresh);
    await loadImageShape(engine, refresh);
    await loadLineShape(engine, refresh);
    await loadPolygonShape(engine, refresh);
    await loadSquareShape(engine, refresh);
    await loadStarShape(engine, refresh);
    await loadTextShape(engine, refresh);

    await loadLifeUpdater(engine, refresh);
    await loadOpacityUpdater(engine, refresh);
    await loadSizeUpdater(engine, refresh);
    await loadColorUpdater(engine, refresh);
    await loadOutModesUpdater(engine, refresh);
    await loadRotateUpdater(engine, refresh);
    await loadStrokeColorUpdater(engine, refresh);
}
