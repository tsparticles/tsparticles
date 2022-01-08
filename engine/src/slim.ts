import type { Engine } from "./engine";
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

export async function loadSlim(tsParticles: Engine): Promise<void> {
    await loadExternalAttractInteraction(tsParticles);
    await loadExternalBounceInteraction(tsParticles);
    await loadExternalBubbleInteraction(tsParticles);
    await loadExternalConnectInteraction(tsParticles);
    await loadExternalGrabInteraction(tsParticles);
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

    await loadLifeUpdater(tsParticles);
    await loadOpacityUpdater(tsParticles);
    await loadSizeUpdater(tsParticles);
    await loadAngleUpdater(tsParticles);
    await loadColorUpdater(tsParticles);
    await loadStrokeColorUpdater(tsParticles);
    await loadOutModesUpdater(tsParticles);
}
