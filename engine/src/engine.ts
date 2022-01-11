import type { IOptions } from "./Options/Interfaces/IOptions";
import type {
    Container,
    IInteractor,
    IMovePathGenerator,
    IParticleUpdater,
    IPlugin,
    IShapeDrawer,
    Particle,
} from "./Core";
import { Loader, Plugins } from "./Core";
import type {
    ShapeDrawerAfterEffectFunction,
    ShapeDrawerDestroyFunction,
    ShapeDrawerDrawFunction,
    ShapeDrawerInitFunction,
    RecursivePartial,
    SingleOrMultiple,
    CustomEventListener,
    CustomEventArgs,
} from "./Types";
import { EventDispatcher } from "./Utils";

/**
 * Engine class for creating the singleton on window.
 * It's a singleton proxy to the static [[this.#loader]] class for initializing [[Container]] instances
 * @category Engine
 */
export class Engine {
    readonly domArray: Container[];
    readonly eventDispatcher;

    #initialized;
    #loader;

    constructor() {
        this.domArray = [];
        this.eventDispatcher = new EventDispatcher();
        this.#initialized = false;
        this.#loader = new Loader(this);
    }

    /**
     * init method, used by imports
     */
    init(): void {
        if (!this.#initialized) {
            this.#initialized = true;
        }
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
        return this.#loader.load(tagId, options, index);
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
        return this.#loader.load(tagId, options);
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
        return this.#loader.set(id, element, options);
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
        return this.#loader.loadJSON(tagId, pathConfigJson, index);
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
        return this.#loader.setJSON(id, element, pathConfigJson, index);
    }

    /**
     * Adds an additional click handler to all the loaded [[Container]] objects.
     * @param callback The function called after the click event is fired
     */
    setOnClickHandler(callback: (e: Event, particles?: Particle[]) => void): void {
        this.#loader.setOnClickHandler(callback);
    }

    /**
     * All the [[Container]] objects loaded
     * @returns All the [[Container]] objects loaded
     */
    dom(): Container[] {
        return this.#loader.dom();
    }

    /**
     * Retrieves a [[Container]] from all the objects loaded
     * @param index The object index
     * @returns The [[Container]] object at specified index, if present or not destroyed, otherwise undefined
     */
    domItem(index: number): Container | undefined {
        return this.#loader.domItem(index);
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
     * addShape adds shape to tsParticles, it will be available to all future instances created
     * @param shape the shape name
     * @param drawer the shape drawer function or class instance that draws the shape in the canvas
     * @param init Optional: the shape drawer init function, used only if the drawer parameter is a function
     * @param afterEffect Optional: the shape drawer after effect function, used only if the drawer parameter is a function
     * @param destroy Optional: the shape drawer destroy function, used only if the drawer parameter is a function
     */
    async addShape(
        shape: string,
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

        Plugins.addShapeDrawer(shape, customDrawer);

        await this.refresh();
    }

    /**
     * addPreset adds preset to tsParticles, it will be available to all future instances created
     * @param preset the preset name
     * @param options the options to add to the preset
     * @param override if true, the preset will override any existing with the same name
     */
    async addPreset(preset: string, options: RecursivePartial<IOptions>, override = false): Promise<void> {
        Plugins.addPreset(preset, options, override);

        await this.refresh();
    }

    /**
     * addPlugin adds plugin to tsParticles, if an instance needs it it will be loaded
     * @param plugin the plugin implementation of [[IPlugin]]
     */
    async addPlugin(plugin: IPlugin): Promise<void> {
        Plugins.addPlugin(plugin);

        await this.refresh();
    }

    /**
     * addPathGenerator adds a named path generator to tsParticles, this can be called by options
     * @param name the path generator name
     * @param generator the path generator object
     */
    async addPathGenerator(name: string, generator: IMovePathGenerator): Promise<void> {
        Plugins.addPathGenerator(name, generator);

        await this.refresh();
    }

    /**
     *
     * @param name
     * @param interactorInitializer
     */
    async addInteractor(name: string, interactorInitializer: (container: Container) => IInteractor): Promise<void> {
        Plugins.addInteractor(name, interactorInitializer);

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
        Plugins.addParticleUpdater(name, updaterInitializer);

        await this.refresh();
    }

    /**
     * Adds a listener to the specified event
     * @param type The event to listen to
     * @param listener The listener of the specified event
     */
    addEventListener(type: string, listener: CustomEventListener): void {
        this.#loader.addEventListener(type, listener);
    }

    /**
     * Removes a listener from the specified event
     * @param type The event to stop listening to
     * @param listener The listener of the specified event
     */
    removeEventListener(type: string, listener: CustomEventListener): void {
        this.#loader.removeEventListener(type, listener);
    }

    /**
     * Dispatches an event that will be listened from listeners
     * @param type The event to dispatch
     * @param args The event parameters
     */
    dispatchEvent(type: string, args: CustomEventArgs): void {
        this.#loader.dispatchEvent(type, args);
    }
}
