import { SquareDrawer } from "./ShapeDrawers/SquareDrawer";
import { TextDrawer } from "./ShapeDrawers/TextDrawer";
import { ImageDrawer } from "./ShapeDrawers/ImageDrawer";
import { Plugins } from "./Utils";
import { ShapeType } from "./Enums/Types";
import { LineDrawer } from "./ShapeDrawers/LineDrawer";
import { CircleDrawer } from "./ShapeDrawers/CircleDrawer";
import { TriangleDrawer } from "./ShapeDrawers/TriangleDrawer";
import { StarDrawer } from "./ShapeDrawers/StarDrawer";
import { PolygonDrawer } from "./ShapeDrawers/PolygonDrawer";
import type { IOptions } from "./Options/Interfaces/IOptions";
import type { Container } from "./Core/Container";
import { Loader } from "./Core/Loader";
import type { IShapeDrawer } from "./Core/Interfaces/IShapeDrawer";
import type {
    ShapeDrawerAfterEffectFunction,
    ShapeDrawerDestroyFunction,
    ShapeDrawerDrawFunction,
    ShapeDrawerInitFunction,
    RecursivePartial,
    SingleOrMultiple,
} from "./Types";
import type { IPlugin } from "./Core/Interfaces/IPlugin";
import type { Particle } from "./Core/Particle";
import type { INoise } from "./Core/Interfaces/INoise";
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
import type { IInteractor } from "./Core/Interfaces/IInteractor";
import { IParticleUpdater } from "./Core/Interfaces/IParticleUpdater";

/**
 * Main class for creating the singleton on window.
 * It's a singleton proxy to the static [[Loader]] class for initializing [[Container]] instances
 * @category Main
 */
export class MainSlim {
    private initialized;

    constructor() {
        this.initialized = false;

        const squareDrawer = new SquareDrawer();
        const textDrawer = new TextDrawer();
        const imageDrawer = new ImageDrawer();

        Plugins.addParticleUpdater((container) => new LifeUpdater(container));
        Plugins.addParticleUpdater((container) => new OpacityUpdater(container));
        Plugins.addParticleUpdater((container) => new SizeUpdater(container));
        Plugins.addParticleUpdater((container) => new AngleUpdater(container));
        Plugins.addParticleUpdater((container) => new ColorUpdater(container));
        Plugins.addParticleUpdater((container) => new StrokeColorUpdater(container));
        Plugins.addParticleUpdater((container) => new OutOfCanvasUpdater(container));

        Plugins.addInteractor((container) => new Bouncer(container));
        Plugins.addInteractor((container) => new Bubbler(container));
        Plugins.addInteractor((container) => new Connector(container));
        Plugins.addInteractor((container) => new Grabber(container));
        Plugins.addInteractor((container) => new MouseAttractor(container));
        Plugins.addInteractor((container) => new MouseRepulser(container));
        Plugins.addInteractor((container) => new ParticlesAttractor(container));
        Plugins.addInteractor((container) => new Collider(container));
        Plugins.addInteractor((container) => new Infecter(container));
        Plugins.addInteractor((container) => new Repulser(container));
        Plugins.addInteractor((container) => new Linker(container));

        Plugins.addShapeDrawer(ShapeType.line, new LineDrawer());
        Plugins.addShapeDrawer(ShapeType.circle, new CircleDrawer());
        Plugins.addShapeDrawer(ShapeType.edge, squareDrawer);
        Plugins.addShapeDrawer(ShapeType.square, squareDrawer);
        Plugins.addShapeDrawer(ShapeType.triangle, new TriangleDrawer());
        Plugins.addShapeDrawer(ShapeType.star, new StarDrawer());
        Plugins.addShapeDrawer(ShapeType.polygon, new PolygonDrawer());
        Plugins.addShapeDrawer(ShapeType.char, textDrawer);
        Plugins.addShapeDrawer(ShapeType.character, textDrawer);
        Plugins.addShapeDrawer(ShapeType.image, imageDrawer);
        Plugins.addShapeDrawer(ShapeType.images, imageDrawer);
    }

    /**
     * init method, used by imports
     */
    public init(): void {
        if (!this.initialized) {
            this.initialized = true;
        }
    }

    /**
     * Loads an options object from the provided array to create a [[Container]] object.
     * @param tagId The particles container element id
     * @param options The options array to get the item from
     * @param index If provided gets the corresponding item from the array
     * @returns A Promise with the [[Container]] object created
     */
    public async loadFromArray(
        tagId: string,
        options: RecursivePartial<IOptions>[],
        index?: number
    ): Promise<Container | undefined> {
        return Loader.load(tagId, options, index);
    }

