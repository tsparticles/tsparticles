import type { Container } from "../Container";
import type { Engine } from "../../engine";
import type { IContainerPlugin } from "../Interfaces/IContainerPlugin";
import type { IInteractor } from "../Interfaces/IInteractor";
import type { IMovePathGenerator } from "../Interfaces/IMovePathGenerator";
import type { IOptions } from "../../Options/Interfaces/IOptions";
import type { IParticleMover } from "../Interfaces/IParticleMover";
import type { IParticleUpdater } from "../Interfaces/IParticleUpdater";
import type { IPlugin } from "../Interfaces/IPlugin";
import type { IShapeDrawer } from "../Interfaces/IShapeDrawer";
import type { Options } from "../../Options/Classes/Options";
import type { RecursivePartial } from "../../Types/RecursivePartial";

/**
 * Alias for interactivity manager initializer function
 */
type InteractorInitializer = (container: Container) => IInteractor;

type MoverInitializer = (container: Container) => IParticleMover;

/**
 * Alias for updater initializer function
 */
type UpdaterInitializer = (container: Container) => IParticleUpdater;

/**
 * @category Utils
 */
export class Plugins {
    /**
     * The engine used for registering plugins
     * @private
     */
    readonly #engine;

    /**
     * The plugins array
     */
    readonly plugins: IPlugin[];

    /**
     * The interaction manager initializers array
     */
    readonly interactorsInitializers;

    readonly moversInitializers;

    /**
     * The updater initializers array
     */
    readonly updatersInitializers;

    /**
     * The interaction managers array
     */
    readonly interactors;

    readonly movers;

    /**
     * The updaters array
     */
    readonly updaters;

    /**
     * The presets array
     */
    readonly presets;

    /**
     * The drawers (additional shapes) array
     */
    readonly drawers;

    /**
     * The path generators array
     */
    readonly pathGenerators;

    /**
     * The constructor of the plugin manager
     * @param engine the parent engine
     */
    constructor(engine: Engine) {
        this.#engine = engine;

        this.plugins = [];
        this.interactorsInitializers = new Map<string, InteractorInitializer>();
        this.moversInitializers = new Map<string, MoverInitializer>();
        this.updatersInitializers = new Map<string, UpdaterInitializer>();
        this.interactors = new Map<Container, IInteractor[]>();
        this.movers = new Map<Container, IParticleMover[]>();
        this.updaters = new Map<Container, IParticleUpdater[]>();
        this.presets = new Map<string, RecursivePartial<IOptions>>();
        this.drawers = new Map<string, IShapeDrawer>();
        this.pathGenerators = new Map<string, IMovePathGenerator>();
    }

    /**
     * Searches if the specified plugin exists and returns it
     * @param plugin the plugin name
     * @returns the plugin if found, or undefined
     */
    getPlugin(plugin: string): IPlugin | undefined {
        return this.plugins.find((t) => t.id === plugin);
    }

    /**
     * Adds a plugin to the plugin system, if the plugin already exists, is not added
     * @param plugin the plugin to add
     */
    addPlugin(plugin: IPlugin): void {
        if (!this.getPlugin(plugin.id)) {
            this.plugins.push(plugin);
        }
    }

    /**
     * Gets all the available plugins, for the specified container
     * @param container the container used to check which are the valid plugins
     * @returns a map containing all enabled plugins, with the id as a key
     */
    getAvailablePlugins(container: Container): Map<string, IContainerPlugin> {
        const res = new Map<string, IContainerPlugin>();

        for (const plugin of this.plugins) {
            if (!plugin.needsPlugin(container.actualOptions)) {
                continue;
            }

            res.set(plugin.id, plugin.getPlugin(container));
        }

        return res;
    }

    /**
     * Load the given options for all the plugins
     * @param options the actual options to set
     * @param sourceOptions the source options to read
     */
    loadOptions(options: Options, sourceOptions: RecursivePartial<IOptions>): void {
        for (const plugin of this.plugins) {
            plugin.loadOptions(options, sourceOptions);
        }
    }

