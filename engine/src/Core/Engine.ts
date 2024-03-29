/**
 * Engine class for creating the singleton on window.
 * It's a singleton class for initializing {@link Container} instances
 */
import { errorPrefix, generatedAttribute } from "./Utils/Constants.js";
import { executeOnSingleOrMultiple, getLogger, itemFromSingleOrMultiple } from "../Utils/Utils.js";
import { Container } from "./Container.js";
import type { CustomEventArgs } from "../Types/CustomEventArgs.js";
import type { CustomEventListener } from "../Types/CustomEventListener.js";
import { EventDispatcher } from "../Utils/EventDispatcher.js";
import { EventType } from "../Enums/Types/EventType.js";
import type { IContainerPlugin } from "./Interfaces/IContainerPlugin.js";
import type { IEffectDrawer } from "./Interfaces/IEffectDrawer.js";
import type { IInteractor } from "./Interfaces/IInteractor.js";
import type { ILoadParams } from "./Interfaces/ILoadParams.js";
import type { IMovePathGenerator } from "./Interfaces/IMovePathGenerator.js";
import type { IOptions } from "../Options/Interfaces/IOptions.js";
import type { IParticleMover } from "./Interfaces/IParticleMover.js";
import type { IParticleUpdater } from "./Interfaces/IParticleUpdater.js";
import type { IParticlesOptions } from "../Options/Interfaces/Particles/IParticlesOptions.js";
import type { IPlugin } from "./Interfaces/IPlugin.js";
import type { IShapeDrawer } from "./Interfaces/IShapeDrawer.js";
import type { ISourceOptions } from "../Types/ISourceOptions.js";
import type { Options } from "../Options/Classes/Options.js";
import type { Particle } from "./Particle.js";
import type { ParticlesOptions } from "../Options/Classes/Particles/ParticlesOptions.js";
import type { RecursivePartial } from "../Types/RecursivePartial.js";
import type { SingleOrMultiple } from "../Types/SingleOrMultiple.js";
import { getRandom } from "../Utils/NumberUtils.js";

declare const __VERSION__: string;

declare global {
    interface Window {
        tsParticles: Engine;
    }
}

interface DataFromUrlParams {
    fallback?: SingleOrMultiple<ISourceOptions>;
    index?: number;
    url: SingleOrMultiple<string>;
}

type GenericInitializer<T> = (container: Container) => Promise<T>;

/**
 * Alias for interactivity manager initializer function
 */
type InteractorInitializer = GenericInitializer<IInteractor>;

type MoverInitializer = GenericInitializer<IParticleMover>;

/**
 * Alias for updater initializer function
 */
type UpdaterInitializer = GenericInitializer<IParticleUpdater>;

interface Initializers {
    interactors: Map<string, InteractorInitializer>;
    movers: Map<string, MoverInitializer>;
    updaters: Map<string, UpdaterInitializer>;
}

/**
 * @param container -
 * @param map -
 * @param initializers -
 * @param force -
 * @returns the items from the given initializer
 */
async function getItemsFromInitializer<TItem, TInitializer extends GenericInitializer<TItem>>(
    container: Container,
    map: Map<Container, TItem[]>,
    initializers: Map<string, TInitializer>,
    force = false,
): Promise<TItem[]> {
    let res = map.get(container);

    if (!res || force) {
        res = await Promise.all([...initializers.values()].map(t => t(container)));

        map.set(container, res);
    }

    return res;
}

/**
 * @param data -
 * @returns the options object from the jsonUrl
 */
async function getDataFromUrl(data: DataFromUrlParams): Promise<SingleOrMultiple<ISourceOptions> | undefined> {
    const url = itemFromSingleOrMultiple(data.url, data.index);

    if (!url) {
        return data.fallback;
    }

    const response = await fetch(url);

    if (response.ok) {
        return (await response.json()) as SingleOrMultiple<ISourceOptions>;
    }

    getLogger().error(`${errorPrefix} ${response.status} while retrieving config file`);

    return data.fallback;
}

