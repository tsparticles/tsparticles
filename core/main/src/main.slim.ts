import { SquareDrawer } from "./ShapeDrawers/SquareDrawer";
import { TextDrawer } from "./ShapeDrawers/TextDrawer";
import { ImageDrawer } from "./ShapeDrawers/ImageDrawer";
import { ShapeType } from "./Enums/Types";
import { LineDrawer } from "./ShapeDrawers/LineDrawer";
import { CircleDrawer } from "./ShapeDrawers/CircleDrawer";
import { TriangleDrawer } from "./ShapeDrawers/TriangleDrawer";
import { StarDrawer } from "./ShapeDrawers/StarDrawer";
import { PolygonDrawer } from "./ShapeDrawers/PolygonDrawer";
import { Bouncer } from "./Interactions/External/Bouncer";
import { Bubbler } from "./Interactions/External/Bubbler";
import { Connector } from "./Interactions/External/Connector";
import { Grabber } from "./Interactions/External/Grabber";
import { Attractor as MouseAttractor } from "./Interactions/External/Attractor";
import { Repulser as MouseRepulser } from "./Interactions/External/Repulser";
import { Attractor as ParticlesAttractor } from "./Interactions/Particles/Attractor";
import { Collider } from "./Interactions/Particles/Collider";
import { Infecter } from "./Interactions/Particles/Infecter";
import { Repulser } from "./Interactions/Particles/Repulser";
import { Linker } from "./Interactions/Particles/Linker";
import { LifeUpdater } from "./Updaters/LifeUpdater";
import { OpacityUpdater } from "./Updaters/OpacityUpdater";
import { SizeUpdater } from "./Updaters/SizeUpdater";
import { AngleUpdater } from "./Updaters/AngleUpdater";
import { ColorUpdater } from "./Updaters/ColorUpdater";
import { StrokeColorUpdater } from "./Updaters/StrokeColorUpdater";
import { OutOfCanvasUpdater } from "./Updaters/OutOfCanvasUpdater";
import { MainCore } from "./main.core";

/**
 * Main class for creating the singleton on window.
 * It's a singleton proxy to the static [[Loader]] class for initializing [[Container]] instances
 * @category Main
 */
export class MainSlim extends MainCore {
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
