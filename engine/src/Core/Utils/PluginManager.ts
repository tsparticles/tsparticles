import type {
  EffectInitializer,
  Initializers,
  ShapeInitializer,
  UpdaterInitializer,
} from "../../Types/EngineInitializers.js";
import { getItemMapFromInitializer, getItemsFromInitializer } from "../../Utils/Utils.js";
import type { Container } from "../Container.js";
import type { EasingFunction } from "../../Types/EasingFunction.js";
import type { Engine } from "../Engine.js";
import { EventType } from "../../Enums/Types/EventType.js";
import type { IColorManager } from "../Interfaces/IColorManager.js";
import type { IEffectDrawer } from "../Interfaces/IEffectDrawer.js";
import type { IPalette } from "../Interfaces/IPalette.js";
import type { IParticleUpdater } from "../Interfaces/IParticleUpdater.js";
import type { IParticlesOptions } from "../../Options/Interfaces/Particles/IParticlesOptions.js";
import type { IPlugin } from "../Interfaces/IPlugin.js";
import type { IShapeDrawer } from "../Interfaces/IShapeDrawer.js";
import type { ISourceOptions } from "../../Types/ISourceOptions.js";
import type { ParticlesOptions } from "../../Options/Classes/Particles/ParticlesOptions.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";

/** Async plugin loader with engine parameter */
export type AsyncLoadPluginFunction = (engine: Engine) => Promise<void>;
/** Sync plugin loader with engine parameter */
export type SyncLoadPluginFunction = (engine: Engine) => void;
/** Async plugin loader without engine parameter */
export type AsyncLoadPluginNoEngine = () => Promise<void>;
/** Sync plugin loader without engine parameter */
export type SyncLoadPluginNoEngine = () => void;
/** Plugin loader function type */
export type LoadPluginFunction =
  AsyncLoadPluginFunction | SyncLoadPluginFunction | AsyncLoadPluginNoEngine | SyncLoadPluginNoEngine;

/**
 * Stores and resolves plugins, shapes, effects, palettes and updaters.
 */
export class PluginManager {
  /** The color managers map */
  readonly colorManagers = new Map<string, IColorManager>();

  /** The easing functions map */
  readonly easingFunctions = new Map<string, EasingFunction>();

  /**
   * The drawers (additional effects) array
   */
  readonly effectDrawers = new Map<Container, Map<string, IEffectDrawer>>();

  /** The initializers map */
  readonly initializers: Initializers = {
    effects: new Map<string, EffectInitializer>(),
    shapes: new Map<string, ShapeInitializer>(),
    updaters: new Map<string, UpdaterInitializer>(),
  };

  /** The palettes map */
  readonly palettes = new Map<string, IPalette>();

  /**
   * The plugins array
   */
  readonly plugins: IPlugin[] = [];

  /**
   * The presets array
   */
  /** The presets map */
  readonly presets = new Map<string, ISourceOptions>();

  /**
   * The drawers (additional shapes) array
   */
  readonly shapeDrawers = new Map<Container, Map<string, IShapeDrawer>>();

  /**
   * The updaters array
   */
  readonly updaters = new Map<Container, IParticleUpdater[]>();

  #allLoadersSet = new Set<LoadPluginFunction>();

  readonly #configs = new Map<string, ISourceOptions>();

  readonly #engine;

  #executedSet = new Set<LoadPluginFunction>();

  /**
   * Checks if the engine instance is initialized
   */
  #initialized = false;

  #isRunningLoaders = false;

  readonly #loadPromises = new Set<LoadPluginFunction>();

  constructor(engine: Engine) {
    this.#engine = engine;
  }

  /**
   * The configs record
   * @returns the available configs
   */
  get configs(): Record<string, ISourceOptions> {
    const res: Record<string, ISourceOptions> = {};

    for (const [name, config] of this.#configs) {
      res[name] = config;
    }

    return res;
  }

  /**
   * Registers a color manager.
   * @param name - Color manager identifier.
   * @param manager - Color manager implementation.
   */
  addColorManager(name: string, manager: IColorManager): void {
    this.colorManagers.set(name, manager);
  }

  /**
   * Adds a config to the manager
   * @param config - the configuration to add
   */
  addConfig(config: ISourceOptions): void {
    const key = config.key ?? config.name ?? "default";

    this.#configs.set(key, config);
    this.#engine.dispatchEvent(EventType.configAdded, { data: { name: key, config } });
  }

  /**
   * Registers an easing function.
   * @param name - Easing identifier.
   * @param easing - Easing function implementation.
   */
  addEasing(name: string, easing: EasingFunction): void {
    if (this.easingFunctions.get(name)) {
      return;
    }

    this.easingFunctions.set(name, easing);
  }

  /**
   * addEffect adds effect to tsParticles, it will be available to all future instances created
   * @param effect - the effect name
   * @param drawer - the effect drawer function or class instance that draws the effect in the canvas
   */
  addEffect(effect: string, drawer: EffectInitializer): void {
    this.initializers.effects.set(effect, drawer);
  }

