import type { Main } from "./main";
import { loadCircleShape } from "./Shapes/Circle";
import { loadImageShape } from "./Shapes/Image";
import { loadLineShape } from "./Shapes/Line";
import { loadPolygonShape } from "./Shapes/Polygon";
import { loadSquareShape } from "./Shapes/Square";
import { loadStarShape } from "./Shapes/Star";
import { loadTextShape } from "./Shapes/Text";
import { loadAngleUpdater } from "./Updaters/Angle";
import { loadColorUpdater } from "./Updaters/Color";
import { loadLifeUpdater } from "./Updaters/Life";
import { loadOpacityUpdater } from "./Updaters/Opacity";
import { loadSizeUpdater } from "./Updaters/Size";
import { loadStrokeColorUpdater } from "./Updaters/StrokeColor";
import { loadOutModesUpdater } from "./Updaters/OutModes";
import { loadRollUpdater } from "./Updaters/Roll";
import { loadTiltUpdater } from "./Updaters/Tilt";
import { loadWobbleUpdater } from "./Updaters/Wobble";
import { loadExternalAttractInteraction } from "./Interactions/External/Attract";
import { loadExternalBounceInteraction } from "./Interactions/External/Bounce";
import { loadExternalBubbleInteraction } from "./Interactions/External/Bubble";
import { loadExternalConnectInteraction } from "./Interactions/External/Connect";

export function loadSlim(tsParticles: Main): void {
    loadExternalAttractInteraction(tsParticles);
    loadExternalBounceInteraction(tsParticles);
    loadExternalBubbleInteraction(tsParticles);
    loadExternalConnectInteraction(tsParticles);

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
