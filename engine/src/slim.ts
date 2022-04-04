import type { Engine } from "./engine";
import { loadAngleUpdater } from "./Updaters/Angle";
import { loadBaseMover } from "./Movers/Base";
import { loadCircleShape } from "./Shapes/Circle";
import { loadColorUpdater } from "./Updaters/Color";
import { loadExternalAttractInteraction } from "./Interactions/External/Attract";
import { loadExternalBounceInteraction } from "./Interactions/External/Bounce";
import { loadExternalBubbleInteraction } from "./Interactions/External/Bubble";
import { loadExternalConnectInteraction } from "./Interactions/External/Connect";
import { loadExternalGrabInteraction } from "./Interactions/External/Grab";
import { loadExternalPauseInteraction } from "./Interactions/External/Pause";
import { loadExternalPushInteraction } from "./Interactions/External/Push";
import { loadExternalRemoveInteraction } from "./Interactions/External/Remove";
import { loadExternalRepulseInteraction } from "./Interactions/External/Repulse";
import { loadImageShape } from "./Shapes/Image";
import { loadLifeUpdater } from "./Updaters/Life";
import { loadLineShape } from "./Shapes/Line";
import { loadOpacityUpdater } from "./Updaters/Opacity";
import { loadOutModesUpdater } from "./Updaters/OutModes";
import { loadParallaxMover } from "./Movers/Parallax";
import { loadParticlesAttractInteraction } from "./Interactions/Particles/Attract";
import { loadParticlesCollisionsInteraction } from "./Interactions/Particles/Collisions";
import { loadParticlesLinksInteraction } from "./Interactions/Particles/Links";
import { loadPolygonShape } from "./Shapes/Polygon";
import { loadSizeUpdater } from "./Updaters/Size";
import { loadSquareShape } from "./Shapes/Square";
import { loadStarShape } from "./Shapes/Star";
import { loadStrokeColorUpdater } from "./Updaters/StrokeColor";
import { loadTextShape } from "./Shapes/Text";

/**
 * Loads the slim tsParticles instance, containing only default tsParticles plugins for a lighter version
 * @param engine the engine used to load all plugins
 */
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
