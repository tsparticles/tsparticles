/**
 * Engine class for creating the singleton on window.
 * It's a singleton proxy to the [[Loader]] class for initializing [[Container]] instances
 * @category Engine
 */
import type {
    ShapeDrawerAfterEffectFunction,
    ShapeDrawerDestroyFunction,
    ShapeDrawerDrawFunction,
    ShapeDrawerInitFunction,
} from "./Types/ShapeDrawerFunctions";
import type { Container } from "./Core/Container";
import type { CustomEventArgs } from "./Types/CustomEventArgs";
import type { CustomEventListener } from "./Types/CustomEventListener";
import { EventDispatcher } from "./Utils/EventDispatcher";
import type { IInteractor } from "./Core/Interfaces/IInteractor";
import type { IMovePathGenerator } from "./Core/Interfaces/IMovePathGenerator";
import type { IOptions } from "./Options/Interfaces/IOptions";
import type { IParticleMover } from "./Core/Interfaces/IParticlesMover";
import type { IParticleUpdater } from "./Core/Interfaces/IParticleUpdater";
import type { IPlugin } from "./Core/Interfaces/IPlugin";
import type { IShapeDrawer } from "./Core/Interfaces/IShapeDrawer";
import { Loader } from "./Core/Loader";
import type { Particle } from "./Core/Particle";
import { Plugins } from "./Core/Utils/Plugins";
import type { RecursivePartial } from "./Types/RecursivePartial";
import type { SingleOrMultiple } from "./Types/SingleOrMultiple";

declare const __VERSION__: string;

/**
 * Engine class for creating the singleton on window.
 * It's a singleton proxy to the Loader class for initializing [[Container]] instances,
 * and for Plugins class responsible for every external feature
 * @category Engine
 */
export class Engine {
    /**
     * Contains the [[Plugins]] engine instance
     */
    readonly plugins: Plugins;

    /**
     * Contains all the [[Container]] instances of the current engine instance
     */
    private readonly _domArray: Container[];

    private readonly _eventDispatcher;

    /**
     * Checks if the engine instance is initialized
     */
    private _initialized: boolean;

    /**
     * Contains the [[Loader]] engine instance
     * @private
     */
    private readonly _loader: Loader;

    /**
     * Engine constructor, initializes plugins, loader and the containers array
     */
    constructor() {
        this._domArray = [];
        this._eventDispatcher = new EventDispatcher();
        this._initialized = false;
        this._loader = new Loader(this);
        this.plugins = new Plugins(this);
    }

    get version(): string {
        return __VERSION__;
    }

    /**
     * Adds a listener to the specified event
     * @param type The event to listen to
     * @param listener The listener of the specified event
     */
    addEventListener(type: string, listener: CustomEventListener): void {
        this._eventDispatcher.addEventListener(type, listener);
    }

    /**
     *
     * @param name
     * @param interactorInitializer
     */
    async addInteractor(name: string, interactorInitializer: (container: Container) => IInteractor): Promise<void> {
        this.plugins.addInteractor(name, interactorInitializer);

        await this.refresh();
    }

    async addMover(name: string, moverInitializer: (container: Container) => IParticleMover): Promise<void> {
        this.plugins.addParticleMover(name, moverInitializer);

        await this.refresh();
    }

    /**
     *
     * @param name
     * @param updaterInitializer
     */
    async addParticleUpdater(
        name: string,
        updaterInitializer: (container: Container) => IParticleUpdater
    ): Promise<void> {
        this.plugins.addParticleUpdater(name, updaterInitializer);

        await this.refresh();
    }

    /**
     * addPathGenerator adds a named path generator to tsParticles, this can be called by options
     * @param name the path generator name
     * @param generator the path generator object
     */
    async addPathGenerator(name: string, generator: IMovePathGenerator): Promise<void> {
        this.plugins.addPathGenerator(name, generator);

        await this.refresh();
    }

    /**
     * addPlugin adds plugin to tsParticles, if an instance needs it it will be loaded
     * @param plugin the plugin implementation of [[IPlugin]]
     */
    async addPlugin(plugin: IPlugin): Promise<void> {
        this.plugins.addPlugin(plugin);

        await this.refresh();
    }

    /**
     * addPreset adds preset to tsParticles, it will be available to all future instances created
     * @param preset the preset name
     * @param options the options to add to the preset
     * @param override if true, the preset will override any existing with the same name
     */
    async addPreset(preset: string, options: RecursivePartial<IOptions>, override = false): Promise<void> {
        this.plugins.addPreset(preset, options, override);

        await this.refresh();
    }

