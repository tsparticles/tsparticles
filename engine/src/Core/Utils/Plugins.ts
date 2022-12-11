import type { Container } from "../Container";
import type { Engine } from "../../engine";
import type { IContainerPlugin } from "../Interfaces/IContainerPlugin";
import type { IInteractor } from "../Interfaces/IInteractor";
import type { IMovePathGenerator } from "../Interfaces/IMovePathGenerator";
import type { IOptions } from "../../Options/Interfaces/IOptions";
import type { IParticleMover } from "../Interfaces/IParticleMover";
import type { IParticleUpdater } from "../Interfaces/IParticleUpdater";
import type { IParticlesOptions } from "../../Options/Interfaces/Particles/IParticlesOptions";
import type { IPlugin } from "../Interfaces/IPlugin";
import type { IShapeDrawer } from "../Interfaces/IShapeDrawer";
import type { Options } from "../../Options/Classes/Options";
import type { ParticlesOptions } from "../../Options/Classes/Particles/ParticlesOptions";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple";
import { executeOnSingleOrMultiple } from "../../Utils/Utils";

type GenericInitializer<T> = (container: Container) => T;

/**
 * Alias for interactivity manager initializer function
 */
type InteractorInitializer = GenericInitializer<IInteractor>;

type MoverInitializer = GenericInitializer<IParticleMover>;

/**
 * Alias for updater initializer function
 */
type UpdaterInitializer = GenericInitializer<IParticleUpdater>;

type Initializers = {
    interactors: Map<string, InteractorInitializer>;
    movers: Map<string, MoverInitializer>;
    updaters: Map<string, UpdaterInitializer>;
};

function getItemsFromInitializer<TItem, TInitializer extends GenericInitializer<TItem>>(
    container: Container,
    map: Map<Container, TItem[]>,
    initializers: Map<string, TInitializer>,
    force = false
): TItem[] {
    let res = map.get(container);

    if (!res || force) {
        res = [...initializers.values()].map((t) => t(container));

        map.set(container, res);
    }

    return res;
}

/**
 * @category Utils
 */
export class Plugins {
    /**
     * The drawers (additional shapes) array
     */
    readonly drawers;

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
     * The updaters array
     */
    readonly updaters;

    /**
     * The engine used for registering plugins
     * @private
     */
    private readonly _engine;

    private readonly _initializers: Initializers;

    /**
     * The constructor of the plugin manager
     * @param engine the parent engine
     */
    constructor(engine: Engine) {
        this._engine = engine;

        this.plugins = [];
        this._initializers = {
            interactors: new Map<string, InteractorInitializer>(),
            movers: new Map<string, MoverInitializer>(),
            updaters: new Map<string, UpdaterInitializer>(),
        };
        this.interactors = new Map<Container, IInteractor[]>();
        this.movers = new Map<Container, IParticleMover[]>();
        this.updaters = new Map<Container, IParticleUpdater[]>();
        this.presets = new Map<string, RecursivePartial<IOptions>>();
        this.drawers = new Map<string, IShapeDrawer>();
        this.pathGenerators = new Map<string, IMovePathGenerator>();
    }

    /**
     * Adds an interaction manager to the current collection
     * @param name the interaction manager name
     * @param initInteractor the interaction manager initializer
     */
    addInteractor(name: string, initInteractor: InteractorInitializer): void {
        this._initializers.interactors.set(name, initInteractor);
    }

    addParticleMover(name: string, initMover: MoverInitializer): void {
        this._initializers.movers.set(name, initMover);
    }

    /**
     * Adds a particle updater to the collection
     * @param name the particle updater name used as a key
     * @param initUpdater the particle updater initializer
     */
    addParticleUpdater(name: string, initUpdater: UpdaterInitializer): void {
        this._initializers.updaters.set(name, initUpdater);
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
     * Adds a plugin to the plugin system, if the plugin already exists, is not added
     * @param plugin the plugin to add
     */
    addPlugin(plugin: IPlugin): void {
        if (!this.getPlugin(plugin.id)) {
            this.plugins.push(plugin);
        }
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
     * Adds a shape drawer (additional particle shape) to the current collection
     * @param types the shape drawer types (particle shape names)
     * @param drawer the shape drawer
     */
    addShapeDrawer(types: SingleOrMultiple<string>, drawer: IShapeDrawer): void {
        executeOnSingleOrMultiple(types, (type) => {
            if (!this.getShapeDrawer(type)) {
                this.drawers.set(type, drawer);
            }
        });
    }

    destroy(container: Container): void {
        this.updaters.delete(container);
        this.movers.delete(container);
        this.interactors.delete(container);
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
     * Returns all the container interaction managers
     * @param container the container used to check which interaction managers are compatible
     * @param force if true reloads the interaction managers collection for the given container
     * @returns the array of interaction managers for the given container
     */
    getInteractors(container: Container, force = false): IInteractor[] {
        return getItemsFromInitializer(container, this.interactors, this._initializers.interactors, force);
    }

    getMovers(container: Container, force = false): IParticleMover[] {
        return getItemsFromInitializer(container, this.movers, this._initializers.movers, force);
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
     * Searches if the specified plugin exists and returns it
     * @param plugin the plugin name
     * @returns the plugin if found, or undefined
     */
    getPlugin(plugin: string): IPlugin | undefined {
        return this.plugins.find((t) => t.id === plugin);
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
     * Searches the given shape drawer type with the given type name
     * @param type the shape drawer type name
     * @returns the shape drawer if found, or undefined
     */
    getShapeDrawer(type: string): IShapeDrawer | undefined {
        return this.drawers.get(type);
    }

    /**
     * This method returns all the supported shapes with this Plugins instance
     * @returns all the supported shapes type name
     */
    getSupportedShapes(): IterableIterator<string> {
        return this.drawers.keys();
    }

    /**
     * Returns all the container particle updaters
     * @param container the container used to check which particle updaters are enabled
     * @param force if true reloads the updater collection for the given container
     * @returns the array of updaters for the given container
     */
    getUpdaters(container: Container, force = false): IParticleUpdater[] {
        return getItemsFromInitializer(container, this.updaters, this._initializers.updaters, force);
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
     * Load the given particles options for all the updaters
     * @param container the container of the updaters
     * @param options the actual options to set
     * @param sourceOptions the source options to read
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
            if (updater.loadOptions) {
                updater.loadOptions(options, ...sourceOptions);
            }
        }
    }
}
