/**
 * Engine class for creating the singleton on globalThis.
 * It's a singleton class for initializing {@link Container} instances
 */
import type { EasingType, EasingTypeAlt } from "../Enums/Types/EasingType.js";
import type {
  EffectInitializer,
  Initializers,
  MoverInitializer,
  ShapeInitializer,
  UpdaterInitializer,
} from "../Types/EngineInitializers.js";
import {
  canvasFirstIndex,
  canvasTag,
  generatedAttribute,
  generatedFalse,
  generatedTrue,
  loadMinIndex,
  loadRandomFactor,
  none,
  one,
  removeDeleteCount,
} from "./Utils/Constants.js";
import {
  getItemMapFromInitializer,
  getItemsFromInitializer,
  itemFromSingleOrMultiple,
  safeDocument,
} from "../Utils/Utils.js";
import type { Container } from "./Container.js";
import type { CustomEventArgs } from "../Types/CustomEventArgs.js";
import type { CustomEventListener } from "../Types/CustomEventListener.js";
import type { EasingFunction } from "../Types/EasingFunction.js";
import { EventDispatcher } from "../Utils/EventDispatcher.js";
import { EventType } from "../Enums/Types/EventType.js";
import type { IColorManager } from "./Interfaces/IColorManager.js";
import type { IEffectDrawer } from "./Interfaces/IEffectDrawer.js";
import type { ILoadParams } from "./Interfaces/ILoadParams.js";
import type { IMovePathGenerator } from "./Interfaces/IMovePathGenerator.js";
import type { IParticleMover } from "./Interfaces/IParticleMover.js";
import type { IParticleUpdater } from "./Interfaces/IParticleUpdater.js";
import type { IParticlesOptions } from "../Options/Interfaces/Particles/IParticlesOptions.js";
import type { IPlugin } from "./Interfaces/IPlugin.js";
import type { IShapeDrawer } from "./Interfaces/IShapeDrawer.js";
import type { ISourceOptions } from "../Types/ISourceOptions.js";
import type { ParticlesOptions } from "../Options/Classes/Particles/ParticlesOptions.js";
import type { RecursivePartial } from "../Types/RecursivePartial.js";
import type { SingleOrMultiple } from "../Types/SingleOrMultiple.js";
import { getLogger } from "../Utils/LogUtils.js";
import { getRandom } from "../Utils/MathUtils.js";

declare const __VERSION__: string;

const fullPercent = "100%";

declare global {
  var tsParticles: Engine;
}

interface DataFromUrlParams {
  fallback?: SingleOrMultiple<ISourceOptions>;
  index?: number;
  url: SingleOrMultiple<string>;
}

type AsyncLoadPluginFunction = (engine: Engine) => Promise<void>;
type SyncLoadPluginFunction = (engine: Engine) => void;
type AsyncLoadPluginNoEngine = () => Promise<void>;
type SyncLoadPluginNoEngine = () => void;
type LoadPluginFunction =
  | AsyncLoadPluginFunction
  | SyncLoadPluginFunction
  | AsyncLoadPluginNoEngine
  | SyncLoadPluginNoEngine;

/**
 * @param data -
 * @returns the options object from the jsonUrl
 */
async function getDataFromUrl(
  data: DataFromUrlParams,
): Promise<SingleOrMultiple<Readonly<ISourceOptions>> | undefined> {
  const url = itemFromSingleOrMultiple(data.url, data.index);

  if (!url) {
    return data.fallback;
  }

  const response = await fetch(url);

  if (response.ok) {
    return (await response.json()) as SingleOrMultiple<ISourceOptions>;
  }

  getLogger().error(`${response.status.toString()} while retrieving config file`);

  return data.fallback;
}

