/**
 * Engine class for creating the singleton on window.
 * It's a singleton class for initializing {@link Container} instances
 */
import type {
    ShapeDrawerAfterEffectFunction,
    ShapeDrawerDestroyFunction,
    ShapeDrawerDrawFunction,
    ShapeDrawerInitFunction,
} from "./Types/ShapeDrawerFunctions";
import { errorPrefix, generatedAttribute } from "./Core/Utils/Constants";
import { getLogger, isBoolean, isFunction, isNumber, isString, itemFromSingleOrMultiple } from "./Utils/Utils";
import { Container } from "./Core/Container";
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
import type { ISourceOptions } from "./Types/ISourceOptions";
import type { LoadParams } from "./Core/Interfaces/LoadParams";
import type { Particle } from "./Core/Particle";
import { Plugins } from "./Core/Utils/Plugins";
import type { RecursivePartial } from "./Types/RecursivePartial";
import type { SingleOrMultiple } from "./Types/SingleOrMultiple";
import { getRandom } from "./Utils/NumberUtils";

declare const __VERSION__: string;

declare global {
    interface Window {
        tsParticles: Engine;
    }
}

/**
 * @param jsonUrl -
 * @param index -
 * @returns the options object from the jsonUrl
 */
async function getDataFromUrl(
    jsonUrl?: SingleOrMultiple<string>,
    index?: number
): Promise<SingleOrMultiple<RecursivePartial<IOptions>> | undefined> {
    const url = itemFromSingleOrMultiple(jsonUrl, index);

    if (!url) {
        return;
    }

    const response = await fetch(url);

    if (response.ok) {
        return response.json();
    }

    getLogger().error(`${errorPrefix} ${response.status} while retrieving config file`);
}

/**
 *
 * @param params -
 * @returns true if the params are empty, false otherwise
 */
function isParamsEmpty(params: LoadParams): boolean {
    return !params.tagId && !params.element && !params.url && !params.options;
}

/**
 *
 * @param obj -
 * @returns true if the params are valid, false otherwise
 */
function isParams(obj: unknown): obj is LoadParams {
    return !isParamsEmpty(obj as LoadParams);
}

/**
 * Engine class for creating the singleton on window.
 * It's a singleton class for initializing {@link Container} instances,
 * and for Plugins class responsible for every external feature
 */
export class Engine {
    /**
     * Contains the {@link Plugins} engine instance
     */
    readonly plugins: Plugins;

    private readonly _configs: Map<string, ISourceOptions>;
    /**
     * Contains all the {@link Container} instances of the current engine instance
     */
    private readonly _domArray: Container[];

    private readonly _eventDispatcher;

    /**
     * Checks if the engine instance is initialized
     */
    private _initialized: boolean;

    /**
     * Engine constructor, initializes plugins, loader and the containers array
     */
    constructor() {
        this._configs = new Map();
        this._domArray = [];
        this._eventDispatcher = new EventDispatcher();
        this._initialized = false;
        this.plugins = new Plugins(this);
    }

    get configs(): Record<string, ISourceOptions> {
        const res: { [key: string]: ISourceOptions } = {};

        for (const [name, config] of this._configs) {
            res[name] = config;
        }

        return res;
    }

    get version(): string {
        return __VERSION__;
    }

    addConfig(nameOrConfig: string | ISourceOptions, config?: ISourceOptions): void {
        if (isString(nameOrConfig)) {
            if (config) {
                config.name = nameOrConfig;

                this._configs.set(nameOrConfig, config);
            }
        } else {
            this._configs.set(nameOrConfig.name ?? "default", nameOrConfig);
        }
    }

    /**
     * Adds a listener to the specified event
     * @param type - The event to listen to
     * @param listener - The listener of the specified event
     */
    addEventListener(type: string, listener: CustomEventListener): void {
        this._eventDispatcher.addEventListener(type, listener);
    }

    /**
     * @param name -
     * @param interactorInitializer -
     * @param refresh -
     */
    async addInteractor(
        name: string,
        interactorInitializer: (container: Container) => IInteractor,
        refresh = true
    ): Promise<void> {
        this.plugins.addInteractor(name, interactorInitializer);

        await this.refresh(refresh);
    }