/**
 * Engine class for creating the singleton on window.
 * It's a singleton class for initializing {@link Container} instances,
 * and for Plugins class responsible for every external feature
 */
export class Engine {
    /**
     * The drawers (additional effects) array
     */
    readonly effectDrawers;

    /**
     * The interaction managers array
     */
    readonly interactors;

    readonly movers;

    /**
     * The path generators array
     */
    readonly pathGenerators;

    /**
     * The plugins array
     */
    readonly plugins: IPlugin[];

    /**
     * The presets array
     */
    readonly presets;

    /**
     * The drawers (additional shapes) array
     */
    readonly shapeDrawers;

    /**
     * The updaters array
     */
    readonly updaters;

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

    private readonly _initializers: Initializers;

    /**
     * Engine constructor, initializes plugins, loader and the containers array
     */
    constructor() {
        this._configs = new Map();
        this._domArray = [];
        this._eventDispatcher = new EventDispatcher();
        this._initialized = false;

        this.plugins = [];
        this._initializers = {
            interactors: new Map<string, InteractorInitializer>(),
            movers: new Map<string, MoverInitializer>(),
            updaters: new Map<string, UpdaterInitializer>(),
        };
        this.interactors = new Map<Container, IInteractor[]>();
        this.movers = new Map<Container, IParticleMover[]>();
        this.updaters = new Map<Container, IParticleUpdater[]>();
        this.presets = new Map<string, ISourceOptions>();
        this.effectDrawers = new Map<string, IEffectDrawer>();
        this.shapeDrawers = new Map<string, IShapeDrawer>();
        this.pathGenerators = new Map<string, IMovePathGenerator>();
    }

    get configs(): Record<string, ISourceOptions> {
        const res: Record<string, ISourceOptions> = {};

        for (const [name, config] of this._configs) {
            res[name] = config;
        }

        return res;
    }

    get version(): string {
        return __VERSION__;
    }

    addConfig(config: ISourceOptions): void {
        const key = config.key ?? config.name ?? "default";

        this._configs.set(key, config);
        this._eventDispatcher.dispatchEvent(EventType.configAdded, { data: { name: key, config } });
    }

    /**
     * addEffect adds effect to tsParticles, it will be available to all future instances created
     * @param effect - the effect name
     * @param drawer - the effect drawer function or class instance that draws the effect in the canvas
     * @param refresh - should refresh the dom after adding the effect
     */
    async addEffect(effect: SingleOrMultiple<string>, drawer: IEffectDrawer, refresh = true): Promise<void> {
        executeOnSingleOrMultiple(effect, type => {
            if (!this.getEffectDrawer(type)) {
                this.effectDrawers.set(type, drawer);
            }
        });

        await this.refresh(refresh);
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
     * Adds an interaction manager to the current collection
     * @param name - the interaction manager name
     * @param interactorInitializer - the interaction manager initializer
     * @param refresh - if true the engine will refresh all the containers
     */
    async addInteractor(name: string, interactorInitializer: InteractorInitializer, refresh = true): Promise<void> {
        this._initializers.interactors.set(name, interactorInitializer);

        await this.refresh(refresh);
    }

    /**
     * @param name - the mover name
     * @param moverInitializer - the mover initializer
     * @param refresh - if true the engine will refresh all the containers
     */
    async addMover(name: string, moverInitializer: MoverInitializer, refresh = true): Promise<void> {
        this._initializers.movers.set(name, moverInitializer);

        await this.refresh(refresh);
    }

    /**
     * Adds a particle updater to the collection
     * @param name - the particle updater name used as a key
     * @param updaterInitializer - the particle updater initializer
     * @param refresh - if true the engine will refresh all the containers
     */
    async addParticleUpdater(name: string, updaterInitializer: UpdaterInitializer, refresh = true): Promise<void> {
        this._initializers.updaters.set(name, updaterInitializer);

        await this.refresh(refresh);
    }

    /**
     * addPathGenerator adds a named path generator to tsParticles, this can be called by options
     * @param name - the path generator name
     * @param generator - the path generator object
     * @param refresh - should refresh the dom after adding the path generator
     */
    async addPathGenerator(name: string, generator: IMovePathGenerator, refresh = true): Promise<void> {
        if (!this.getPathGenerator(name)) {
            this.pathGenerators.set(name, generator);
        }

        await this.refresh(refresh);
    }

    /**
     * addPlugin adds plugin to tsParticles, if an instance needs it, it will be loaded
     * @param plugin - the plugin implementation of {@link IPlugin}
     * @param refresh - should refresh the dom after adding the plugin
     */
    async addPlugin(plugin: IPlugin, refresh = true): Promise<void> {
        if (!this.getPlugin(plugin.id)) {
            this.plugins.push(plugin);
        }

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
        refresh = true,
    ): Promise<void> {
        if (override || !this.getPreset(preset)) {
            this.presets.set(preset, options);
        }

        await this.refresh(refresh);
    }

    /**
     * addShape adds shape to tsParticles, it will be available to all future instances created
     * @param drawer - the shape drawer function or class instance that draws the shape in the canvas
     * @param refresh - should refresh the dom after adding the shape
     */
    async addShape(drawer: IShapeDrawer, refresh = true): Promise<void> {
        for (const validType of drawer.validTypes) {
            if (this.getShapeDrawer(validType)) {
                continue;
            }

            this.shapeDrawers.set(validType, drawer);
        }

        await this.refresh(refresh);
    }

    clearPlugins(container: Container): void {
        this.updaters.delete(container);
        this.movers.delete(container);
        this.interactors.delete(container);
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
            const deleteCount = 1;

            dom.splice(index, deleteCount);

            return;
        }

        return item;
    }

