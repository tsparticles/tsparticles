/**
 * DomEngine — extends the Core {@link Engine} with full DOM support.
 *
 * This class lives in `engine/src/Dom/` so that it can freely import browser
 * helpers (`EngineDom`, `EventListeners`) without creating a circular
 * dependency with the Core layer.
 *
 * Dependency direction (correct, one-way):
 *   Dom → Core    ✅
 *   Core → Dom    ❌  (never)
 *
 * When `@tsparticles/dom` is eventually extracted as a standalone package,
 * this file will be one of its entry points.
 */
import type { Container } from "../Core/Container.js";
import { DomCanvasManager } from "./DomCanvasManager.js";
import { Engine } from "../Core/Engine.js";
import { EventListeners } from "./EventListeners.js";
import type { IDomCanvasManager } from "../Core/Interfaces/IDomCanvasManager.js";
import type { IEventListeners } from "../Core/Interfaces/IEventListeners.js";
import type { ILoadParams } from "../Core/Interfaces/ILoadParams.js";
import type { PluginManager } from "../Core/Utils/PluginManager.js";
import { getCanvasFromDomContainer } from "./EngineDom.js";
import { getRandom } from "../Utils/MathUtils.js";
import { loadRandomFactor } from "../Core/Utils/Constants.js";

/**
 * DOM-aware engine.
 *
 * Adds the following on top of the headless {@link Engine}:
 *
 * - Derives the container id from `params.element.id` when the element is an
 *   `HTMLElement` (mirrors the previous inline behaviour in `Engine.load`).
 * - Resolves `HTMLElement` → `HTMLCanvasElement` before handing the canvas to
 *   `CanvasManager.loadCanvas`.
 * - Injects {@link EventListeners} into every new `Container` so that resize
 *   and visibility-change events are handled automatically.
 */
export class DomEngine extends Engine {
  /**
   * Derives the container id, also considering the `id` attribute of the
   * source `HTMLElement` when `params.element` is a DOM node.
   * @param params
   */
  protected override getSourceId(params: ILoadParams): string {
    const domSourceElement =
      typeof HTMLElement !== "undefined" && params.element instanceof HTMLElement ? params.element : undefined;

    return params.id ?? domSourceElement?.id ?? `tsparticles${Math.floor(getRandom() * loadRandomFactor).toString()}`;
  }

  /**
   * Provides the {@link DomCanvasManager} factory so that each new
   * {@link Container} gets full DOM canvas support (styles, fullscreen, etc.).
   */
  protected override makeDomCanvasManagerFactory(): (
    pluginManager: PluginManager,
    container: Container,
  ) => IDomCanvasManager {
    return (pluginManager: PluginManager, container: Container): DomCanvasManager =>
      new DomCanvasManager(pluginManager, container);
  }

  /**
   * Provides the {@link EventListeners} factory so that each new
   * {@link Container} gets browser event wiring (resize, visibility, …).
   */
  protected override makeEventListenersFactory(): (container: Container) => IEventListeners {
    return (container: Container): EventListeners => new EventListeners(container);
  }

  /**
   * Resolves the render canvas from `params`.
   *
   * - If `params.element` is already an `OffscreenCanvas`, it is used as-is.
   * - If `params.element` is an `HTMLElement` (or `undefined`), the DOM helper
   *   resolves / creates the underlying `HTMLCanvasElement`.
   * @param id
   * @param params
   */
  protected override resolveCanvas(id: string, params: ILoadParams): Promise<HTMLCanvasElement | OffscreenCanvas> {
    if (typeof OffscreenCanvas !== "undefined" && params.element instanceof OffscreenCanvas) {
      return Promise.resolve(params.element);
    }

    const domSourceElement =
      typeof HTMLElement !== "undefined" && params.element instanceof HTMLElement ? params.element : undefined;

    return Promise.resolve(getCanvasFromDomContainer(id, domSourceElement));
  }
}