    /**
     * @param name -
     * @param moverInitializer -
     * @param refresh -
     */
    async addMover(
        name: string,
        moverInitializer: (container: Container) => IParticleMover,
        refresh = true
    ): Promise<void> {
        this.plugins.addParticleMover(name, moverInitializer);

        await this.refresh(refresh);
    }

    /**
     * @param name -
     * @param updaterInitializer -
     * @param refresh -
     */
    async addParticleUpdater(
        name: string,
        updaterInitializer: (container: Container) => IParticleUpdater,
        refresh = true
    ): Promise<void> {
        this.plugins.addParticleUpdater(name, updaterInitializer);

        await this.refresh(refresh);
    }

    /**
     * addPathGenerator adds a named path generator to tsParticles, this can be called by options
     * @param name - the path generator name
     * @param generator - the path generator object
     * @param refresh - should refresh the dom after adding the path generator
     */
    async addPathGenerator(name: string, generator: IMovePathGenerator, refresh = true): Promise<void> {
        this.plugins.addPathGenerator(name, generator);

        await this.refresh(refresh);
    }

    /**
     * addPlugin adds plugin to tsParticles, if an instance needs it, it will be loaded
     * @param plugin - the plugin implementation of {@link IPlugin}
     * @param refresh - should refresh the dom after adding the plugin
     */
    async addPlugin(plugin: IPlugin, refresh = true): Promise<void> {
        this.plugins.addPlugin(plugin);

        await this.refresh(refresh);
    }

    /**
     * addPreset adds preset to tsParticles, it will be available to all future instances created
     * @param preset - the preset name
     * @param options - the options to add to the preset
     * @param override - if true, the preset will override any existing with the same name
     * @param refresh - should refresh the dom after adding the preset
     */
    async addPreset(
        preset: string,
        options: RecursivePartial<IOptions>,
        override = false,
        refresh = true
    ): Promise<void> {
        this.plugins.addPreset(preset, options, override);

        await this.refresh(refresh);
    }

    /**
     * addShape adds shape to tsParticles, it will be available to all future instances created
     * @param shape - the shape name
     * @param drawer - the shape drawer function or class instance that draws the shape in the canvas
     * @param initOrRefresh - Optional: the shape drawer init function, used only if the drawer parameter is a function
     * @param afterEffectOrRefresh - Optional: the shape drawer after effect function, used only if the drawer parameter is a function
     * @param destroyOrRefresh - Optional: the shape drawer destroy function, used only if the drawer parameter is a function
     * @param refresh - should refresh the dom after adding the shape
     */
    async addShape(
        shape: SingleOrMultiple<string>,
        drawer: IShapeDrawer | ShapeDrawerDrawFunction,
        initOrRefresh?: ShapeDrawerInitFunction | boolean,
        afterEffectOrRefresh?: ShapeDrawerAfterEffectFunction | boolean,
        destroyOrRefresh?: ShapeDrawerDestroyFunction | boolean,
        refresh = true
    ): Promise<void> {
        let customDrawer: IShapeDrawer;

        let realRefresh = refresh,
            realInit: ShapeDrawerInitFunction | undefined,
            realAfterEffect: ShapeDrawerAfterEffectFunction | undefined,
            realDestroy: ShapeDrawerDestroyFunction | undefined;

        if (isBoolean(initOrRefresh)) {
            realRefresh = initOrRefresh;
            realInit = undefined;
        } else {
            realInit = initOrRefresh;
        }

        if (isBoolean(afterEffectOrRefresh)) {
            realRefresh = afterEffectOrRefresh;
            realAfterEffect = undefined;
        } else {
            realAfterEffect = afterEffectOrRefresh;
        }

        if (isBoolean(destroyOrRefresh)) {
            realRefresh = destroyOrRefresh;
            realDestroy = undefined;
        } else {
            realDestroy = destroyOrRefresh;
        }

        if (isFunction(drawer)) {
            customDrawer = {
                afterEffect: realAfterEffect,
                destroy: realDestroy,
                draw: drawer,
                init: realInit,
            };
        } else {
            customDrawer = drawer;
        }

        this.plugins.addShapeDrawer(shape, customDrawer);

        await this.refresh(realRefresh);
    }

    /**
     * Dispatches an event that will be listened from listeners
     * @param type - The event to dispatch
     * @param args - The event parameters
     */
    dispatchEvent(type: string, args: CustomEventArgs): void {
        this._eventDispatcher.dispatchEvent(type, args);
    }

