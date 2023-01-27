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
import { Container } from "./Core/Container";
import type { CustomEventArgs } from "./Types/CustomEventArgs";
import type { CustomEventListener } from "./Types/CustomEventListener";
import { EventDispatcher } from "./Utils/EventDispatcher";
import type { IInteractor } from "./Core/Interfaces/IInteractor";
import type { ILoadParams } from "./Core/Interfaces/ILoadParams";
import type { IMovePathGenerator } from "./Core/Interfaces/IMovePathGenerator";
import type { IParticleMover } from "./Core/Interfaces/IParticlesMover";
import type { IParticleUpdater } from "./Core/Interfaces/IParticleUpdater";
import type { IPlugin } from "./Core/Interfaces/IPlugin";
import type { IShapeDrawer } from "./Core/Interfaces/IShapeDrawer";
import type { ISourceOptions } from "./Types/ISourceOptions";
import type { Particle } from "./Core/Particle";
import { Plugins } from "./Core/Utils/Plugins";
import type { SingleOrMultiple } from "./Types/SingleOrMultiple";
import { generatedAttribute } from "./Core/Utils/Constants";
import { getRandom } from "./Utils/NumberUtils";
import { itemFromSingleOrMultiple } from "./Utils/Utils";

async function getDataFromUrl(data: {
    fallback?: SingleOrMultiple<ISourceOptions>;
    index?: number;
    url: SingleOrMultiple<string>;
}): Promise<SingleOrMultiple<ISourceOptions> | undefined> {
    const url = itemFromSingleOrMultiple(data.url, data.index);

    if (!url) {
        return data.fallback;
    }

    const response = await fetch(url);

    if (response.ok) {
        return response.json();
    }

    console.error(`tsParticles - Error ${response.status} while retrieving config file`);

    return data.fallback;
}

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

    private readonly _configs: Map<string, ISourceOptions>;

    /**
     * Contains all the [[Container]] instances of the current engine instance
     */
    private readonly _domArray: Container[];

    private readonly _eventDispatcher;

    /**
     * Engine constructor, initializes plugins, loader and the containers array
     */
    constructor() {
        this._configs = new Map<string, ISourceOptions>();
        this._domArray = [];
        this._eventDispatcher = new EventDispatcher();
        this.plugins = new Plugins(this);
    }

    get configs(): Record<string, ISourceOptions> {
        const res: { [key: string]: ISourceOptions } = {};

        for (const [name, config] of this._configs) {
            res[name] = config;
        }

        return res;
    }

    addConfig(nameOrConfig: string | ISourceOptions, config?: ISourceOptions): void {
        if (typeof nameOrConfig === "string") {
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
     * @param refresh
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
     *
     * @param name
     * @param moverInitializer
     * @param refresh
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
     *
     * @param name
     * @param updaterInitializer
     * @param refresh
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
     * @param name the path generator name
     * @param generator the path generator object
     * @param refresh if true, all the instances will be refreshed
     */
    async addPathGenerator(name: string, generator: IMovePathGenerator, refresh = true): Promise<void> {
        this.plugins.addPathGenerator(name, generator);

        await this.refresh(refresh);
    }

    /**
     * addPlugin adds plugin to tsParticles, if an instance needs it will be loaded
     * @param plugin the plugin implementation of [[IPlugin]]
     * @param refresh if true, all the instances will be refreshed
     */
    async addPlugin(plugin: IPlugin, refresh = true): Promise<void> {
        this.plugins.addPlugin(plugin);

        await this.refresh(refresh);
    }

    /**
     * addPreset adds preset to tsParticles, it will be available to all future instances created
     * @param preset the preset name
     * @param options the options to add to the preset
     * @param override if true, the preset will override any existing with the same name
     * @param refresh if true, all the instances will be refreshed
     */
    async addPreset(preset: string, options: ISourceOptions, override = false, refresh: true): Promise<void> {
        this.plugins.addPreset(preset, options, override);

        await this.refresh(refresh);
    }

    /**
     * addShape adds shape to tsParticles, it will be available to all future instances created
     * @param shape the shape name
     * @param drawer the shape drawer function or class instance that draws the shape in the canvas
     * @param init Optional: the shape drawer init function, used only if the drawer parameter is a function
     * @param afterEffect Optional: the shape drawer after effect function, used only if the drawer parameter is a function
     * @param destroy Optional: the shape drawer destroy function, used only if the drawer parameter is a function
     * @param refresh if true, all the instances will be refreshed
     */
    async addShape(
        shape: SingleOrMultiple<string>,
        drawer: IShapeDrawer | ShapeDrawerDrawFunction,
        init?: ShapeDrawerInitFunction,
        afterEffect?: ShapeDrawerAfterEffectFunction,
        destroy?: ShapeDrawerDestroyFunction,
        refresh = true
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

        await this.refresh(refresh);
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
     * Starts an animation in a container, starting from the given options
     * @param params all the parameters required for loading options in the current animation
     */
    async load(params: ILoadParams): Promise<Container | undefined> {
        const id = params.id ?? `tsparticles${Math.floor(getRandom() * 10000)}`,
            { index, url } = params,
            options = url
                ? await getDataFromUrl({
                      fallback: params.options,
                      index,
                      url: url,
                  })
                : params.options;

        /* elements */
        let domContainer = params.element ?? document.getElementById(id);

        if (!domContainer) {
            domContainer = document.createElement("div");

            domContainer.id = id;

            document.querySelector("body")?.append(domContainer);
        }

        const currentOptions = itemFromSingleOrMultiple(options, index),
            dom = this.dom(),
            oldIndex = dom.findIndex((v) => v.id === id);

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
        const newItem = new Container(this, id, currentOptions);

        if (oldIndex >= 0) {
            dom.splice(oldIndex, 0, newItem);
        } else {
            dom.push(newItem);
        }

        newItem.canvas.loadCanvas(canvasEl);

        await newItem.start();

        return newItem;
    }

    /**
     * Reloads all existing tsParticles loaded instances
     */
    async refresh(refresh = true): Promise<void> {
        if (!refresh) {
            return;
        }

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
     * Adds an additional click handler to all the loaded [[Container]] objects.
     * @param callback The function called after the click event is fired
     */
    setOnClickHandler(callback: (e: Event, particles?: Particle[]) => void): void {
        const dom = this.dom();

        if (!dom.length) {
            throw new Error("Can only set click handlers after calling tsParticles.load()");
        }

        for (const domItem of dom) {
            domItem.addClickHandler(callback);
        }
    }
}