    /**
     * Gets all the available plugins, for the specified container
     * @param container - the container used to check which are the valid plugins
     * @returns a map containing all enabled plugins, with the id as a key
     */
    async getAvailablePlugins(container: Container): Promise<Map<string, IContainerPlugin>> {
        const res = new Map<string, IContainerPlugin>();

        for (const plugin of this.plugins) {
            if (plugin.needsPlugin(container.actualOptions)) {
                res.set(plugin.id, await plugin.getPlugin(container));
            }
        }

        return res;
    }

    /**
     * Searches the given effect drawer type with the given type name
     * @param type - the effect drawer type name
     * @returns the effect drawer if found, or undefined
     */
    getEffectDrawer(type: string): IEffectDrawer | undefined {
        return this.effectDrawers.get(type);
    }

    /**
     * Returns all the container interaction managers
     * @param container - the container used to check which interaction managers are compatible
     * @param force - if true reloads the interaction managers collection for the given container
     * @returns the array of interaction managers for the given container
     */
    async getInteractors(container: Container, force = false): Promise<IInteractor[]> {
        return await getItemsFromInitializer(container, this.interactors, this._initializers.interactors, force);
    }

    async getMovers(container: Container, force = false): Promise<IParticleMover[]> {
        return await getItemsFromInitializer(container, this.movers, this._initializers.movers, force);
    }

    /**
     * Searches the path generator with the given type name
     * @param type - the path generator type to search
     * @returns the path generator if found, or undefined
     */
    getPathGenerator(type: string): IMovePathGenerator | undefined {
        return this.pathGenerators.get(type);
    }

    /**
     * Searches if the specified plugin exists and returns it
     * @param plugin - the plugin name
     * @returns the plugin if found, or undefined
     */
    getPlugin(plugin: string): IPlugin | undefined {
        return this.plugins.find(t => t.id === plugin);
    }

    /**
     * Searches the preset with the given name
     * @param preset - the preset name to search
     * @returns the preset if found, or undefined
     */
    getPreset(preset: string): ISourceOptions | undefined {
        return this.presets.get(preset);
    }

