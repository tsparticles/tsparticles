import { animate, cancelAnimation, getRangeValue } from "../Utils/MathUtils.js";
import { defaultFps, defaultFpsLimit, millisecondsToSeconds, minFpsLimit } from "./Utils/Constants.js";
import { CanvasManager } from "./CanvasManager.js";
import type { CustomEventArgs } from "../Types/CustomEventArgs.js";
import { EventListeners } from "./Utils/EventListeners.js";
import { EventType } from "../Enums/Types/EventType.js";
import type { IContainerPlugin } from "./Interfaces/IContainerPlugin.js";
import type { IDelta } from "./Interfaces/IDelta.js";
import { type IEffectDrawer } from "./Interfaces/IEffectDrawer.js";
import { type IParticleUpdater } from "./Interfaces/IParticleUpdater.js";
import type { IPlugin } from "./Interfaces/IPlugin.js";
import { type IShapeDrawer } from "./Interfaces/IShapeDrawer.js";
import type { ISourceOptions } from "../Types/ISourceOptions.js";
import { Options } from "../Options/Classes/Options.js";
import { ParticlesManager } from "./ParticlesManager.js";
import type { PluginManager } from "./Utils/PluginManager.js";
import { Retina } from "./Retina.js";
import { getLogger } from "../Utils/LogUtils.js";
import { loadOptions } from "../Utils/OptionsUtils.js";

/** Container constructor parameters */
export interface ContainerParams {
  /** Event dispatch callback */
  dispatchCallback: (eventType: string, args?: CustomEventArgs) => void;
  /** The container id */
  id: string;
  /** Destroy callback */
  onDestroy: (remove: boolean) => void;
  /** The plugin manager instance */
  pluginManager: PluginManager;
  /** Source options to load */
  sourceOptions?: ISourceOptions;
}

/**
 * Checks if the container is still usable
 * @param container - the container to check
 * @returns true if the container is still usable
 */
function guardCheck(container: Container): boolean {
  return !container.destroyed;
}

/**
 * @param delta - the delta object to update
 * @param value - the delta value
 * @param fpsLimit - the fps limit
 * @param smooth - if true, uses smooth delta
 */
function updateDelta(delta: IDelta, value: number, fpsLimit = defaultFps, smooth = false): void {
  delta.value = value;
  delta.factor = smooth ? defaultFps / fpsLimit : (defaultFps * value) / millisecondsToSeconds;
}

/**
 * @param pluginManager - The plugin manager
 * @param container - The container to handle
 * @param sourceOptionsArr - The sourceOptionsArr
 * @returns the options loaded
 */
function loadContainerOptions(
  pluginManager: PluginManager,
  container: Container,
  ...sourceOptionsArr: (ISourceOptions | undefined)[]
): Options {
  const options = new Options(pluginManager, container);

  loadOptions(options, ...sourceOptionsArr);

  return options;
}

/**
 * The object loaded into an HTML element, it'll contain options loaded and all data to let everything working
 * [[include:Container.md]]
 */
export class Container {
  /**
   * The options loaded by the container, it's a full {@link Options} object
   */
  actualOptions;

  /**
   * Canvas object, in charge of the canvas element and drawing functions
   */
  readonly canvas;

  /**
   * Check if the particles' container is destroyed, if so it's not recommended using it
   */
  destroyed;

  /** The effect drawers map */
  effectDrawers: Map<string, IEffectDrawer>;

  /**
   * The container fps limit, coming from options
   */
  fpsLimit;

  /**
   * The container hdr support flag
   */
  hdr;

  /** The container id */
  readonly id;

  /**
   * The container check if it's hidden on the web page
   */
  pageHidden;

  /** Particle created plugins */
  readonly particleCreatedPlugins: IContainerPlugin[];
  /** Particle destroyed plugins */
  readonly particleDestroyedPlugins: IContainerPlugin[];
  /** Particle position plugins */
  readonly particlePositionPlugins: IContainerPlugin[];

  /** The particle updaters array */
  particleUpdaters: IParticleUpdater[];

  /**
   * The particles manager
   */
  readonly particles;

  /**
   * All the plugins used by the container
   */
  readonly plugins: IContainerPlugin[];

  /** The retina manager */
  readonly retina;

  /** The shape drawers map */
  shapeDrawers: Map<string, IShapeDrawer>;

  /**
   * Check if the particles container is started
   */
  started;