  /**
   * Adds a palette to the manager
   * @param name - the palette name
   * @param palette - the palette to add
   */
  addPalette(name: string, palette: IPalette): void {
    this.palettes.set(name, palette);
  }

  /**
   * Adds a particle updater to the collection
   * @param name - the particle updater name used as a key
   * @param updaterInitializer - the particle updater initializer
   */
  addParticleUpdater(name: string, updaterInitializer: UpdaterInitializer): void {
    this.initializers.updaters.set(name, updaterInitializer);
  }

  /**
   * addPlugin adds plugin to tsParticles, if an instance needs it, it will be loaded
   * @param plugin - the plugin implementation of {@link IPlugin}
   */
  addPlugin(plugin: IPlugin): void {
    if (this.getPlugin(plugin.id)) {
      return;
    }

    this.plugins.push(plugin);
  }

  /**
   * addPreset adds preset to tsParticles, it will be available to all future instances created
   * @param preset - the preset name
   * @param options - the options to add to the preset
   * @param override - if true, the preset will override any existing with the same name
   */
  addPreset(preset: string, options: Readonly<ISourceOptions>, override = false): void {
    if (!(override || !this.getPreset(preset))) {
      return;
    }

    this.presets.set(preset, options);
  }

  /**
   * addShape adds shape to tsParticles, it will be available to all future instances created
   * @param shapes - the shape names to add, it can be a single shape or an array of shapes
   * @param drawer - the shape drawer function or class instance that draws the shape in the canvas
   */
  addShape(shapes: string[], drawer: ShapeInitializer): void {
    for (const shape of shapes) {
      this.initializers.shapes.set(shape, drawer);
    }
  }

  /**
   * Clears plugins for a container
   * @param container - the container to clear plugins for
   */
  clearPlugins(container: Container): void {
    this.effectDrawers.delete(container);
    this.shapeDrawers.delete(container);
    this.updaters.delete(container);
  }

  /**
   * Gets an easing function by name.
   * @param name - Easing identifier.
   * @returns The easing function, or a passthrough easing if not found.
   */
  getEasing(name: string): EasingFunction {
    return this.easingFunctions.get(name) ?? ((value: number): number => value);
  }

  /**
   * Gets the effect drawers for a container
   * @param container - the container to get effect drawers for
   * @param force - if true, reloads the effect drawers
   * @returns the effect drawers map
   */
  getEffectDrawers(container: Container, force = false): Promise<Map<string, IEffectDrawer>> {
    return getItemMapFromInitializer(container, this.effectDrawers, this.initializers.effects, force);
  }

  /**
   * Gets a palette by name
   * @param name - the palette name
   * @returns the palette if found
   */
  getPalette(name: string): IPalette | undefined {
    return this.palettes.get(name);
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
   * Gets the shape drawers for a container
   * @param container - the container to get shape drawers for
   * @param force - if true, reloads the shape drawers
   * @returns the shape drawers map
   */
  async getShapeDrawers(container: Container, force = false): Promise<Map<string, IShapeDrawer>> {
    return getItemMapFromInitializer(container, this.shapeDrawers, this.initializers.shapes, force);
  }

  /**
   * Returns all the container particle updaters
   * @param container - the container used to check which particle updaters are enabled
   * @param force - if true reloads the updater collection for the given container
   * @returns the array of updaters for the given container
   */
  async getUpdaters(container: Container, force = false): Promise<IParticleUpdater[]> {
    return getItemsFromInitializer(container, this.updaters, this.initializers.updaters, force);
  }

  /**
   * init method, used by imports
   */
  async init(): Promise<void> {
    if (this.#initialized || this.#isRunningLoaders) {
      return;
    }

    this.#isRunningLoaders = true;

    this.#executedSet = new Set<LoadPluginFunction>();
    this.#allLoadersSet = new Set(this.#loadPromises);

    try {
      for (const loader of this.#allLoadersSet) {
        await this.#runLoader(loader, this.#executedSet, this.#allLoadersSet);
      }
    } finally {
      this.#loadPromises.clear();
      this.#isRunningLoaders = false;
      this.#initialized = true;
    }
  }

  /**
   * Loads particles options for all updaters.
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

    updaters.forEach(updater => updater.loadOptions?.(options, ...sourceOptions));
  }

  /**
   * Registers plugin loaders
   * @param loaders - the plugin loader functions to register
   */
  async register(...loaders: LoadPluginFunction[]): Promise<void> {
    if (this.#initialized) {
      throw new Error("Register plugins can only be done before calling tsParticles.load()");
    }

    for (const loader of loaders) {
      if (this.#isRunningLoaders) {
        await this.#runLoader(loader, this.#executedSet, this.#allLoadersSet);
      } else {
        this.#loadPromises.add(loader);
      }
    }
  }

  async #runLoader(
    loader: LoadPluginFunction,
    executed: Set<LoadPluginFunction>,
    allLoaders: Set<LoadPluginFunction>,
  ): Promise<void> {
    if (executed.has(loader)) return;

    executed.add(loader);
    allLoaders.add(loader);

    await loader(this.#engine);
  }
}
