import type { Main } from "./main";
import { SquareDrawer } from "./ShapeDrawers/SquareDrawer";
import { TextDrawer } from "./ShapeDrawers/TextDrawer";
import { ImageDrawer } from "./ShapeDrawers/ImageDrawer";
import { ShapeType } from "./Enums";
import { LineDrawer } from "./ShapeDrawers/LineDrawer";
import { CircleDrawer } from "./ShapeDrawers/CircleDrawer";
import { TriangleDrawer } from "./ShapeDrawers/TriangleDrawer";
import { StarDrawer } from "./ShapeDrawers/StarDrawer";
import { PolygonDrawer } from "./ShapeDrawers/PolygonDrawer";
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

export function loadSlim(tsParticles: Main): void {
    const squareDrawer = new SquareDrawer();
    const textDrawer = new TextDrawer();
    const imageDrawer = new ImageDrawer();

    tsParticles.addShape(ShapeType.line, new LineDrawer());
    tsParticles.addShape(ShapeType.circle, new CircleDrawer());
    tsParticles.addShape(ShapeType.edge, squareDrawer);
    tsParticles.addShape(ShapeType.square, squareDrawer);
    tsParticles.addShape(ShapeType.triangle, new TriangleDrawer());
    tsParticles.addShape(ShapeType.star, new StarDrawer());
    tsParticles.addShape(ShapeType.polygon, new PolygonDrawer());
    tsParticles.addShape(ShapeType.char, textDrawer);
    tsParticles.addShape(ShapeType.character, textDrawer);
    tsParticles.addShape(ShapeType.image, imageDrawer);
    tsParticles.addShape(ShapeType.images, imageDrawer);

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