    /**
     * Searches the preset with the given name
     * @param preset the preset name to search
     * @returns the preset if found, or undefined
     */
    getPreset(preset: string): RecursivePartial<IOptions> | undefined {
        return this.presets.get(preset);
    }

    /**
     * Adds a preset to the existing collection
     * @param presetKey the preset name
     * @param options the options to load with the preset name
     * @param override if true, overwrites the existing preset
     */
    addPreset(presetKey: string, options: RecursivePartial<IOptions>, override = false): void {
        if (override || !this.getPreset(presetKey)) {
            this.presets.set(presetKey, options);
        }
    }

    /**
     * Searches the given shape drawer type with the given type name
     * @param type the shape drawer type name
     * @returns the shape drawer if found, or undefined
     */
    getShapeDrawer(type: string): IShapeDrawer | undefined {
        return this.drawers.get(type);
    }

    /**
     * Adds a shape drawer (additional particle shape) to the current collection
     * @param type the shape drawer type (particle shape name)
     * @param drawer the shape drawer
     */
    addShapeDrawer(type: string, drawer: IShapeDrawer): void {
        if (!this.getShapeDrawer(type)) {
            this.drawers.set(type, drawer);
        }
    }

    /**
     * This method returns all the supported shapes with this Plugins instance
     * @returns all the supported shapes type name
     */
    getSupportedShapes(): IterableIterator<string> {
        return this.drawers.keys();
    }

    /**
     * Searches the path generator with the given type name
     * @param type the path generator type to search
     * @returns the path generator if found, or undefined
     */
    getPathGenerator(type: string): IMovePathGenerator | undefined {
        return this.pathGenerators.get(type);
    }

    /**
     * Adds a path generator to the current collection
     * @param type the type used as a key in the collection
     * @param pathGenerator the path generator to add
     */
    addPathGenerator(type: string, pathGenerator: IMovePathGenerator): void {
        if (!this.getPathGenerator(type)) {
            this.pathGenerators.set(type, pathGenerator);
        }
    }

    /**
     * Returns all the container interaction managers
     * @param container the container used to check which interaction managers are compatible
     * @param force if true reloads the interaction managers collection for the given container
     * @returns the array of interaction managers for the given container
     */
    getInteractors(container: Container, force = false): IInteractor[] {
        let res = this.interactors.get(container);

        if (!res || force) {
            res = [...this.interactorsInitializers.values()].map((t) => t(container));

            this.interactors.set(container, res);
        }

        return res;
    }

    /**
     * Adds an interaction manager to the current collection
     * @param name the interaction manager name
     * @param initInteractor the interaction manager initializer
     */
    addInteractor(name: string, initInteractor: (container: Container) => IInteractor): void {
        this.interactorsInitializers.set(name, initInteractor);
    }

    /**
     * Returns all the container particle updaters
     * @param container the container used to check which particle updaters are enabled
     * @param force if true reloads the updater collection for the given container
     * @returns the array of updaters for the given container
     */
    getUpdaters(container: Container, force = false): IParticleUpdater[] {
        let res = this.updaters.get(container);

        if (!res || force) {
            res = [...this.updatersInitializers.values()].map((t) => t(container));

            this.updaters.set(container, res);
        }

        return res;
    }

    /**
     * Adds a particle updater to the collection
     * @param name the particle updater name used as a key
     * @param initUpdater the particle updater initializer
     */
    addParticleUpdater(name: string, initUpdater: (container: Container) => IParticleUpdater): void {
        this.updatersInitializers.set(name, initUpdater);
    }

    getMovers(container: Container, force = false): IParticleMover[] {
        let res = this.movers.get(container);

        if (!res || force) {
            res = [...this.moversInitializers.values()].map((t) => t(container));

            this.movers.set(container, res);
        }

        return res;
    }

    addParticleMover(name: string, initMover: (container: Container) => IParticleMover): void {
        this.moversInitializers.set(name, initMover);
    }
}
