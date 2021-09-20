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
import { loadCircleShape } from "tsparticles-engine/Shapes/Circle";
import { loadImageShape } from "tsparticles-engine/Shapes/Image";
import { loadLineShape } from "tsparticles-engine/Shapes/Line";
import { loadPolygonShape } from "tsparticles-engine/Shapes/Polygon";
import { loadSquareShape } from "tsparticles-engine/Shapes/Square";
import { loadStarShape } from "tsparticles-engine/Shapes/Star";
import { loadTextShape } from "tsparticles-engine/Shapes/Text";
import { loadLifeUpdater } from "tsparticles-engine/Updaters/Life";
import { loadOpacityUpdater } from "tsparticles-engine/Updaters/Opacity";
import { loadSizeUpdater } from "tsparticles-engine/Updaters/Size";
import { loadAngleUpdater } from "tsparticles-engine/Updaters/Angle";
import { loadTiltUpdater } from "tsparticles-engine/Updaters/Tilt";
import { loadRollUpdater } from "tsparticles-engine/Updaters/Roll";
import { loadWobbleUpdater } from "tsparticles-engine/Updaters/Wobble";
import { loadColorUpdater } from "tsparticles-engine/Updaters/Color";
import { loadStrokeColorUpdater } from "tsparticles-engine/Updaters/StrokeColor";
import { loadOutModesUpdater } from "tsparticles-engine/Updaters/OutModes";

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
