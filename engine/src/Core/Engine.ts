/**
 * Engine class for creating the singleton on globalThis.
 * It's a singleton class for initializing {@link Container} instances
 */
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
  removeMinIndex,
} from "./Utils/Constants.js";
import { itemFromSingleOrMultiple, safeDocument } from "../Utils/Utils.js";
import type { Container } from "./Container.js";
import type { CustomEventArgs } from "../Types/CustomEventArgs.js";
import type { CustomEventListener } from "../Types/CustomEventListener.js";
import { EventDispatcher } from "../Utils/EventDispatcher.js";
import type { ILoadParams } from "./Interfaces/ILoadParams.js";
import type { ISourceOptions } from "../Types/ISourceOptions.js";
import { PluginManager } from "./Utils/PluginManager.js";
import type { SingleOrMultiple } from "../Types/SingleOrMultiple.js";
import { getLogger } from "../Utils/LogUtils.js";
import { getRandom } from "../Utils/MathUtils.js";

declare const __VERSION__: string;

declare global {
  var tsParticles: Engine;
}

const fullPercent = "100%";

interface DataFromUrlParams {
  fallback?: SingleOrMultiple<ISourceOptions>;
  index?: number;
  url: SingleOrMultiple<string>;
}

/**
 * @param data - The data to handle
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

const getCanvasFromContainer = (domContainer: HTMLElement): HTMLCanvasElement => {
    const documentSafe = safeDocument();

    let canvasEl: HTMLCanvasElement;
    const isCanvas = domContainer instanceof HTMLCanvasElement || domContainer.tagName.toLowerCase() === canvasTag;

    if (isCanvas) {
      canvasEl = domContainer as HTMLCanvasElement;

      canvasEl.dataset[generatedAttribute] ??= generatedFalse;

      if (canvasEl.dataset[generatedAttribute] === generatedTrue) {
        canvasEl.style.width ||= fullPercent;
        canvasEl.style.height ||= fullPercent;
        canvasEl.style.pointerEvents = "none";
        canvasEl.style.setProperty("pointer-events", "none");
      }
    } else {
      const existingCanvases = domContainer.getElementsByTagName(canvasTag),
        foundCanvas = existingCanvases.item(canvasFirstIndex);

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

      canvasEl.style.width ||= fullPercent;
      canvasEl.style.height ||= fullPercent;
      canvasEl.style.pointerEvents = "none";
      canvasEl.style.setProperty("pointer-events", "none");
    }

    return canvasEl;
  },
  getDomContainer = (id: string, source?: HTMLElement): HTMLElement => {
    const documentSafe = safeDocument();

    let domContainer = source ?? documentSafe.getElementById(id);

    if (domContainer) {
      return domContainer;
    }

    domContainer = documentSafe.createElement("canvas");

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
  /** The plugin manager */
  readonly pluginManager = new PluginManager(this);
  /**
   * Contains all the {@link Container} instances of the current engine instance
   */
  readonly #domArray: Container[] = [];

  readonly #eventDispatcher = new EventDispatcher();

  /**
   * Checks if the engine instance is initialized
   */
  #initialized = false;

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

  /**
   * Adds a listener to the specified event
   * @param type - The event to listen to
   * @param listener - The listener of the specified event
   */
  addEventListener(type: string, listener: CustomEventListener): void {
    this.#eventDispatcher.addEventListener(type, listener);
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
    this.#eventDispatcher.dispatchEvent(type, args);
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
    await this.init();

    let domSourceElement: HTMLElement | undefined;

    if (typeof HTMLElement !== "undefined" && params.element instanceof HTMLElement) {
      domSourceElement = params.element;
    }

    const { Container } = await import("./Container.js"),
      id = params.id ?? domSourceElement?.id ?? `tsparticles${Math.floor(getRandom() * loadRandomFactor).toString()}`,
      { index, url } = params,
      options = url ? await getDataFromUrl({ fallback: params.options, url, index }) : params.options,
      /* elements */
      currentOptions = itemFromSingleOrMultiple(options, index),
      { items } = this,
      oldIndex = items.findIndex(v => v.id.description === id),
      newItem = new Container({
        dispatchCallback: (eventType, args): void => {
          this.dispatchEvent(eventType, args);
        },
        id,
        onDestroy: (remove): void => {
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

    const sourceCanvas: HTMLCanvasElement | OffscreenCanvas =
      typeof OffscreenCanvas !== "undefined" && params.element instanceof OffscreenCanvas
        ? params.element
        : getCanvasFromContainer(getDomContainer(id, domSourceElement));

    newItem.canvas.loadCanvas(sourceCanvas);

    /* launch tsParticles */
    await newItem.start();

    return newItem;
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
}
