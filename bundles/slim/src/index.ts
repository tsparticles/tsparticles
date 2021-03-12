import type { Main } from "tsparticles-engine";
import { loadExternalAttractInteraction } from "tsparticles-interaction-external-attract";
import { loadExternalBounceInteraction } from "tsparticles-interaction-external-bounce";
import { loadExternalBubbleInteraction } from "tsparticles-interaction-external-bubble";
import { loadExternalConnectInteraction } from "tsparticles-interaction-external-connect";
import { loadExternalGrabInteraction } from "tsparticles-interaction-external-grab";
import { loadExternalRepulseInteraction } from "tsparticles-interaction-external-repulse";
import { loadParticlesAttractInteraction } from "tsparticles-interaction-particles-attract";
import { loadParticlesCollisionsInteraction } from "tsparticles-interaction-particles-collisions";
import { loadParticlesLinksInteraction } from "tsparticles-interaction-particles-links";
import { loadParticlesMoveInteraction } from "tsparticles-interaction-particles-move";
import { loadParticlesParallaxInteraction } from "tsparticles-interaction-particles-parallax";
import { loadParticlesRepulseInteraction } from "tsparticles-interaction-particles-repulse";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadImageShape } from "tsparticles-shape-image";
import { loadLineShape } from "tsparticles-shape-line";
import { loadPolygonShape } from "tsparticles-shape-polygon";
import { loadSquareShape } from "tsparticles-shape-square";
import { loadStarShape } from "tsparticles-shape-star";
import { loadTextShape } from "tsparticles-shape-text";
import { loadAngleUpdater } from "tsparticles-updater-angle";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadLifeUpdater } from "tsparticles-updater-life";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadSizeUpdater } from "tsparticles-updater-size";
import { loadStrokeColorUpdater } from "tsparticles-updater-stroke-color";

export function loadSlim(tsParticles: Main): void {
    /* updaters */
    loadAngleUpdater(tsParticles);
    loadColorUpdater(tsParticles);
    loadLifeUpdater(tsParticles);
    loadOpacityUpdater(tsParticles);
    loadOutModesUpdater(tsParticles);
    loadSizeUpdater(tsParticles);
    loadStrokeColorUpdater(tsParticles);

    /* updaters */
    /* externals */
    loadExternalAttractInteraction(tsParticles);
    loadExternalBounceInteraction(tsParticles);
    loadExternalBubbleInteraction(tsParticles);
    loadExternalConnectInteraction(tsParticles);
    loadExternalGrabInteraction(tsParticles);
    loadExternalRepulseInteraction(tsParticles);

    /* particles */
    loadParticlesMoveInteraction(tsParticles);
    loadParticlesParallaxInteraction(tsParticles);
    loadParticlesAttractInteraction(tsParticles);
    loadParticlesCollisionsInteraction(tsParticles);
    loadParticlesRepulseInteraction(tsParticles);
    loadParticlesLinksInteraction(tsParticles);

    /* shapes */
    loadCircleShape(tsParticles);
    loadImageShape(tsParticles);
    loadLineShape(tsParticles);
    loadPolygonShape(tsParticles);
    loadSquareShape(tsParticles);
    loadStarShape(tsParticles);
    loadTextShape(tsParticles);
}
