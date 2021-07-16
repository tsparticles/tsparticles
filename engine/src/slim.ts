import type { Main } from "./main";
import { LifeUpdater } from "./Updaters/LifeUpdater";
import { OpacityUpdater } from "./Updaters/OpacityUpdater";
import { SizeUpdater } from "./Updaters/SizeUpdater";
import { AngleUpdater } from "./Updaters/AngleUpdater";
import { TiltUpdater } from "./Updaters/TiltUpdater";
import { RollUpdater } from "./Updaters/RollUpdater";
import { WobbleUpdater } from "./Updaters/WobbleUpdater";
import { ColorUpdater } from "./Updaters/ColorUpdater";
import { StrokeColorUpdater } from "./Updaters/StrokeColorUpdater";
import { OutOfCanvasUpdater } from "./Updaters/OutOfCanvasUpdater";
import { loadCircleShape } from "./Shapes/Circle";
import { loadImageShape } from "./Shapes/Image";
import { loadLineShape } from "./Shapes/Line";
import { loadPolygonShape } from "./Shapes/Polygon";
import { loadSquareShape } from "./Shapes/Square";
import { loadStarShape } from "./Shapes/Star";
import { loadTextShape } from "./Shapes/Text";

export function loadSlim(tsParticles: Main): void {
    loadCircleShape(tsParticles);
    loadImageShape(tsParticles);
    loadLineShape(tsParticles);
    loadPolygonShape(tsParticles);
    loadSquareShape(tsParticles);
    loadStarShape(tsParticles);
    loadTextShape(tsParticles);

    tsParticles.addParticleUpdater("life", (container) => new LifeUpdater(container));
    tsParticles.addParticleUpdater("opacity", () => new OpacityUpdater());
    tsParticles.addParticleUpdater("size", () => new SizeUpdater());
    tsParticles.addParticleUpdater("angle", () => new AngleUpdater());
    tsParticles.addParticleUpdater("tilt", () => new TiltUpdater());
    tsParticles.addParticleUpdater("roll", () => new RollUpdater());
    tsParticles.addParticleUpdater("wobble", () => new WobbleUpdater());
    tsParticles.addParticleUpdater("color", () => new ColorUpdater());
    tsParticles.addParticleUpdater("stroke", () => new StrokeColorUpdater());
    tsParticles.addParticleUpdater("out", (container) => new OutOfCanvasUpdater(container));
}