    /**
     * All the {@link Container} objects loaded
     * @returns All the {@link Container} objects loaded
     */
    dom(): Container[] {
        return this._domArray;
    }

    /**
     * Retrieves a {@link Container} from all the objects loaded
     * @param index - The object index
     * @returns The {@link Container} object at specified index, if present or not destroyed, otherwise undefined
     */
    domItem(index: number): Container | undefined {
        const dom = this.dom(),
            item = dom[index];

        if (!item || item.destroyed) {
            dom.splice(index, 1);

            return;
        }

        return item;
    }

    /**
     * init method, used by imports
     */
    init(): void {
        if (this._initialized) {
            return;
        }

        this._initialized = true;
    }

    /**
     * Loads the provided options to create a {@link Container} object.
     * @param tagIdOrOptionsOrParams - The particles container element id, or options, or {@link LoadParams} object
     * @param options - The options object to initialize the {@link Container}
     * @returns A Promise with the {@link Container} object created
     */
    async load(
        tagIdOrOptionsOrParams: string | SingleOrMultiple<RecursivePartial<IOptions>> | LoadParams,
        options?: SingleOrMultiple<RecursivePartial<IOptions>>
    ): Promise<Container | undefined> {
        return this.loadFromArray(tagIdOrOptionsOrParams, options);
    }

    /**
     * Loads an options object from the provided array to create a {@link Container} object.
     * @param tagIdOrOptionsOrParams - The particles container element id
     * @param optionsOrIndex - The options array to get the item from
     * @param index - If provided gets the corresponding item from the array
     * @returns A Promise with the {@link Container} object created
     */
    async loadFromArray(
        tagIdOrOptionsOrParams: string | SingleOrMultiple<RecursivePartial<IOptions>> | LoadParams,
        optionsOrIndex?: SingleOrMultiple<RecursivePartial<IOptions>> | number,
        index?: number
    ): Promise<Container | undefined> {
        let params: LoadParams;

        if (!isParams(tagIdOrOptionsOrParams)) {
            params = {};

            if (isString(tagIdOrOptionsOrParams)) {
                params.tagId = tagIdOrOptionsOrParams;
            } else {
                params.options = tagIdOrOptionsOrParams;
            }

            if (isNumber(optionsOrIndex)) {
                params.index = optionsOrIndex;
            } else {
                params.options = optionsOrIndex ?? params.options;
            }

            params.index = index ?? params.index;
        } else {
            params = tagIdOrOptionsOrParams;
        }

        return this._loadParams(params);
    }

    /**
     * Loads the provided json with a GET request. The content will be used to create a {@link Container} object.
     * This method is async, so if you need a callback refer to JavaScript function `fetch`
     * @param tagId - the particles container element id
     * @param pathConfigJson - the json path (or paths array) to use in the GET request
     * @param index - the index of the paths array, if a single path is passed this value is ignored
     * @returns A Promise with the {@link Container} object created
     */
    async loadJSON(
        tagId: string | SingleOrMultiple<string>,
        pathConfigJson?: SingleOrMultiple<string> | number,
        index?: number
    ): Promise<Container | undefined> {
        let url: SingleOrMultiple<string>, id: string | undefined;

        if (isNumber(pathConfigJson) || pathConfigJson === undefined) {
            url = tagId;
        } else {
            id = tagId as string;
            url = pathConfigJson;
        }

        return this._loadParams({ tagId: id, url, index });
    }

    /**
     * Reloads all existing tsParticles loaded instances
     * @param refresh - should refresh the dom after reloading
     */
    async refresh(refresh = true): Promise<void> {
        if (!refresh) {
            return;
        }

        this.dom().forEach((t) => t.refresh());
    }

    /**
     * Removes a listener from the specified event
     * @param type - The event to stop listening to
     * @param listener - The listener of the specified event
     */
    removeEventListener(type: string, listener: CustomEventListener): void {
        this._eventDispatcher.removeEventListener(type, listener);
    }