    /**
     * Loads the provided options to create a [[Container]] object.
     * @param tagId The particles container element id
     * @param options The options object to initialize the [[Container]]
     * @returns A Promise with the [[Container]] object created
     */
    public async load(
        tagId: string,
        options: SingleOrMultiple<RecursivePartial<IOptions>>
    ): Promise<Container | undefined> {
        return Loader.load(tagId, options);
    }

    /**
     * Loads the provided option to create a [[Container]] object using the element parameter as a container
     * @param id The particles container id
     * @param element The dom element used to contain the particles
     * @param options The options object to initialize the [[Container]]
     */
    public async set(
        id: string,
        element: HTMLElement,
        options: RecursivePartial<IOptions>
    ): Promise<Container | undefined> {
        return Loader.set(id, element, options);
    }

    /**
     * Loads the provided json with a GET request. The content will be used to create a [[Container]] object.
     * This method is async, so if you need a callback refer to JavaScript function `fetch`
     * @param tagId the particles container element id
     * @param pathConfigJson the json path (or paths array) to use in the GET request
     * @param index the index of the paths array, if a single path is passed this value is ignored
     * @returns A Promise with the [[Container]] object created
     */
    public loadJSON(
        tagId: string,
        pathConfigJson: SingleOrMultiple<string>,
        index?: number
    ): Promise<Container | undefined> {
        return Loader.loadJSON(tagId, pathConfigJson, index);
    }

    /**
     * Adds an additional click handler to all the loaded [[Container]] objects.
     * @param callback The function called after the click event is fired
     */
    public setOnClickHandler(callback: (e: Event, particles?: Particle[]) => void): void {
        Loader.setOnClickHandler(callback);
    }

    /**
     * All the [[Container]] objects loaded
     * @returns All the [[Container]] objects loaded
     */
    public dom(): Container[] {
        return Loader.dom();
    }

    /**
     * Retrieves a [[Container]] from all the objects loaded
     * @param index The object index
     * @returns The [[Container]] object at specified index, if present or not destroyed, otherwise undefined
     */
    public domItem(index: number): Container | undefined {
        return Loader.domItem(index);
    }

    /**
     * addShape adds shape to tsParticles, it will be available to all future instances created
     * @param shape the shape name
     * @param drawer the shape drawer function or class instance that draws the shape in the canvas
     * @param init Optional: the shape drawer init function, used only if the drawer parameter is a function
     * @param afterEffect Optional: the shape drawer after effect function, used only if the drawer parameter is a function
     * @param destroy Optional: the shape drawer destroy function, used only if the drawer parameter is a function
     */
    public addShape(
        shape: string,
        drawer: IShapeDrawer | ShapeDrawerDrawFunction,
        init?: ShapeDrawerInitFunction,
        afterEffect?: ShapeDrawerAfterEffectFunction,
        destroy?: ShapeDrawerDestroyFunction
    ): void {
        let customDrawer: IShapeDrawer;

        if (typeof drawer === "function") {
            customDrawer = {
                afterEffect: afterEffect,
                destroy: destroy,
                draw: drawer,
                init: init,
            };
        } else {
            customDrawer = drawer;
        }

        Plugins.addShapeDrawer(shape, customDrawer);
    }

    /**
     * addPreset adds preset to tsParticles, it will be available to all future instances created
     * @param preset the preset name
     * @param options the options to add to the preset
     */
    public addPreset<T extends IOptions>(preset: string, options: RecursivePartial<T>): void {
        Plugins.addPreset(preset, options);
    }

    /**
     * addPlugin adds plugin to tsParticles, if an instance needs it it will be loaded
     * @param plugin the plugin implementation of [[IPlugin]]
     */
    public addPlugin(plugin: IPlugin): void {
        Plugins.addPlugin(plugin);
    }

    /**
     * addNoiseGenerator adds a named noise generator to tsParticles, this can be called by options
     * @param name the noise generator name
     * @param generator the noise generator object
     */
    public addNoiseGenerator(name: string, generator: INoise): void {
        Plugins.addNoiseGenerator(name, generator);
    }

    /**
     *
     * @param interactorInitializer
     */
    public addInteractor(interactorInitializer: (container: Container) => IInteractor): void {
        Plugins.addInteractor(interactorInitializer);
    }

    /**
     *
     * @param updaterInitializer
     */
    public addParticleUpdater(updaterInitializer: (container: Container) => IParticleUpdater): void {
        Plugins.addParticleUpdater(updaterInitializer);
    }
}