const getCanvasFromContainer = (domContainer: HTMLElement): HTMLCanvasElement => {
    const documentSafe = safeDocument();

    let canvasEl: HTMLCanvasElement;

    if (domContainer instanceof HTMLCanvasElement || domContainer.tagName.toLowerCase() === canvasTag) {
      canvasEl = domContainer as HTMLCanvasElement;

      canvasEl.dataset[generatedAttribute] ??= generatedFalse;
    } else {
      const existingCanvases = domContainer.getElementsByTagName(canvasTag),
        foundCanvas = existingCanvases[canvasFirstIndex];

      /* get existing canvas if present, otherwise a new one will be created */
      if (foundCanvas) {
        canvasEl = foundCanvas;

        canvasEl.dataset[generatedAttribute] = generatedFalse;
      } else {
        /* create canvas element */
        canvasEl = documentSafe.createElement(canvasTag);

        canvasEl.dataset[generatedAttribute] = generatedTrue;

        /* append canvas */
        domContainer.appendChild(canvasEl);
      }
    }

    canvasEl.style.width ||= fullPercent;
    canvasEl.style.height ||= fullPercent;

    return canvasEl;
  },
  getDomContainer = (id: string, source?: HTMLElement): HTMLElement => {
    const documentSafe = safeDocument();

    let domContainer = source ?? documentSafe.getElementById(id);

    if (domContainer) {
      return domContainer;
    }

    domContainer = documentSafe.createElement("div");

    domContainer.id = id;
    domContainer.dataset[generatedAttribute] = generatedTrue;

    documentSafe.body.append(domContainer);

    return domContainer;
  };

/**
 * Engine class for creating the singleton on globalThis.
 * It's a singleton class for initializing {@link Container} instances,
 * and for Plugins class responsible for every external feature
 */
export class Engine {
  readonly colorManagers = new Map<string, IColorManager>();

  readonly easingFunctions = new Map<EasingType | EasingTypeAlt, EasingFunction>();

  /**
   * The drawers (additional effects) array
   */
  readonly effectDrawers = new Map<Container, Map<string, IEffectDrawer>>();

  readonly initializers: Initializers = {
    effects: new Map<string, EffectInitializer>(),
    movers: new Map<string, MoverInitializer>(),
    shapes: new Map<string, ShapeInitializer>(),
    updaters: new Map<string, UpdaterInitializer>(),
  };

  readonly movers = new Map<Container, IParticleMover[]>();

  /**
   * The path generators array
   */
  readonly pathGenerators = new Map<string, IMovePathGenerator>();

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
  readonly shapeDrawers = new Map<Container, Map<string, IShapeDrawer>>();

  /**
   * The updaters array
   */
  readonly updaters = new Map<Container, IParticleUpdater[]>();

  private _allLoadersSet = new Set<LoadPluginFunction>();

  private readonly _configs = new Map<string, ISourceOptions>();

  /**
   * Contains all the {@link Container} instances of the current engine instance
   */
  private readonly _domArray: Container[] = [];

  private readonly _eventDispatcher = new EventDispatcher();

  private _executedSet = new Set<LoadPluginFunction>();

  /**
   * Checks if the engine instance is initialized
   */
  private _initialized = false;

  private _isRunningLoaders = false;

  private readonly _loadPromises = new Set<LoadPluginFunction>();

  get configs(): Record<string, ISourceOptions> {
    const res: Record<string, ISourceOptions> = {};

    for (const [name, config] of this._configs) {
      res[name] = config;
    }

    return res;
  }

  get items(): Container[] {
    return this._domArray;
  }