  /** The number of z-layers */
  zLayers;

  #delay: number;
  #delayTimeout?: number;
  readonly #delta: IDelta = { value: 0, factor: 0 };
  readonly #dispatchCallback;
  #drawAnimationFrame?: number;
  /**
   * The container duration
   */
  #duration;
  readonly #eventListeners;
  #firstStart;
  #initialSourceOptions;
  /**
   * Last frame time, used for delta values, for keeping animation correct in lower frame rates
   */
  #lastFrameTime?: number;
  /**
   * The container lifetime
   */
  #lifeTime;
  readonly #onDestroy;
  #options;
  #paused;
  readonly #pluginManager;
  #smooth;
  #sourceOptions;

  /**
   * This is the core class, create an instance to have a new working particles manager
   * @param params - The parameters
   */
  constructor(params: ContainerParams) {
    const { dispatchCallback, pluginManager, id, onDestroy, sourceOptions } = params;

    this.#pluginManager = pluginManager;
    this.#dispatchCallback = dispatchCallback;
    this.#onDestroy = onDestroy;
    this.id = Symbol(id);
    this.fpsLimit = 120;
    this.hdr = false;
    this.#smooth = false;
    this.#delay = 0;
    this.#duration = 0;
    this.#lifeTime = 0;
    this.#firstStart = true;
    this.started = false;
    this.destroyed = false;
    this.#paused = true;
    this.#lastFrameTime = 0;
    this.zLayers = 100;
    this.pageHidden = false;
    this.#sourceOptions = sourceOptions;
    this.#initialSourceOptions = sourceOptions;
    this.effectDrawers = new Map();
    this.shapeDrawers = new Map();
    this.particleUpdaters = [];
    this.retina = new Retina(this);
    this.canvas = new CanvasManager(this.#pluginManager, this);
    this.particles = new ParticlesManager(this.#pluginManager, this);
    this.plugins = [];
    this.particleDestroyedPlugins = [];
    this.particleCreatedPlugins = [];
    this.particlePositionPlugins = [];
    /* tsParticles variables with default values */
    this.#options = loadContainerOptions(this.#pluginManager, this);
    this.actualOptions = loadContainerOptions(this.#pluginManager, this);

    /* ---------- tsParticles - start ------------ */
    this.#eventListeners = new EventListeners(this);
    this.dispatchEvent(EventType.containerBuilt);
  }

  /**
   * Gets the animation status
   * @returns `true` is playing, `false` is paused
   */
  get animationStatus(): boolean {
    return !this.#paused && !this.pageHidden && guardCheck(this);
  }

  /**
   * The options used by the container, it's a full {@link Options} object
   * @returns the options used by the container
   */
  get options(): Options {
    return this.#options;
  }

  /**
   * The options that were initially passed to the container
   * @returns the source options passed to the container
   */
  get sourceOptions(): ISourceOptions | undefined {
    return this.#sourceOptions;
  }

  /**
   * Adds to the container lifetime
   * @param value - The value
   */
  addLifeTime(value: number): void {
    this.#lifeTime += value;
  }

  /**
   * Checks if the container is still alive
   * @returns true if particle lifetime is less than duration, or if duration is not set, false otherwise
   */
  alive(): boolean {
    return !this.#duration || this.#lifeTime <= this.#duration;
  }

  /**
   * Destroys the current container, invalidating it
   * @param remove - if true, removes the container from the engine
   */
  destroy(remove = true): void {
    if (!guardCheck(this)) {
      return;
    }

    this.stop();

    this.particles.destroy();
    this.canvas.destroy();

    for (const [, effectDrawer] of this.effectDrawers) {
      effectDrawer.destroy?.(this);
    }

    for (const [, shapeDrawer] of this.shapeDrawers) {
      shapeDrawer.destroy?.(this);
    }

    for (const plugin of this.plugins) {
      plugin.destroy?.();
    }

    this.effectDrawers = new Map();
    this.shapeDrawers = new Map();
    this.particleUpdaters = [];
    this.plugins.length = 0;

    this.#pluginManager.clearPlugins(this);

    this.destroyed = true;

    this.#onDestroy(remove);

    this.dispatchEvent(EventType.containerDestroyed);
  }

  /**
   * Dispatches an event from the container
   * @param type - The type
   * @param data - The data to handle
   */
  dispatchEvent(type: string, data?: unknown): void {
    this.#dispatchCallback(type, {
      container: this,
      data,
    });
  }

  /**
   * Draws a frame
   * @param force - The force
   */
  draw(force: boolean): void {
    if (!guardCheck(this)) {
      return;
    }

    let refreshTime = force;

    this.#drawAnimationFrame = animate((timestamp: number): void => {
      if (refreshTime) {
        this.#lastFrameTime = undefined;

        refreshTime = false;
      }

      this.#nextFrame(timestamp);
    });
  }

  /**
   * Exports the container canvas to the specified format
   * @param type - The type
   * @param options - The options to handle
   * @returns the promise for the export data
   */
  async export(type: string, options: Record<string, unknown> = {}): Promise<Blob | undefined> {
    for (const plugin of this.plugins) {
      if (!plugin.export) {
        continue;
      }

      const res = await plugin.export(type, options);

      if (!res.supported) {
        continue;
      }

      return res.blob;
    }

    getLogger().error(`Export plugin with type ${type} not found`);

    return undefined;
  }

  /**
   * Initializes the container
   * @returns the promise for the init
   */
  async init(): Promise<void> {
    if (!guardCheck(this)) {
      return;
    }

    const allContainerPlugins = new Map<IPlugin, IContainerPlugin>();

    for (const plugin of this.#pluginManager.plugins) {
      const containerPlugin = await plugin.getPlugin(this);

      if (containerPlugin.preInit) {
        await containerPlugin.preInit();
      }

      allContainerPlugins.set(plugin, containerPlugin);
    }

    await this.initDrawersAndUpdaters();

    /* options settings */
    this.#options = loadContainerOptions(this.#pluginManager, this, this.#initialSourceOptions, this.sourceOptions);
    this.actualOptions = loadContainerOptions(this.#pluginManager, this, this.#options);

    this.plugins.length = 0;
    this.particleDestroyedPlugins.length = 0;
    this.particleCreatedPlugins.length = 0;
    this.particlePositionPlugins.length = 0;

    for (const [plugin, containerPlugin] of allContainerPlugins) {
      if (plugin.needsPlugin(this.actualOptions)) {
        this.plugins.push(containerPlugin);

        if (containerPlugin.particleCreated) {
          this.particleCreatedPlugins.push(containerPlugin);
        }

        if (containerPlugin.particleDestroyed) {
          this.particleDestroyedPlugins.push(containerPlugin);
        }

        if (containerPlugin.particlePosition) {
          this.particlePositionPlugins.push(containerPlugin);
        }
      }
    }

    /* init canvas + particles */
    this.retina.init();
    this.canvas.init();

    this.updateActualOptions();

    this.canvas.initBackground();
    this.canvas.resize();

    const { delay, duration, fpsLimit, hdr, smooth, zLayers } = this.actualOptions;

    this.hdr = hdr;
    this.zLayers = zLayers;
    this.#duration = getRangeValue(duration) * millisecondsToSeconds;
    this.#delay = getRangeValue(delay) * millisecondsToSeconds;
    this.#lifeTime = 0;
    this.fpsLimit = fpsLimit > minFpsLimit ? fpsLimit : defaultFpsLimit;
    this.#smooth = smooth;

    for (const plugin of this.plugins) {
      await plugin.init?.();
    }

    await this.particles.init();

    this.dispatchEvent(EventType.containerInit);

    this.particles.setDensity();

    for (const plugin of this.plugins) {
      plugin.particlesSetup?.();
    }

    this.dispatchEvent(EventType.particlesSetup);
  }

  /** Initializes the effect drawers, shape drawers and particle updaters */
  async initDrawersAndUpdaters(): Promise<void> {
    const pluginManager = this.#pluginManager;

    this.effectDrawers = await pluginManager.getEffectDrawers(this, true);
    this.shapeDrawers = await pluginManager.getShapeDrawers(this, true);
    this.particleUpdaters = await pluginManager.getUpdaters(this, true);
  }

  /**
   * Pauses animations
   */
  pause(): void {
    if (!guardCheck(this)) {
      return;
    }

    if (this.#drawAnimationFrame !== undefined) {
      cancelAnimation(this.#drawAnimationFrame);

      this.#drawAnimationFrame = undefined;
    }

    if (this.#paused) {
      return;
    }

    for (const plugin of this.plugins) {
      plugin.pause?.();
    }

    if (!this.pageHidden) {
      this.#paused = true;
    }

    this.dispatchEvent(EventType.containerPaused);
  }

  /**
   * Starts animations and resume from pause
   * @param force - The force
   */
  play(force?: boolean): void {
    if (!guardCheck(this)) {
      return;
    }

    const needsUpdate = this.#paused || force;

    if (this.#firstStart && !this.actualOptions.autoPlay) {
      this.#firstStart = false;

      return;
    }

    if (this.#paused) {
      this.#paused = false;
    }

    if (needsUpdate) {
      for (const plugin of this.plugins) {
        if (plugin.play) {
          plugin.play();
        }
      }
    }

    this.dispatchEvent(EventType.containerPlay);

    this.draw(needsUpdate ?? false);
  }

  /**
   * Restarts the container, just a {@link Container.stop}/{@link Container.start} alias
   * @returns the Promise of the start method
   */
  async refresh(): Promise<void> {
    if (!guardCheck(this)) {
      return;
    }

    /* restart */
    this.stop();

    return this.start();
  }

  /**
   * Resets the container with new options
   * @param sourceOptions - The sourceOptions
   * @returns the promise for the reset
   */
  async reset(sourceOptions?: ISourceOptions): Promise<void> {
    if (!guardCheck(this)) {
      return;
    }

    this.#initialSourceOptions = sourceOptions;
    this.#sourceOptions = sourceOptions;
    this.#options = loadContainerOptions(this.#pluginManager, this, this.#initialSourceOptions, this.sourceOptions);
    this.actualOptions = loadContainerOptions(this.#pluginManager, this, this.#options);

    return this.refresh();
  }

  /**
   * Starts the container, initializes what are needed to create animations and event handling
   */
  async start(): Promise<void> {
    if (!guardCheck(this) || this.started) {
      return;
    }

    await this.init();

    this.started = true;

    await new Promise<void>(resolve => {
      const start = async (): Promise<void> => {
        this.#eventListeners.addListeners();

        for (const plugin of this.plugins) {
          await plugin.start?.();
        }

        this.dispatchEvent(EventType.containerStarted);

        this.play();

        resolve();
      };

      this.#delayTimeout = setTimeout(() => void start(), this.#delay);
    });
  }

  /**
   * Stops the container, opposite to `start`. Clears some resources and stops events.
   */
  stop(): void {
    if (!guardCheck(this) || !this.started) {
      return;
    }

    if (this.#delayTimeout) {
      clearTimeout(this.#delayTimeout);

      this.#delayTimeout = undefined;
    }

    this.#firstStart = true;
    this.started = false;
    this.#eventListeners.removeListeners();
    this.pause();
    this.particles.clear();
    this.canvas.stop();

    for (const plugin of this.plugins) {
      plugin.stop?.();
    }

    this.particleCreatedPlugins.length = 0;
    this.particleDestroyedPlugins.length = 0;
    this.particlePositionPlugins.length = 0;

    this.#sourceOptions = this.#options;

    this.dispatchEvent(EventType.containerStopped);
  }

  /**
   * Updates the container options
   * @returns true if the options were updated, false otherwise
   */
  updateActualOptions(): boolean {
    let refresh = false;

    for (const plugin of this.plugins) {
      if (plugin.updateActualOptions) {
        refresh = plugin.updateActualOptions() || refresh;
      }
    }

    return refresh;
  }

  #nextFrame(timestamp: DOMHighResTimeStamp): void {
    try {
      if (
        !this.#smooth &&
        this.#lastFrameTime !== undefined &&
        timestamp < this.#lastFrameTime + millisecondsToSeconds / this.fpsLimit
      ) {
        this.draw(false);

        return;
      }

      this.#lastFrameTime ??= timestamp;

      updateDelta(this.#delta, timestamp - this.#lastFrameTime, this.fpsLimit, this.#smooth);

      this.addLifeTime(this.#delta.value);
      this.#lastFrameTime = timestamp;

      if (this.#delta.value > millisecondsToSeconds) {
        this.draw(false);

        return;
      }

      this.canvas.render.drawParticles(this.#delta);

      if (!this.alive()) {
        this.destroy();

        return;
      }

      if (this.animationStatus) {
        this.draw(false);
      }
    } catch (e) {
      getLogger().error("error in animation loop", e);
    }
  }
}
