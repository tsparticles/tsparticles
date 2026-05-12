/**
 * Engine class for creating the singleton on globalThis.
 * It's a singleton class for initializing {@link Container} instances
 */
import { loadMinIndex, loadRandomFactor, none, one, removeDeleteCount, removeMinIndex } from "./Utils/Constants.js";
import type { Container } from "./Container.js";
import type { CustomEventArgs } from "../Types/CustomEventArgs.js";
import type { CustomEventListener } from "../Types/CustomEventListener.js";
import { EventDispatcher } from "../Utils/EventDispatcher.js";
import type { IEventListeners } from "./Interfaces/IEventListeners.js";
import type { ILoadParams } from "./Interfaces/ILoadParams.js";
import type { ISourceOptions } from "../Types/ISourceOptions.js";
import { PluginManager } from "./Utils/PluginManager.js";
import type { SingleOrMultiple } from "../Types/SingleOrMultiple.js";
import { getLogger } from "../Utils/LogUtils.js";
import { getRandom } from "../Utils/MathUtils.js";
import { itemFromSingleOrMultiple } from "../Utils/Utils.js";

declare const __VERSION__: string;

declare global {
  var tsParticles: Engine;
}

interface DataFromUrlParams {
  fallback?: SingleOrMultiple<ISourceOptions>;
  index?: number;
  url: SingleOrMultiple<string>;
}

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
    return (await response.json()) as SingleOrMultiple<Readonly<ISourceOptions>>;
  }

  getLogger().error(`${response.status.toString()} while retrieving config file`);

  return data.fallback;
}

/**
 * Engine class for creating the singleton on globalThis.
 * It's a singleton class for initializing {@link Container} instances,
 * and for Plugins class responsible for every external feature
 */
export class Engine {
  /** The plugin manager */
  readonly pluginManager = new PluginManager(this);
  /**
   * Contains all the {@link Container} instances of the current engine instance
   */
  private readonly _domArray: Container[] = [];

  private readonly _eventDispatcher = new EventDispatcher();

  /**
   * Checks if the engine instance is initialized
   */
  private _initialized = false;

  /** The container instances */
  get items(): Container[] {
    return this._domArray;
  }

  /** The engine version */
  get version(): string {
    return __VERSION__;
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
   * @param pluginVersion - the plugin version to check against
   */
  /**
   * Checks if a plugin version matches the engine version
   * @param pluginVersion
   */
  checkVersion(pluginVersion: string): void {
    if (this.version === pluginVersion) {
      return;
    }

    throw new Error(
      `The tsParticles version is different from the loaded plugins version. Engine version: ${this.version}. Plugin version: ${pluginVersion}`,
    );
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
   * init method, used by imports
   */
  async init(): Promise<void> {
    if (this._initialized) {
      return;
    }

    await this.pluginManager.init();

    this._initialized = true;
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

    const id = this.getSourceId(params),
      options = await this.resolveOptions(params),
      container = await this.createContainer(id, itemFromSingleOrMultiple(options, params.index));

    this.registerContainer(container, id);
    await this.attachRenderer(container, id, params);
    await this.startContainer(container);

    return container;
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
    this._eventDispatcher.removeEventListener(type, listener);
  }

  /**
   * Returns the id to assign to a new {@link Container}.
   *
   * Override in a Dom-aware subclass to also derive the id from an
   * `HTMLElement.id` attribute when `params.element` is an `HTMLElement`.
   * Core only uses `params.id` and falls back to a random suffix so that
   * nothing in this class ever references browser globals.
   * @param params - The load params supplied by the caller
   * @returns The resolved container id string
   */
  protected getSourceId(params: ILoadParams): string {
    return params.id ?? `tsparticles${Math.floor(getRandom() * loadRandomFactor).toString()}`;
  }

  /**
   * Returns a factory that creates the {@link IEventListeners} instance for a
   * given {@link Container}, or `undefined` when running headless (no DOM).
   *
   * The Core implementation returns `undefined` — event listeners are a DOM
   * concern.  Override in `DomEngine` to provide the real implementation.
   * @returns The event listeners factory, or undefined for headless use
   */
  protected makeEventListenersFactory(): ((container: Container) => IEventListeners) | undefined {
    return undefined;
  }

  /**
   * Resolves the render canvas from `params`.
   *
   * The Core implementation only handles an `OffscreenCanvas` supplied
   * directly by the caller. When the element is missing or is an
   * `HTMLElement`, the returned Promise rejects: resolving DOM elements
   * requires `DomEngine`.
   * @param id - The container id (used in error messages)
   * @param params - The load params supplied by the caller
   * @returns A Promise resolving to the canvas render target
   */
  protected resolveCanvas(id: string, params: ILoadParams): Promise<HTMLCanvasElement | OffscreenCanvas> {
    if (typeof OffscreenCanvas !== "undefined" && params.element instanceof OffscreenCanvas) {
      return Promise.resolve(params.element);
    }

    return Promise.reject(
      new Error(
        `Engine (Core): cannot resolve a render canvas for container "${id}". ` +
          `Supply an OffscreenCanvas via params.element, or use DomEngine / @tsparticles/dom ` +
          `to load from an HTMLElement.`,
      ),
    );
  }

  private async attachRenderer(container: Container, id: string, params: ILoadParams): Promise<void> {
    const target = await this.resolveTarget(id, params);

    container.canvas.loadCanvas(target);
  }

  private async createContainer(id: string, sourceOptions: ISourceOptions | undefined): Promise<Container> {
    const { Container } = await import("./Container.js"),
      container = new Container({
        dispatchCallback: (eventType, args): void => {
          this.dispatchEvent(eventType, args);
        },
        eventListenersFactory: this.makeEventListenersFactory(),
        id,
        onDestroy: (remove): void => {
          if (!remove) {
            return;
          }

          const mainArr = this.items,
            idx = mainArr.indexOf(container);

          if (idx >= removeMinIndex) {
            mainArr.splice(idx, removeDeleteCount);
          }
        },
        pluginManager: this.pluginManager,
        sourceOptions,
      });

    return container;
  }

  private registerContainer(container: Container, id: string): void {
    const { items } = this,
      oldIndex = items.findIndex(v => v.id.description === id);

    if (oldIndex < loadMinIndex) {
      items.push(container);

      return;
    }

    const old = this.item(oldIndex),
      deleteCount = old ? one : none;

    if (old && !old.destroyed) {
      old.destroy(false);
    }

    items.splice(oldIndex, deleteCount, container);
  }

  private async resolveOptions(params: ILoadParams): Promise<SingleOrMultiple<Readonly<ISourceOptions>> | undefined> {
    const { index, url } = params;

    return url ? getDataFromUrl({ fallback: params.options, url, index }) : params.options;
  }

  private resolveTarget(id: string, params: ILoadParams): Promise<HTMLCanvasElement | OffscreenCanvas> {
    return this.resolveCanvas(id, params);
  }

  private async startContainer(container: Container): Promise<void> {
    /* launch tsParticles */
    await container.start();
  }
}
