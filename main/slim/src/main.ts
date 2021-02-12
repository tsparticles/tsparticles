import type { Main } from "tsparticles-core";
import { loadInteraction as loadExternalAttractInteraction } from "tsparticles-interaction-external-attract";
import { loadInteraction as loadExternalBounceInteraction } from "tsparticles-interaction-external-bounce";
import { loadInteraction as loadExternalBubbleInteraction } from "tsparticles-interaction-external-bubble";
import { loadInteraction as loadExternalConnectInteraction } from "tsparticles-interaction-external-connect";
import { loadInteraction as loadExternalGrabInteraction } from "tsparticles-interaction-external-grab";
import { loadInteraction as loadExternalRepulseInteraction } from "tsparticles-interaction-external-repulse";
import { loadInteraction as loadParticlesAttractInteraction } from "tsparticles-interaction-particles-attract";
import { loadInteraction as loadParticlesCollisionsInteraction } from "tsparticles-interaction-particles-collisions";
import { loadLinks } from "tsparticles-interaction-particles-links";
import { loadInteraction as loadParticlesMoveInteraction } from "tsparticles-interaction-particles-move";
import { loadInteraction as loadParticlesParallaxInteraction } from "tsparticles-interaction-particles-parallax";
import { loadInteraction as loadParticlesRepulseInteraction } from "tsparticles-interaction-particles-repulse";
import { loadShape as loadCircleShape } from "tsparticles-shape-circle";
import { loadShape as loadImageShape } from "tsparticles-shape-image";
import { loadShape as loadLineShape } from "tsparticles-shape-line";
import { loadShape as loadPolygonShape } from "tsparticles-shape-polygon";
import { loadShape as loadSquareShape } from "tsparticles-shape-square";
import { loadShape as loadStarShape } from "tsparticles-shape-star";
import { loadShape as loadTextShape } from "tsparticles-shape-text";
import { loadUpdater as loadAngleUpdater } from "tsparticles-updater-angle";
import { loadUpdater as loadColorUpdater } from "tsparticles-updater-color";
import { loadUpdater as loadLifeUpdater } from "tsparticles-updater-life";
import { loadUpdater as loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadUpdater as loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadUpdater as loadStrokeColorUpdater } from "tsparticles-updater-stroke-color";
import { loadUpdater as loadSizeUpdater } from "tsparticles-updater-size";

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
    loadParticlesAttractInteraction(tsParticles);
    loadParticlesCollisionsInteraction(tsParticles);
    loadParticlesRepulseInteraction(tsParticles);
    loadLinks(tsParticles);
    loadParticlesMoveInteraction(tsParticles);
    loadParticlesParallaxInteraction(tsParticles);

    /* shapes */
    loadCircleShape(tsParticles);
    loadImageShape(tsParticles);
    loadLineShape(tsParticles);
    loadPolygonShape(tsParticles);
    loadSquareShape(tsParticles);
    loadStarShape(tsParticles);
    loadTextShape(tsParticles);
}