  get version(): string {
    return __VERSION__;
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
    this._eventDispatcher.dispatchEvent(EventType.configAdded, { data: { name: key, config } });
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

  /**
   * Adds a listener to the specified event
   * @param type - The event to listen to
   * @param listener - The listener of the specified event
   */
  addEventListener(type: string, listener: CustomEventListener): void {
    this._eventDispatcher.addEventListener(type, listener);
  }

  /**
   * @param name - the mover name
   * @param moverInitializer - the mover initializer
   */
  addMover(name: string, moverInitializer: MoverInitializer): void {
    this.initializers.movers.set(name, moverInitializer);
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
   * addPathGenerator adds a named path generator to tsParticles, this can be called by options
   * @param name - the path generator name
   * @param generator - the path generator object
   */
  addPathGenerator(name: string, generator: IMovePathGenerator): void {
    if (this.getPathGenerator(name)) {
      return;
    }

    this.pathGenerators.set(name, generator);
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
   * @param pluginVersion - the plugin version to check against
   */
  checkVersion(pluginVersion: string): void {
    if (this.version === pluginVersion) {
      return;
    }

    throw new Error(
      `The tsParticles version is different from the loaded plugins version. Engine version: ${this.version}. Plugin version: ${pluginVersion}`,
    );
  }

  clearPlugins(container: Container): void {
    this.effectDrawers.delete(container);
    this.movers.delete(container);
    this.shapeDrawers.delete(container);
    this.updaters.delete(container);
  }

  /**
   * Dispatches an event that will be listened from listeners
   * @param type - The event to dispatch
   * @param args - The event parameters
   */
  dispatchEvent(type: string, args?: CustomEventArgs): void {
    this._eventDispatcher.dispatchEvent(type, args);
  }

  /**
   * @param name -
   * @returns the easing function
   */
  getEasing(name: EasingType | EasingTypeAlt): EasingFunction {
    return this.easingFunctions.get(name) ?? ((value: number): number => value);
  }

  async getEffectDrawers(container: Container, force = false): Promise<Map<string, IEffectDrawer>> {
    return getItemMapFromInitializer(container, this.effectDrawers, this.initializers.effects, force);
  }

  async getMovers(container: Container, force = false): Promise<IParticleMover[]> {
    return getItemsFromInitializer(container, this.movers, this.initializers.movers, force);
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
    if (this._initialized || this._isRunningLoaders) return;

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
   * Retrieves a {@link Container} from all the objects loaded
   * @param index - The object index
   * @returns The {@link Container} object at specified index, if present or not destroyed, otherwise undefined
   */
  item(index: number): Container | undefined {
    const { items } = this,
      item = items[index];

    if (item?.destroyed) {
      items.splice(index, removeDeleteCount);

      return;
    }

    return item;
  }

  /**
   * Loads the provided options to create a {@link Container} object.
   * @param params - The particles container params {@link ILoadParams} object
   * @returns A Promise with the {@link Container} object created
   */
  async load(params: ILoadParams): Promise<Container | undefined> {
    await this.init();

    const { Container } = await import("./Container.js"),
      id = params.id ?? params.element?.id ?? `tsparticles${Math.floor(getRandom() * loadRandomFactor).toString()}`,
      { index, url } = params,
      options = url ? await getDataFromUrl({ fallback: params.options, url, index }) : params.options,
      /* elements */
      currentOptions = itemFromSingleOrMultiple(options, index),
      { items } = this,
      oldIndex = items.findIndex(v => v.id.description === id),
      newItem = new Container(this, id, currentOptions);

    if (oldIndex >= loadMinIndex) {
      const old = this.item(oldIndex),
        deleteCount = old ? one : none;

      if (old && !old.destroyed) {
        old.destroy(false);
      }

      items.splice(oldIndex, deleteCount, newItem);
    } else {
      items.push(newItem);
    }

    const domContainer = getDomContainer(id, params.element),
      canvasEl = getCanvasFromContainer(domContainer);

    newItem.canvas.loadCanvas(canvasEl);

    /* launch tsParticles */
    await newItem.start();

    return newItem;
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

    updaters.forEach(updater => updater.loadOptions?.(options, ...sourceOptions));
  }

  /**
   * Reloads all existing tsParticles loaded instances
   * @param refresh - should refresh the dom after reloading
   */
  async refresh(refresh = true): Promise<void> {
    if (!refresh) {
      return;
    }

    await Promise.all(this.items.map(t => t.refresh()));
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

  /**
   * Removes a listener from the specified event
   * @param type - The event to stop listening to
   * @param listener - The listener of the specified event
   */
  removeEventListener(type: string, listener: CustomEventListener): void {
    this._eventDispatcher.removeEventListener(type, listener);
  }

  private async _runLoader(
    loader: LoadPluginFunction,
    executed: Set<LoadPluginFunction>,
    allLoaders: Set<LoadPluginFunction>,
  ): Promise<void> {
    if (executed.has(loader)) return;

    executed.add(loader);
    allLoaders.add(loader);

    await loader(this);
  }
}
