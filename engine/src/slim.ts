import type { Main } from "./main";
import { loadCircleShape } from "./Shapes/Circle";
import { loadLifeUpdater } from "./Updaters/Life";
import { loadExternalConnectInteraction } from "./Interactions/External/Connect";
import { loadOpacityUpdater } from "./Updaters/Opacity";
import { loadImageShape } from "./Shapes/Image";
import { loadPolygonShape } from "./Shapes/Polygon";
import { loadExternalBubbleInteraction } from "./Interactions/External/Bubble";
import { loadExternalAttractInteraction } from "./Interactions/External/Attract";
import { loadExternalGrabInteraction } from "./Interactions/External/Grab";
import { loadStarShape } from "./Shapes/Star";
import { loadParticlesAttractInteraction } from "./Interactions/Particles/Attract";
import { loadSquareShape } from "./Shapes/Square";
import { loadStrokeColorUpdater } from "./Updaters/StrokeColor";
import { loadColorUpdater } from "./Updaters/Color";
import { loadParticlesCollisionsInteraction } from "./Interactions/Particles/Collisions";
import { loadAngleUpdater } from "./Updaters/Angle";
import { loadOutModesUpdater } from "./Updaters/OutModes";
import { loadExternalRepulseInteraction } from "./Interactions/External/Repulse";
import { loadLineShape } from "./Shapes/Line";
import { loadExternalBounceInteraction } from "./Interactions/External/Bounce";
import { loadTextShape } from "./Shapes/Text";
import { loadParticlesLinksInteraction } from "./Interactions/Particles/Links";
import { loadSizeUpdater } from "./Updaters/Size";

export function loadSlim(tsParticles: Main): void {
    loadExternalAttractInteraction(tsParticles);
    loadExternalBounceInteraction(tsParticles);
    loadExternalBubbleInteraction(tsParticles);
    loadExternalConnectInteraction(tsParticles);
    loadExternalGrabInteraction(tsParticles);
    loadExternalRepulseInteraction(tsParticles);

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
    loadColorUpdater(tsParticles);
    loadStrokeColorUpdater(tsParticles);
    loadOutModesUpdater(tsParticles);
}
