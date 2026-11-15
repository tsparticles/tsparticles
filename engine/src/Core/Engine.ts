import { ErrorCodes, getErrorMessage } from "../Utils/ErrorUtils.js";
import { type ILogger, createLogger } from "../Utils/LogUtils.js";
import { canvasOwner, transferredCanvasKey } from "./Utils/CanvasOwnership.js";
import { getCanvasFromContainer, getDataFromUrl, getDomContainer, itemFromSingleOrMultiple } from "../Utils/Utils.js";
import { loadMinIndex, loadRandomFactor, none, one, removeDeleteCount, removeMinIndex } from "./Utils/Constants.js";
import type { Container } from "./Container.js";
import type { CustomEventArgs } from "../Types/CustomEventArgs.js";
import type { CustomEventListener } from "../Types/CustomEventListener.js";
import { EventDispatcher } from "../Utils/EventDispatcher.js";
import type { ILoadParams } from "./Interfaces/ILoadParams.js";
import { PluginManager } from "./Utils/PluginManager.js";
import { getRandom } from "../Utils/MathUtils.js";

interface CanvasOwnership {
  [canvasOwner]?: Container;
  [transferredCanvasKey]?: OffscreenCanvas & CanvasOwnership;
}

declare const __VERSION__: string;

type OwnedCanvas = (HTMLCanvasElement | OffscreenCanvas) & CanvasOwnership;

/**
 * An application-owned engine with independent containers and registrations.
 * Initializes {@link Container} instances,
 * and for Plugins class responsible for every external feature
 */
/* The engine surface groups its service APIs with the existing engine API. */
/* eslint-disable @typescript-eslint/member-ordering */
export class Engine {
  /** The plugin manager */
  readonly pluginManager = new PluginManager(this);
  #anonymousElementId = 0;
  readonly #anonymousElementIds = new WeakMap<HTMLElement, string>();

  /**
   * Contains all the {@link Container} instances of the current engine instance
   */
  readonly #domArray: Container[] = [];

  readonly #eventDispatcher = new EventDispatcher();

  /**
   * Checks if the engine instance is initialized
   */
  #initialized = false;

  #loadSequence = 0;

  readonly #loadSequences = new Map<string, number>();

  readonly #logger: ILogger = createLogger();

  #random: () => number = Math.random;

  readonly #scheduledFrames = new Map<number, (handle: number) => void>();

