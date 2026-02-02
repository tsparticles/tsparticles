import { animate, cancelAnimation, getRangeValue } from "../Utils/MathUtils.js";
import {
  defaultFps,
  defaultFpsLimit,
  millisecondsToSeconds,
  minFpsLimit,
  removeDeleteCount,
  removeMinIndex,
} from "./Utils/Constants.js";
import { Canvas } from "./Canvas.js";
import type { Engine } from "./Engine.js";
import { EventListeners } from "./Utils/EventListeners.js";
import { EventType } from "../Enums/Types/EventType.js";
import type { IContainerPlugin } from "./Interfaces/IContainerPlugin.js";
import type { IDelta } from "./Interfaces/IDelta.js";
import type { IPlugin } from "./Interfaces/IPlugin.js";
import type { ISourceOptions } from "../Types/ISourceOptions.js";
import { Options } from "../Options/Classes/Options.js";
import { Particles } from "./Particles.js";
import { Retina } from "./Retina.js";
import { getLogger } from "../Utils/LogUtils.js";
import { loadOptions } from "../Utils/OptionsUtils.js";

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
 * @param engine -
 * @param container -
 * @param sourceOptionsArr -
 * @returns the options loaded
 */
function loadContainerOptions(
  engine: Engine,
  container: Container,
  ...sourceOptionsArr: (ISourceOptions | undefined)[]
): Options {
  const options = new Options(engine, container);

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

  /**
   * The container fps limit, coming from options
   */
  fpsLimit;

  /**
   * The container hdr support flag
   */
  hdr;

  readonly id;

  /**
   * The container check if it's hidden on the web page
   */
  pageHidden;

  readonly particleCreatedPlugins: IContainerPlugin[];
  readonly particleDestroyedPlugins: IContainerPlugin[];
  readonly particlePositionPlugins: IContainerPlugin[];

  /**
   * The particles manager
   */
  readonly particles;

  /**
   * All the plugins used by the container
   */
  readonly plugins: IContainerPlugin[];

  readonly retina;

  /**
   * Check if the particles container is started
   */
  started;

  zLayers;

  private _delay: number;
  private _delayTimeout?: number | NodeJS.Timeout;
  private readonly _delta: IDelta = { value: 0, factor: 0 };
  private _drawAnimationFrame?: number;
  /**
   * The container duration
   */
  private _duration;
  private readonly _engine;
  private readonly _eventListeners;
  private _firstStart;
  private _initialSourceOptions;
  /**
   * Last frame time, used for delta values, for keeping animation correct in lower frame rates
   */
  private _lastFrameTime?: number;
  /**
   * The container lifetime
   */
  private _lifeTime;
  private _options;
  private _paused;
  private _smooth;
  private _sourceOptions;

  /**
   * This is the core class, create an instance to have a new working particles manager
   * @param engine - the engine used by container
   * @param id - the id to identify this instance
   * @param sourceOptions - the options to load
   */
  constructor(engine: Engine, id: string, sourceOptions?: ISourceOptions) {
    this._engine = engine;
    this.id = Symbol(id);
    this.fpsLimit = 120;
    this.hdr = false;
    this._smooth = false;
    this._delay = 0;
    this._duration = 0;
    this._lifeTime = 0;
    this._firstStart = true;
    this.started = false;
    this.destroyed = false;
    this._paused = true;
    this._lastFrameTime = 0;
    this.zLayers = 100;
    this.pageHidden = false;
    this._sourceOptions = sourceOptions;
    this._initialSourceOptions = sourceOptions;
    this.retina = new Retina(this);
    this.canvas = new Canvas(this, this._engine);
    this.particles = new Particles(this._engine, this);
    this.plugins = [];
    this.particleDestroyedPlugins = [];
    this.particleCreatedPlugins = [];
    this.particlePositionPlugins = [];
    /* tsParticles variables with default values */
    this._options = loadContainerOptions(this._engine, this);
    this.actualOptions = loadContainerOptions(this._engine, this);

    /* ---------- tsParticles - start ------------ */
    this._eventListeners = new EventListeners(this);
    this._engine.dispatchEvent(EventType.containerBuilt, { container: this });
  }

  /**
   * Gets the animation status
   * @returns `true` is playing, `false` is paused
   */
  get animationStatus(): boolean {
    return !this._paused && !this.pageHidden && guardCheck(this);
  }

  /**
   * The options used by the container, it's a full {@link Options} object
   * @returns the options used by the container
   */
  get options(): Options {
    return this._options;
  }

  /**
   * The options that were initially passed to the container
   * @returns the source options passed to the container
   */
  get sourceOptions(): ISourceOptions | undefined {
    return this._sourceOptions;
  }

  addLifeTime(value: number): void {
    this._lifeTime += value;
  }

  alive(): boolean {
    return !this._duration || this._lifeTime <= this._duration;
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

    for (const plugin of this.plugins) {
      plugin.destroy?.();
    }

    this.plugins.length = 0;

    this._engine.clearPlugins(this);

    this.destroyed = true;

    if (remove) {
      const mainArr = this._engine.items,
        idx = mainArr.indexOf(this);

      if (idx >= removeMinIndex) {
        mainArr.splice(idx, removeDeleteCount);
      }
    }

    this._engine.dispatchEvent(EventType.containerDestroyed, { container: this });
  }

  /**
   * Draws a frame
   * @param force -
   */
  draw(force: boolean): void {
    if (!guardCheck(this)) {
      return;
    }

    let refreshTime = force;

    const frame = (timestamp: number): void => {
      if (refreshTime) {
        this._lastFrameTime = undefined;

        refreshTime = false;
      }

      this._nextFrame(timestamp);
    };

    this._drawAnimationFrame = animate(timestamp => {
      frame(timestamp);
    });
  }

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
   */
  async init(): Promise<void> {
    if (!guardCheck(this)) {
      return;
    }

    const allContainerPlugins = new Map<IPlugin, IContainerPlugin>();

    for (const plugin of this._engine.plugins) {
      const containerPlugin = await plugin.getPlugin(this);

      if (containerPlugin.preInit) {
        await containerPlugin.preInit();
      }

      allContainerPlugins.set(plugin, containerPlugin);
    }

    await this.particles.initPlugins();

    /* options settings */
    this._options = loadContainerOptions(this._engine, this, this._initialSourceOptions, this.sourceOptions);
    this.actualOptions = loadContainerOptions(this._engine, this, this._options);

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
    this._duration = getRangeValue(duration) * millisecondsToSeconds;
    this._delay = getRangeValue(delay) * millisecondsToSeconds;
    this._lifeTime = 0;
    this.fpsLimit = fpsLimit > minFpsLimit ? fpsLimit : defaultFpsLimit;
    this._smooth = smooth;

    for (const plugin of this.plugins) {
      await plugin.init?.();
    }

    await this.particles.init();

    this._engine.dispatchEvent(EventType.containerInit, { container: this });

    this.particles.setDensity();

    for (const plugin of this.plugins) {
      plugin.particlesSetup?.();
    }

    this._engine.dispatchEvent(EventType.particlesSetup, { container: this });
  }

  /**
   * Pauses animations
   */
  pause(): void {
    if (!guardCheck(this)) {
      return;
    }

    if (this._drawAnimationFrame !== undefined) {
      cancelAnimation(this._drawAnimationFrame);

      delete this._drawAnimationFrame;
    }

    if (this._paused) {
      return;
    }

    for (const plugin of this.plugins) {
      plugin.pause?.();
    }

    if (!this.pageHidden) {
      this._paused = true;
    }

    this._engine.dispatchEvent(EventType.containerPaused, { container: this });
  }

  /**
   * Starts animations and resume from pause
   * @param force -
   */
  play(force?: boolean): void {
    if (!guardCheck(this)) {
      return;
    }

    const needsUpdate = this._paused || force;

    if (this._firstStart && !this.actualOptions.autoPlay) {
      this._firstStart = false;

      return;
    }

    if (this._paused) {
      this._paused = false;
    }

    if (needsUpdate) {
      for (const plugin of this.plugins) {
        if (plugin.play) {
          plugin.play();
        }
      }
    }

    this._engine.dispatchEvent(EventType.containerPlay, { container: this });

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

  async reset(sourceOptions?: ISourceOptions): Promise<void> {
    if (!guardCheck(this)) {
      return;
    }

    this._initialSourceOptions = sourceOptions;
    this._sourceOptions = sourceOptions;
    this._options = loadContainerOptions(this._engine, this, this._initialSourceOptions, this.sourceOptions);
    this.actualOptions = loadContainerOptions(this._engine, this, this._options);

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
        this._eventListeners.addListeners();

        for (const plugin of this.plugins) {
          await plugin.start?.();
        }

        this._engine.dispatchEvent(EventType.containerStarted, { container: this });

        this.play();

        resolve();
      };

      this._delayTimeout = setTimeout(() => void start(), this._delay);
    });
  }

  /**
   * Stops the container, opposite to `start`. Clears some resources and stops events.
   */
  stop(): void {
    if (!guardCheck(this) || !this.started) {
      return;
    }

    if (this._delayTimeout) {
      clearTimeout(this._delayTimeout);

      delete this._delayTimeout;
    }

    this._firstStart = true;
    this.started = false;
    this._eventListeners.removeListeners();
    this.pause();
    this.particles.clear();
    this.canvas.stop();

    for (const plugin of this.plugins) {
      plugin.stop?.();
    }

    this.particleCreatedPlugins.length = 0;
    this.particleDestroyedPlugins.length = 0;
    this.particlePositionPlugins.length = 0;

    this._sourceOptions = this._options;

    this._engine.dispatchEvent(EventType.containerStopped, { container: this });
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

  private readonly _nextFrame = (timestamp: DOMHighResTimeStamp): void => {
    try {
      if (
        !this._smooth &&
        this._lastFrameTime !== undefined &&
        timestamp < this._lastFrameTime + millisecondsToSeconds / this.fpsLimit
      ) {
        this.draw(false);

        return;
      }

      this._lastFrameTime ??= timestamp;

      updateDelta(this._delta, timestamp - this._lastFrameTime, this.fpsLimit, this._smooth);

      this.addLifeTime(this._delta.value);
      this._lastFrameTime = timestamp;

      if (this._delta.value > millisecondsToSeconds) {
        this.draw(false);

        return;
      }

      this.canvas.drawParticles(this._delta);

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
  };
}
