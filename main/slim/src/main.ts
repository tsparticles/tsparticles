import { SquareDrawer } from "tsparticles-core/ShapeDrawers/SquareDrawer";
import { TextDrawer } from "tsparticles-core/ShapeDrawers/TextDrawer";
import { ImageDrawer } from "tsparticles-core/ShapeDrawers/ImageDrawer";
import { LineDrawer } from "tsparticles-core/ShapeDrawers/LineDrawer";
import { CircleDrawer } from "tsparticles-core/ShapeDrawers/CircleDrawer";
import { TriangleDrawer } from "tsparticles-core/ShapeDrawers/TriangleDrawer";
import { StarDrawer } from "tsparticles-core/ShapeDrawers/StarDrawer";
import { PolygonDrawer } from "tsparticles-core/ShapeDrawers/PolygonDrawer";
import { Bouncer } from "tsparticles-core/Interactions/External/Bouncer";
import { Bubbler } from "tsparticles-core/Interactions/External/Bubbler";
import { Connector } from "tsparticles-core/Interactions/External/Connector";
import { Grabber } from "tsparticles-core/Interactions/External/Grabber";
import { Attractor as MouseAttractor } from "tsparticles-core/Interactions/External/Attractor";
import { Attractor as ParticlesAttractor } from "tsparticles-core/Interactions/Particles/Attractor";
import { Collider } from "tsparticles-core/Interactions/Particles/Collider";
import { Infecter } from "tsparticles-core/Interactions/Particles/Infecter";
import { Repulser } from "tsparticles-core/Interactions/Particles/Repulser";
import { Linker } from "tsparticles-core/Interactions/Particles/Linker";
import { LifeUpdater } from "tsparticles-core/Updaters/LifeUpdater";
import { OpacityUpdater } from "tsparticles-core/Updaters/OpacityUpdater";
import { SizeUpdater } from "tsparticles-core/Updaters/SizeUpdater";
import { AngleUpdater } from "tsparticles-core/Updaters/AngleUpdater";
import { ColorUpdater } from "tsparticles-core/Updaters/ColorUpdater";
import { StrokeColorUpdater } from "tsparticles-core/Updaters/StrokeColorUpdater";
import { OutOfCanvasUpdater } from "tsparticles-core/Updaters/OutOfCanvasUpdater";
import { Main, ShapeType } from "tsparticles-core";
import { loadInteraction as loadMouseRepulseInteraction } from "tsparticles-interaction-external-repulse";

export function loadSlim(tsParticles: Main): void {
    const squareDrawer = new SquareDrawer();
    const textDrawer = new TextDrawer();
    const imageDrawer = new ImageDrawer();

    tsParticles.addParticleUpdater((container) => new LifeUpdater(container));
    tsParticles.addParticleUpdater((container) => new OpacityUpdater(container));
    tsParticles.addParticleUpdater((container) => new SizeUpdater(container));
    tsParticles.addParticleUpdater((container) => new AngleUpdater(container));
    tsParticles.addParticleUpdater((container) => new ColorUpdater(container));
    tsParticles.addParticleUpdater((container) => new StrokeColorUpdater(container));
    tsParticles.addParticleUpdater((container) => new OutOfCanvasUpdater(container));

    tsParticles.addInteractor((container) => new Bouncer(container));
    tsParticles.addInteractor((container) => new Bubbler(container));
    tsParticles.addInteractor((container) => new Connector(container));
    tsParticles.addInteractor((container) => new Grabber(container));
    tsParticles.addInteractor((container) => new MouseAttractor(container));
    loadMouseRepulseInteraction(tsParticles);
    tsParticles.addInteractor((container) => new ParticlesAttractor(container));
    tsParticles.addInteractor((container) => new Collider(container));
    tsParticles.addInteractor((container) => new Infecter(container));
    tsParticles.addInteractor((container) => new Repulser(container));
    tsParticles.addInteractor((container) => new Linker(container));

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
}