  #cancelFrame: (handle: number) => void = (handle: number): void => {
    cancelAnimationFrame(handle);
  };

  #nextFrame: (callback: FrameRequestCallback) => number = (callback: FrameRequestCallback): number =>
    requestAnimationFrame(callback);

  readonly #randomProvider = (): number => this.getRandom();

  /**
   * The container instances
   * @returns the instances loaded in the engine
   */
  get items(): Container[] {
    return this.#domArray;
  }

  /**
   * The engine version
   * @returns the version string
   */
  get version(): string {
    return __VERSION__;
  }

  #getAnonymousElementId(element: HTMLElement): string {
    let id = this.#anonymousElementIds.get(element);

    if (!id) {
      id = `tsparticles${Math.floor(this.getRandom() * loadRandomFactor).toString()}_${this.#anonymousElementId++}`;
      this.#anonymousElementIds.set(element, id);
    }

    return id;
  }

  #getElementId(element: HTMLElement): string {
    return element.id.length ? element.id : this.#getAnonymousElementId(element);
  }

  /**
   * Adds a listener to the specified event
   * @param type - The event to listen to
   * @param listener - The listener of the specified event
   */
  addEventListener(type: string, listener: CustomEventListener): void {
    this.#eventDispatcher.addEventListener(type, listener);
  }

  /** Schedules a callback using this engine's frame scheduler. */
  animate(callback: FrameRequestCallback): number {
    let handle = -1;
    const cancel = this.#cancelFrame;

    handle = this.#nextFrame(timestamp => {
      this.#scheduledFrames.delete(handle);
      callback(timestamp);
    });
    this.#scheduledFrames.set(handle, cancel);

    return handle;
  }

  /** Cancels a frame handle owned by this engine. */
  cancelAnimation(handle: number): void {
    const cancel = this.#scheduledFrames.get(handle);

    if (!cancel) {
      return;
    }

    this.#scheduledFrames.delete(handle);
    cancel(handle);
  }

  /**
   * @param pluginVersion - the plugin version to check against
   */
  /**
   * Checks if a plugin version matches the engine version
   * @param pluginVersion - the version to check
   */
  checkVersion(pluginVersion: string): void {
    if (this.version === pluginVersion) {
      return;
    }

    throw new Error(getErrorMessage(ErrorCodes.engineVersionMismatch, this.version, pluginVersion));
  }

  /**
   * Dispatches an event that will be listened from listeners
   * @param type - The event to dispatch
   * @param args - The event parameters
   */
  dispatchEvent(type: string, args?: CustomEventArgs): void {
    this.#eventDispatcher.dispatchEvent(type, args);
  }

  /** Returns this engine's mutable logger object. */
  getLogger(): ILogger {
    return this.#logger;
  }

  /** Returns a random value in [0, 1); non-finite source values map to 0. */
  getRandom(): number {
    return getRandom(this.#random);
  }

  /** Returns a stable provider that always uses this engine's current random source. */
  getRandomFn(): () => number {
    return this.#randomProvider;
  }

  /**
   * init method, used by imports
   */
  async init(): Promise<void> {
    if (this.#initialized) {
      return;
    }

    await this.pluginManager.init();

    this.#initialized = true;
  }

  /**
   * Retrieves a {@link Container} from all the objects loaded
   * @param index - The object index
   * @returns The {@link Container} object at specified index, if present or not destroyed, otherwise undefined
   */
  item(index: number): Container | undefined {
    const items = this.items,
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
    let domSourceElement: HTMLElement | undefined;

    if (typeof HTMLElement !== "undefined" && params.element instanceof HTMLElement) {
      domSourceElement = params.element;
    }

    /* the sequence is assigned before the first await, so the loads are ordered by when they were requested */
    const id =
        params.id ??
        (domSourceElement ? this.#getElementId(domSourceElement) : undefined) ??
        `tsparticles${Math.floor(this.getRandom() * loadRandomFactor).toString()}`,
      loadSequence = ++this.#loadSequence;

    this.#loadSequences.set(id, loadSequence);

    try {
      await this.init();

      const { Container } = await import("./Container.js"),
        { index, url } = params,
        options = url
          ? await getDataFromUrl({
              fallback: params.options,
              index,
              logger: this.getLogger(),
              random: this.getRandomFn(),
              url,
            })
          : params.options;

      if (this.#loadSequences.get(id) !== loadSequence) {
        /* a newer load for the same id was requested while this one was waiting, so this result is discarded */
        return undefined;
      }

      const sourceCanvas: OwnedCanvas =
          typeof OffscreenCanvas !== "undefined" && params.element instanceof OffscreenCanvas
            ? params.element
            : getCanvasFromContainer(getDomContainer(id, domSourceElement)),
        owner = sourceCanvas[canvasOwner] ?? sourceCanvas[transferredCanvasKey]?.[canvasOwner];

      if (owner && !owner.destroyed && (!this.items.includes(owner) || owner.id.description !== id)) {
        throw new Error("This canvas is already owned by another engine.");
      }

      let ownedRenderCanvas: OwnedCanvas | undefined;

      /* elements */
      const currentOptions = itemFromSingleOrMultiple(options, index, undefined, this.getRandomFn()),
        { items } = this,
        oldIndex = items.findIndex(v => v.id.description === id),
        newItem = new Container({
          engine: this,
          dispatchCallback: (eventType, args): void => {
            this.dispatchEvent(eventType, args);
          },
          id,
          onDestroy: (remove): void => {
            if (sourceCanvas[canvasOwner] === newItem) {
              Reflect.deleteProperty(sourceCanvas, canvasOwner);
            }

            if (ownedRenderCanvas?.[canvasOwner] === newItem) {
              Reflect.deleteProperty(ownedRenderCanvas, canvasOwner);
            }

            if (!remove) {
              return;
            }

            const mainArr = this.items,
              idx = mainArr.indexOf(newItem);

            if (idx >= removeMinIndex) {
              mainArr.splice(idx, removeDeleteCount);
            }
          },
          pluginManager: this.pluginManager,
          sourceOptions: currentOptions,
        });

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

      /* Canvas setup and start share the same failure cleanup boundary. */
      try {
        sourceCanvas[canvasOwner] = newItem;
        newItem.canvas.loadCanvas(sourceCanvas);
        ownedRenderCanvas = newItem.canvas.renderCanvas;
        if (ownedRenderCanvas) {
          ownedRenderCanvas[canvasOwner] = newItem;
        }
        await newItem.start();
      } catch (error) {
        newItem.destroy(false);

        const failedIndex = items.indexOf(newItem);

        if (failedIndex >= loadMinIndex) {
          items.splice(failedIndex, removeDeleteCount);
        }

        throw error;
      }

      if (newItem.destroyed) {
        /* the container was destroyed before start() completed, so do not return it */
        return undefined;
      }

      return newItem;
    } finally {
      /* a newer load for the same id keeps its own entry, which must not be cleared here */
      if (this.#loadSequences.get(id) === loadSequence) {
        this.#loadSequences.delete(id);
      }
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

    await Promise.all(this.items.map(t => t.refresh()));
  }

  /**
   * Removes a listener from the specified event
   * @param type - The event to stop listening to
   * @param listener - The listener of the specified event
   */
  removeEventListener(type: string, listener: CustomEventListener): void {
    this.#eventDispatcher.removeEventListener(type, listener);
  }

  /**
   * Replaces the frame scheduler for this engine only. Callback timestamps must use the same high-resolution time domain as requestAnimationFrame.
   */
  setAnimationFunctions(nextFrame: (callback: FrameRequestCallback) => number, cancel: (handle: number) => void): void {
    this.#nextFrame = nextFrame;
    this.#cancelFrame = cancel;
  }

  /** Applies logger overrides to this engine, leaving the supplied object untouched. */
  setLogger(logger: Partial<ILogger>): void {
    Object.assign(this.#logger, createLogger({ ...this.#logger, ...logger }));
  }

  /**
   * Sets the random source used by this engine. It is called once per random request; call counts are not a cross-version contract. Pass undefined to restore Math.random.
   */
  setRandom(rnd: () => number = Math.random): void {
    this.#random = rnd;
  }
}