    /**
     * addShape adds shape to tsParticles, it will be available to all future instances created
     * @param shape the shape name
     * @param drawer the shape drawer function or class instance that draws the shape in the canvas
     * @param init Optional: the shape drawer init function, used only if the drawer parameter is a function
     * @param afterEffect Optional: the shape drawer after effect function, used only if the drawer parameter is a function
     * @param destroy Optional: the shape drawer destroy function, used only if the drawer parameter is a function
     */
    async addShape(
        shape: SingleOrMultiple<string>,
        drawer: IShapeDrawer | ShapeDrawerDrawFunction,
        init?: ShapeDrawerInitFunction,
        afterEffect?: ShapeDrawerAfterEffectFunction,
        destroy?: ShapeDrawerDestroyFunction
    ): Promise<void> {
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

        this.plugins.addShapeDrawer(shape, customDrawer);

        await this.refresh();
    }

    /**
     * Dispatches an event that will be listened from listeners
     * @param type The event to dispatch
     * @param args The event parameters
     */
    dispatchEvent(type: string, args: CustomEventArgs): void {
        this._eventDispatcher.dispatchEvent(type, args);
    }

    /**
     * All the [[Container]] objects loaded
     * @returns All the [[Container]] objects loaded
     */
    dom(): Container[] {
        return this._domArray;
    }

    /**
     * Retrieves a [[Container]] from all the objects loaded
     * @param index The object index
     * @returns The [[Container]] object at specified index, if present or not destroyed, otherwise undefined
     */
    domItem(index: number): Container | undefined {
        const dom = this.dom(),
            item = dom[index];

        if (item && !item.destroyed) {
            return item;
        }

        dom.splice(index, 1);
    }

    /**
     * init method, used by imports
     */
    init(): void {
        if (!this._initialized) {
            this._initialized = true;
        }
    }

    /**
     * Loads the provided options to create a [[Container]] object.
     * @param tagId The particles container element id
     * @param options The options object to initialize the [[Container]]
     * @returns A Promise with the [[Container]] object created
     */
    async load(
        tagId: string | SingleOrMultiple<RecursivePartial<IOptions>>,
        options?: SingleOrMultiple<RecursivePartial<IOptions>>
    ): Promise<Container | undefined> {
        return this._loader.load(tagId, options);
    }

    /**
     * Loads an options object from the provided array to create a [[Container]] object.
     * @param tagId The particles container element id
     * @param options The options array to get the item from
     * @param index If provided gets the corresponding item from the array
     * @returns A Promise with the [[Container]] object created
     */
    async loadFromArray(
        tagId: string,
        options: RecursivePartial<IOptions>[],
        index?: number
    ): Promise<Container | undefined> {
        return this._loader.load(tagId, options, index);
    }

    /**
     * Loads the provided json with a GET request. The content will be used to create a [[Container]] object.
     * This method is async, so if you need a callback refer to JavaScript function `fetch`
     * @param tagId the particles container element id
     * @param pathConfigJson the json path (or paths array) to use in the GET request
     * @param index the index of the paths array, if a single path is passed this value is ignored
     * @returns A Promise with the [[Container]] object created
     */
    async loadJSON(
        tagId: string | SingleOrMultiple<string>,
        pathConfigJson?: SingleOrMultiple<string> | number,
        index?: number
    ): Promise<Container | undefined> {
        return this._loader.loadJSON(tagId, pathConfigJson, index);
    }

    /**
     * Reloads all existing tsParticles loaded instances
     */
    async refresh(): Promise<void> {
        for (const instance of this.dom()) {
            await instance.refresh();
        }
    }

    /**
     * Removes a listener from the specified event
     * @param type The event to stop listening to
     * @param listener The listener of the specified event
     */
    removeEventListener(type: string, listener: CustomEventListener): void {
        this._eventDispatcher.removeEventListener(type, listener);
    }

    /**
     * Loads the provided option to create a [[Container]] object using the element parameter as a container
     * @param id The particles container id
     * @param element The dom element used to contain the particles
     * @param options The options object to initialize the [[Container]]
     */
    async set(
        id: string | HTMLElement,
        element: HTMLElement | RecursivePartial<IOptions>,
        options?: RecursivePartial<IOptions>
    ): Promise<Container | undefined> {
        return this._loader.set(id, element, options);
    }

    /**
     * Loads the provided option to create a [[Container]] object using the element parameter as a container
     * @param id The particles container id
     * @param element The dom element used to contain the particles
     * @param pathConfigJson the json path (or paths array) to use in the GET request
     * @param index the index of the paths array, if a single path is passed this value is ignored
     * @returns A Promise with the [[Container]] object created
     */
    async setJSON(
        id: string | HTMLElement,
        element: HTMLElement | SingleOrMultiple<string>,
        pathConfigJson?: SingleOrMultiple<string> | number,
        index?: number
    ): Promise<Container | undefined> {
        return this._loader.setJSON(id, element, pathConfigJson, index);
    }

    /**
     * Adds an additional click handler to all the loaded [[Container]] objects.
     * @param callback The function called after the click event is fired
     */
    setOnClickHandler(callback: (e: Event, particles?: Particle[]) => void): void {
        const dom = this.dom();

        if (!dom.length) {
            throw new Error("Can only set click handlers after calling tsParticles.load() or tsParticles.loadJSON()");
        }

        for (const domItem of dom) {
            domItem.addClickHandler(callback);
        }
    }
}
