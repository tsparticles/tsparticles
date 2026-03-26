/**
 * Engine class for creating the singleton on globalThis.
 * It's a singleton class for initializing {@link Container} instances
 */
import { getCanvasFromContainer, getDataFromUrl, getDomContainer } from "./Utils/LoadUtils.js";
import { loadMinIndex, loadRandomFactor, none, one, removeDeleteCount, removeMinIndex } from "./Utils/Constants.js";
import type { Container } from "./Container.js";
import { EventDispatcher } from "../Utils/EventDispatcher.js";
import type { ILoadParams } from "./Interfaces/ILoadParams.js";
import { PluginManager } from "./Utils/PluginManager.js";
import { getRandom } from "../Utils/MathUtils.js";
import { itemFromSingleOrMultiple } from "../Utils/Utils.js";

declare const __VERSION__: string;

declare global {
  var tsParticles: Engine;
}

/**
 * Engine class for creating the singleton on globalThis.
 * It's a singleton class for initializing {@link Container} instances,
 * and for Plugins class responsible for every external feature
 */
export class Engine {
  readonly eventDispatcher = new EventDispatcher();
  readonly pluginManager = new PluginManager(this);

  /**
   * Contains all the {@link Container} instances of the current engine instance
   */
  private readonly _domArray: Container[] = [];

  get items(): Container[] {
    return this._domArray;
  }

  get version(): string {
    return __VERSION__;
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

  /**
   * init method, used by imports
   * @returns the promise
   */
  init(): Promise<void> {
    return this.pluginManager.init();
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
      newItem = new Container(this.eventDispatcher, this.pluginManager, id, currentOptions);

    newItem.setOnDestroyCallback(remove => {
      if (!remove) {
        return;
      }

      const mainArr = this.items,
        idx = mainArr.indexOf(newItem);

      if (idx < removeMinIndex) {
        return;
      }

      mainArr.splice(idx, removeDeleteCount);
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

    const domContainer = getDomContainer(id, params.element),
      canvasEl = getCanvasFromContainer(domContainer);

    newItem.canvas.loadCanvas(canvasEl);

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
}
