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
import { Repulser as MouseRepulser } from "tsparticles-core/Interactions/External/Repulser";
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

/**
 * Main class for creating the singleton on window.
 * It's a singleton proxy to the static [[Loader]] class for initializing [[Container]] instances
 * @category Main
 */
export class MainSlim extends Main {
    constructor() {
        super();

        const squareDrawer = new SquareDrawer();
        const textDrawer = new TextDrawer();
        const imageDrawer = new ImageDrawer();

        this.addParticleUpdater((container) => new LifeUpdater(container));
        this.addParticleUpdater((container) => new OpacityUpdater(container));
        this.addParticleUpdater((container) => new SizeUpdater(container));
        this.addParticleUpdater((container) => new AngleUpdater(container));
        this.addParticleUpdater((container) => new ColorUpdater(container));
        this.addParticleUpdater((container) => new StrokeColorUpdater(container));
        this.addParticleUpdater((container) => new OutOfCanvasUpdater(container));

        this.addInteractor((container) => new Bouncer(container));
        this.addInteractor((container) => new Bubbler(container));
        this.addInteractor((container) => new Connector(container));
        this.addInteractor((container) => new Grabber(container));
        this.addInteractor((container) => new MouseAttractor(container));
        this.addInteractor((container) => new MouseRepulser(container));
        this.addInteractor((container) => new ParticlesAttractor(container));
        this.addInteractor((container) => new Collider(container));
        this.addInteractor((container) => new Infecter(container));
        this.addInteractor((container) => new Repulser(container));
        this.addInteractor((container) => new Linker(container));

        this.addShape(ShapeType.line, new LineDrawer());
        this.addShape(ShapeType.circle, new CircleDrawer());
        this.addShape(ShapeType.edge, squareDrawer);
        this.addShape(ShapeType.square, squareDrawer);
        this.addShape(ShapeType.triangle, new TriangleDrawer());
        this.addShape(ShapeType.star, new StarDrawer());
        this.addShape(ShapeType.polygon, new PolygonDrawer());
        this.addShape(ShapeType.char, textDrawer);
        this.addShape(ShapeType.character, textDrawer);
        this.addShape(ShapeType.image, imageDrawer);
        this.addShape(ShapeType.images, imageDrawer);
    }
}