    /**
     * Searches the given shape drawer type with the given type name
     * @param type - the shape drawer type name
     * @returns the shape drawer if found, or undefined
     */
    getShapeDrawer(type: string): IShapeDrawer | undefined {
        return this.shapeDrawers.get(type);
    }

    /**
     * This method returns all the supported effects with this Plugins instance
     * @returns all the supported effects type name
     */
    getSupportedEffects(): IterableIterator<string> {
        return this.effectDrawers.keys();
    }

    /**
     * This method returns all the supported shapes with this Plugins instance
     * @returns all the supported shapes type name
     */
    getSupportedShapes(): IterableIterator<string> {
        return this.shapeDrawers.keys();
    }

    /**
     * Returns all the container particle updaters
     * @param container - the container used to check which particle updaters are enabled
     * @param force - if true reloads the updater collection for the given container
     * @returns the array of updaters for the given container
     */
    async getUpdaters(container: Container, force = false): Promise<IParticleUpdater[]> {
        return await getItemsFromInitializer(container, this.updaters, this._initializers.updaters, force);
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
     * @param params - The particles container params {@link ILoadParams} object
     * @returns A Promise with the {@link Container} object created
     */
    async load(params: ILoadParams): Promise<Container | undefined> {
        const randomFactor = 10000,
            id = params.id ?? params.element?.id ?? `tsparticles${Math.floor(getRandom() * randomFactor)}`,
            { index, url } = params,
            options = url ? await getDataFromUrl({ fallback: params.options, url, index }) : params.options;

        /* elements */
        let domContainer = params.element ?? document.getElementById(id);

        if (!domContainer) {
            domContainer = document.createElement("div");

            domContainer.id = id;

            document.body.append(domContainer);
        }

        const currentOptions = itemFromSingleOrMultiple(options, index),
            dom = this.dom(),
            oldIndex = dom.findIndex(v => v.id.description === id),
            minIndex = 0;

        if (oldIndex >= minIndex) {
            const old = this.domItem(oldIndex);

            if (old && !old.destroyed) {
                old.destroy();

                const deleteCount = 1;

                dom.splice(oldIndex, deleteCount);
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
                const firstIndex = 0;

                canvasEl = existingCanvases[firstIndex];

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

        if (oldIndex >= minIndex) {
            const deleteCount = 0;

            dom.splice(oldIndex, deleteCount, newItem);
        } else {
            dom.push(newItem);
        }

        newItem.canvas.loadCanvas(canvasEl);

        await newItem.start();

        return newItem;
    }

    /**
     * Load the given options for all the plugins
     * @param options - the actual options to set
     * @param sourceOptions - the source options to read
     */
    loadOptions(options: Options, sourceOptions: ISourceOptions): void {
        for (const plugin of this.plugins) {
            plugin.loadOptions(options, sourceOptions);
        }
    }

    /**
     * Load the given particles options for all the updaters
     * @param container - the container of the updaters
     * @param options - the actual options to set
     * @param sourceOptions - the source options to read
     */
    loadParticlesOptions(
        container: Container,
        options: ParticlesOptions,
        ...sourceOptions: (RecursivePartial<IParticlesOptions> | undefined)[]
    ): void {
        const updaters = this.updaters.get(container);

        if (!updaters) {
            return;
        }

        for (const updater of updaters) {
            updater.loadOptions?.(options, ...sourceOptions);
        }
    }

    /**
     * Reloads all existing tsParticles loaded instances
     * @param refresh - should refresh the dom after reloading
     */
    async refresh(refresh = true): Promise<void> {
        if (!refresh) {
            return;
        }

        await Promise.all(this.dom().map(t => t.refresh()));
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
     * Adds another click handler to all the loaded {@link Container} objects.
     * @param callback - The function called after the click event is fired
     */
    setOnClickHandler(callback: (e: Event, particles?: Particle[]) => void): void {
        const dom = this.dom();

        if (!dom.length) {
            throw new Error(`${errorPrefix} can only set click handlers after calling tsParticles.load()`);
        }

        for (const domItem of dom) {
            domItem.addClickHandler(callback);
        }
    }
}