    /**
     * Loads the provided option to create a {@link Container} object using the element parameter as a container
     * @param id - The particles container id
     * @param element - The dom element used to contain the particles
     * @param options - The options object to initialize the {@link Container}
     * @param index - The index of the options to use, if options is an array
     * @returns A Promise with the {@link Container} object created
     */
    async set(
        id: string | HTMLElement,
        element: HTMLElement | RecursivePartial<IOptions>,
        options?: SingleOrMultiple<RecursivePartial<IOptions>> | number,
        index?: number
    ): Promise<Container | undefined> {
        const params: LoadParams = { index };

        if (isString(id)) {
            params.tagId = id;
        } else {
            params.element = id;
        }

        if (element instanceof HTMLElement) {
            params.element = element;
        } else {
            params.options = element;
        }

        if (isNumber(options)) {
            params.index = options;
        } else {
            params.options = options ?? params.options;
        }

        return this._loadParams(params);
    }

    /**
     * Loads the provided option to create a {@link Container} object using the element parameter as a container
     * @param id - The particles container id
     * @param element - The dom element used to contain the particles
     * @param pathConfigJson - the json path (or paths array) to use in the GET request
     * @param index - the index of the paths array, if a single path is passed this value is ignored
     * @returns A Promise with the {@link Container} object created
     */
    async setJSON(
        id: string | HTMLElement,
        element: HTMLElement | SingleOrMultiple<string>,
        pathConfigJson?: SingleOrMultiple<string> | number,
        index?: number
    ): Promise<Container | undefined> {
        const params: LoadParams = {};

        if (id instanceof HTMLElement) {
            params.element = id;
            params.url = element as SingleOrMultiple<string>;
            params.index = pathConfigJson as number;
        } else {
            params.tagId = id;
            params.element = element as HTMLElement;
            params.url = pathConfigJson as SingleOrMultiple<string>;
            params.index = index;
        }

        return this._loadParams(params);
    }

    /**
     * Adds another click handler to all the loaded {@link Container} objects.
     * @param callback - The function called after the click event is fired
     */
    setOnClickHandler(callback: (e: Event, particles?: Particle[]) => void): void {
        const dom = this.dom();

        if (!dom.length) {
            throw new Error(
                `${errorPrefix} can only set click handlers after calling tsParticles.load() or tsParticles.loadJSON()`
            );
        }

        for (const domItem of dom) {
            domItem.addClickHandler(callback);
        }
    }

    /**
     * Starts an animation in a container, starting from the given options
     * @param params - all the parameters required for loading options in the current animation
     * @returns A Promise with the {@link Container} object created
     */
    private async _loadParams(params: LoadParams): Promise<Container | undefined> {
        const tagId = params.tagId ?? `tsparticles${Math.floor(getRandom() * 10000)}`,
            { index, url: jsonUrl } = params,
            options = jsonUrl ? await getDataFromUrl(jsonUrl, index) : params.options;

        /* elements */
        let domContainer = params.element ?? document.getElementById(tagId);

        if (!domContainer) {
            domContainer = document.createElement("div");

            domContainer.id = tagId;

            document.body.append(domContainer);
        }

        const currentOptions = itemFromSingleOrMultiple(options, index),
            dom = this.dom(),
            oldIndex = dom.findIndex((v) => v.id === tagId);

        if (oldIndex >= 0) {
            const old = this.domItem(oldIndex);

            if (old && !old.destroyed) {
                old.destroy();

                dom.splice(oldIndex, 1);
            }
        }

        let canvasEl: HTMLCanvasElement;

        if (domContainer.tagName.toLowerCase() === "canvas") {
            canvasEl = domContainer as HTMLCanvasElement;

            canvasEl.dataset[generatedAttribute] = "false";
        } else {
            const existingCanvases = domContainer.getElementsByTagName("canvas");

            /* get existing canvas if present, otherwise a new one will be created */
            if (existingCanvases.length) {
                canvasEl = existingCanvases[0];

                canvasEl.dataset[generatedAttribute] = "false";
            } else {
                /* create canvas element */
                canvasEl = document.createElement("canvas");

                canvasEl.dataset[generatedAttribute] = "true";

                /* append canvas */
                domContainer.appendChild(canvasEl);
            }
        }

        if (!canvasEl.style.width) {
            canvasEl.style.width = "100%";
        }

        if (!canvasEl.style.height) {
            canvasEl.style.height = "100%";
        }

        /* launch tsParticles */
        const newItem = new Container(this, tagId, currentOptions);

        if (oldIndex >= 0) {
            dom.splice(oldIndex, 0, newItem);
        } else {
            dom.push(newItem);
        }

        newItem.canvas.loadCanvas(canvasEl);

        await newItem.start();

        return newItem;
    }
}
