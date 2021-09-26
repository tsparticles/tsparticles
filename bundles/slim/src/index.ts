import type { Main } from "tsparticles-engine";
import { loadExternalAttractInteraction } from "tsparticles-engine/Interactions/External/Attract";
import { loadExternalBounceInteraction } from "tsparticles-engine/Interactions/External/Bounce";
import { loadExternalBubbleInteraction } from "tsparticles-engine/Interactions/External/Bubble";
import { loadExternalConnectInteraction } from "tsparticles-engine/Interactions/External/Connect";
import { loadExternalGrabInteraction } from "tsparticles-engine/Interactions/External/Grab";
import { loadExternalRepulseInteraction } from "tsparticles-engine/Interactions/External/Repulse";
import { loadExternalTrailInteraction } from "tsparticles-engine/Interactions/External/Trail";
import { loadParticlesAttractInteraction } from "tsparticles-engine/Interactions/Particles/Attract";
import { loadParticlesCollisionsInteraction } from "tsparticles-engine/Interactions/Particles/Collisions";
import { loadParticlesLinksInteraction } from "tsparticles-engine/Interactions/Particles/Links";
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
import { loadTiltUpdater } from "tsparticles-updater-tilt";
import { loadRollUpdater } from "tsparticles-updater-roll";
import { loadWobbleUpdater } from "tsparticles-updater-wobble";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadStrokeColorUpdater } from "tsparticles-updater-stroke-color";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";

export function loadSlim(tsParticles: Main): void {
    loadExternalAttractInteraction(tsParticles);
    loadExternalBounceInteraction(tsParticles);
    loadExternalBubbleInteraction(tsParticles);
    loadExternalConnectInteraction(tsParticles);
    loadExternalGrabInteraction(tsParticles);
    loadExternalRepulseInteraction(tsParticles);
    loadExternalTrailInteraction(tsParticles);

    loadParticlesAttractInteraction(tsParticles);
    loadParticlesCollisionsInteraction(tsParticles);
    loadParticlesLinksInteraction(tsParticles);

    loadCircleShape(tsParticles);
    loadImageShape(tsParticles);
    loadLineShape(tsParticles);
    loadPolygonShape(tsParticles);
    loadSquareShape(tsParticles);
    loadStarShape(tsParticles);
    loadTextShape(tsParticles);

    loadLifeUpdater(tsParticles);
    loadOpacityUpdater(tsParticles);
    loadSizeUpdater(tsParticles);
    loadAngleUpdater(tsParticles);
    loadTiltUpdater(tsParticles);
    loadRollUpdater(tsParticles);
    loadWobbleUpdater(tsParticles);
    loadColorUpdater(tsParticles);
    loadStrokeColorUpdater(tsParticles);
    loadOutModesUpdater(tsParticles);
}
