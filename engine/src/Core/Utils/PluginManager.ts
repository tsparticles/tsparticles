import type {
  ContainerScopedMap,
  EffectInitializer,
  Initializers,
  LoadPluginFunction,
  ShapeInitializer,
  UpdaterInitializer,
} from "../../Types/PluginsInitializers.js";
import type { EasingType, EasingTypeAlt } from "../../Enums/Types/EasingType.js";
import { getItemMapFromInitializer, getItemsFromInitializer } from "../../Utils/Utils.js";
import type { Container } from "../Container.js";
import type { EasingFunction } from "../../Types/EasingFunction.js";
import type { Engine } from "../Engine.js";
import type { IColorManager } from ".././Interfaces/IColorManager.js";
import type { IEffectDrawer } from "../Interfaces/IEffectDrawer.js";
import type { IPalette } from "../Interfaces/IPalette.js";
import type { IParticleUpdater } from "../Interfaces/IParticleUpdater.js";
import type { IParticlesOptions } from "../../Options/Interfaces/Particles/IParticlesOptions.js";
import type { IPlugin } from "../Interfaces/IPlugin.js";
import type { IShapeDrawer } from "../Interfaces/IShapeDrawer.js";
import type { ISourceOptions } from "../../Types/ISourceOptions.js";
import type { ParticlesOptions } from "../../Options/Classes/Particles/ParticlesOptions.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";

export class PluginManager {
  readonly colorManagers = new Map<string, IColorManager>();

  readonly easingFunctions = new Map<EasingType | EasingTypeAlt, EasingFunction>();

  /**
   * The drawers (additional effects) array
   */
  readonly effectDrawers: ContainerScopedMap<Map<string, IEffectDrawer>> = new Map();

  readonly initializers: Initializers = {
    effects: new Map<string, EffectInitializer>(),
    shapes: new Map<string, ShapeInitializer>(),
    updaters: new Map<string, UpdaterInitializer>(),
  };

  readonly palettes = new Map<string, IPalette>();

  /**
   * The plugins array
   */
  readonly plugins: IPlugin[] = [];

  /**
   * The presets array
   */
  readonly presets = new Map<string, ISourceOptions>();

  /**
   * The drawers (additional shapes) array
   */
  readonly shapeDrawers: ContainerScopedMap<Map<string, IShapeDrawer>> = new Map();

  /**
   * The updaters array
   */
  readonly updaters: ContainerScopedMap<IParticleUpdater[]> = new Map();

  private _allLoadersSet = new Set<LoadPluginFunction>();

  private readonly _configs = new Map<string, ISourceOptions>();

  private readonly _engine;

  private _executedSet = new Set<LoadPluginFunction>();

  /**
   * Checks if the engine instance is initialized
   */
  private _initialized = false;

  private _isRunningLoaders = false;

  private readonly _loadPromises = new Set<LoadPluginFunction>();

  constructor(engine: Engine) {
    this._engine = engine;
  }

  get configs(): Record<string, ISourceOptions> {
    const res: Record<string, ISourceOptions> = {};

    for (const [name, config] of this._configs) {
      res[name] = config;
    }

    return res;
  }

  /**
   * @param name -
   * @param manager -
   */
  addColorManager(name: string, manager: IColorManager): void {
    this.colorManagers.set(name, manager);
  }

  addConfig(config: ISourceOptions): void {
    const key = config.key ?? config.name ?? "default";

    this._configs.set(key, config);
  }

  /**
   * @param name -
   * @param easing -
   */
  addEasing(name: EasingType | EasingTypeAlt, easing: EasingFunction): void {
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

  clearPluginsById(containerId: symbol): void {
    this.effectDrawers.delete(containerId);
    this.shapeDrawers.delete(containerId);
    this.updaters.delete(containerId);
  }

  /**
   * @param name -
   * @returns the easing function
   */
  getEasing(name: EasingType | EasingTypeAlt): EasingFunction {
    return this.easingFunctions.get(name) ?? ((value: number): number => value);
  }

  getEffectDrawers(container: Container, force = false): Promise<Map<string, IEffectDrawer>> {
    return getItemMapFromInitializer(container, this.effectDrawers, this.initializers.effects, force);
  }

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
    if (this._initialized || this._isRunningLoaders) {
      return;
    }

    this._isRunningLoaders = true;
    this._executedSet = new Set<LoadPluginFunction>();
    this._allLoadersSet = new Set(this._loadPromises);

    try {
      for (const loader of this._allLoadersSet) {
        await this._runLoader(loader, this._executedSet, this._allLoadersSet);
      }
    } finally {
      this._loadPromises.clear();
      this._isRunningLoaders = false;
      this._initialized = true;
    }
  }

  /**
   * Load the given particles options for all the updaters
   * @param containerId - the container id of the updaters
   * @param options - the actual options to set
   * @param sourceOptions - the source options to read
   */
  loadParticlesOptionsById(
    containerId: symbol,
    options: ParticlesOptions,
    ...sourceOptions: (RecursivePartial<IParticlesOptions> | undefined)[]
  ): void {
    const updaters = this.updaters.get(containerId);

    if (!updaters) {
      return;
    }

    updaters.forEach(updater => updater.loadOptions?.(options, ...sourceOptions));
  }

  async register(...loaders: LoadPluginFunction[]): Promise<void> {
    if (this._initialized) {
      throw new Error("Register plugins can only be done before calling tsParticles.load()");
    }

    for (const loader of loaders) {
      if (this._isRunningLoaders) {
        await this._runLoader(loader, this._executedSet, this._allLoadersSet);
      } else {
        this._loadPromises.add(loader);
      }
    }
  }

  private async _runLoader(
    loader: LoadPluginFunction,
    executed: Set<LoadPluginFunction>,
    allLoaders: Set<LoadPluginFunction>,
  ): Promise<void> {
    if (executed.has(loader)) return;

    executed.add(loader);
    allLoaders.add(loader);

    await loader(this._engine);
  }
}
