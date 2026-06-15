import { cloneStyle, getFullScreenStyle, safeMatchMedia, safeMutationObserver } from "../Utils/Utils.js";
import { defaultZoom, generatedAttribute, half } from "./Utils/Constants.js";
import { getStyleFromRgb, rangeColorToRgb } from "../Utils/ColorUtils.js";
import type { Container } from "./Container.js";
import type { IContainerPlugin } from "./Interfaces/IContainerPlugin.js";
import type { ICoordinates } from "./Interfaces/ICoordinates.js";
import type { IDimension } from "./Interfaces/IDimension.js";
import type { PluginManager } from "./Utils/PluginManager.js";
import { RenderManager } from "./RenderManager.js";

/**
 * Returns the canvas to use for rendering.
 * When an explicit OffscreenCanvas is passed in it is used as-is.
 *
 * DOM canvases are always transferred because the render context must come from an
 * OffscreenCanvas.
 * @param canvas - The canvas source to use for rendering.
 * @returns The render canvas instance.
 */
const transferredCanvases = new WeakMap<HTMLCanvasElement, OffscreenCanvas>(),
  getTransferredCanvas = (canvas: HTMLCanvasElement): OffscreenCanvas => {
    const transferredCanvas = transferredCanvases.get(canvas);

    if (transferredCanvas) {
      return transferredCanvas;
    }

    if (typeof canvas.transferControlToOffscreen !== "function") {
      throw new TypeError("OffscreenCanvas is required but not supported by this browser");
    }

    try {
      const offscreenCanvas = canvas.transferControlToOffscreen();

      transferredCanvases.set(canvas, offscreenCanvas);

      return offscreenCanvas;
    } catch {
      throw new TypeError("OffscreenCanvas transfer failed");
    }
  },
  isHtmlCanvasElement = (canvas: HTMLCanvasElement | OffscreenCanvas): canvas is HTMLCanvasElement => {
    return typeof HTMLCanvasElement !== "undefined" && canvas instanceof HTMLCanvasElement;
  };

/**
 *
 * @param canvas - The canvas
 * @param style - The style
 * @param important - The important
 */
function setStyle(canvas: HTMLCanvasElement, style?: CSSStyleDeclaration, important = false): void {
  if (!style) {
    return;
  }

  const element = canvas,
    elementStyle = element.style,
    keys = new Set<string>();

  for (let i = 0; i < elementStyle.length; i++) {
    const key = elementStyle.item(i);

    if (!key) {
      continue;
    }

    keys.add(key);
  }

  for (let i = 0; i < style.length; i++) {
    const key = style.item(i);

    if (!key) {
      continue;
    }

    keys.add(key);
  }

  for (const key of keys) {
    const value = style.getPropertyValue(key);

    if (value) {
      elementStyle.setProperty(key, value, important ? "important" : "");
    } else {
      elementStyle.removeProperty(key);
    }
  }
}

/**
 * Canvas manager
 */
export class CanvasManager {
  /**
   * The source DOM canvas element, if available.
   */
  domElement?: HTMLCanvasElement;

  /** The render manager */
  readonly render;

  /**
   * The canvas used for rendering and as source for the 2D context.
   * This is an OffscreenCanvas when a DOM canvas is provided.
   */
  renderCanvas?: OffscreenCanvas;

  /**
   * The particles canvas dimension
   */
  readonly size: IDimension;

  /**
   * Current zoom level
   */
  zoom = defaultZoom;

  readonly #container;
  #generated;
  #mutationObserver?: MutationObserver;
  #originalStyle?: CSSStyleDeclaration;
  readonly #pluginManager;
  #pointerEvents: string;
  #resizePlugins: IContainerPlugin[];
  readonly #standardSize: IDimension;

  /**
   * Zoom center point (for centered zooming)
   */
  #zoomCenter?: ICoordinates;

  /**
   * Constructor of canvas manager
   * @param pluginManager - the engine managing the whole library
   * @param container - the parent container
   */
  constructor(pluginManager: PluginManager, container: Container) {
    this.#pluginManager = pluginManager;
    this.#container = container;
    this.render = new RenderManager(pluginManager, container, this);
    this.#standardSize = {
      height: 0,
      width: 0,
    };

    const pxRatio = container.retina.pixelRatio,
      stdSize = this.#standardSize;

    this.size = {
      height: stdSize.height * pxRatio,
      width: stdSize.width * pxRatio,
    };

    this.#generated = false;
    this.#resizePlugins = [];
    this.#pointerEvents = "none";
  }

  get #fullScreen(): boolean {
    return this.#container.actualOptions.fullScreen.enable;
  }

  /**
   * Destroying object actions
   */
  destroy(): void {
    this.stop();

    if (this.#generated) {
      const element = this.domElement;

      element?.remove();

      this.domElement = undefined;
      this.renderCanvas = undefined;
    } else {
      this.#resetOriginalStyle();
    }

    this.render.destroy();

    this.#resizePlugins = [];
  }

  /**
   * Gets the zoom center point
   * @returns The current zoom center.
   */
  getZoomCenter(): ICoordinates {
    const pxRatio = this.#container.retina.pixelRatio,
      { width, height } = this.size;

    if (this.#zoomCenter) {
      return this.#zoomCenter;
    }

    return {
      x: (width * half) / pxRatio,
      y: (height * half) / pxRatio,
    };
  }

  /**
   * Initializes the canvas element
   */
  init(): void {
    this.#safeMutationObserver(obs => {
      obs.disconnect();
    });
    this.#mutationObserver = safeMutationObserver(records => {
      for (const record of records) {
        if (record.type === "attributes" && record.attributeName === "style") {
          this.#repairStyle();
        }
      }
    });

    this.resize();
    this.#initStyle();
    this.initBackground();
    this.#safeMutationObserver(obs => {
      const element = this.domElement;

      if (!element || !(element instanceof Node)) {
        return;
      }

      obs.observe(element, { attributes: true });
    });

    this.initPlugins();
    this.#initContext();
    this.render.init();
  }

  /**
   * Initializes the canvas background
   */
  initBackground(): void {
    const container = this.#container,
      options = container.actualOptions,
      background = options.background,
      element = this.domElement;

    if (!element) {
      return;
    }

    const elementStyle = element.style,
      color = rangeColorToRgb(this.#pluginManager, background.color);

    if (color) {
      elementStyle.backgroundColor = getStyleFromRgb(color, container.actualOptions.hdr, background.opacity);
    } else {
      elementStyle.backgroundColor = "";
    }

    elementStyle.backgroundImage = background.image || "";
    elementStyle.backgroundPosition = background.position || "";
    elementStyle.backgroundRepeat = background.repeat || "";
    elementStyle.backgroundSize = background.size || "";
  }

  /**
   * Initializes the plugins needed by canvas
   */
  initPlugins(): void {
    this.#resizePlugins = [];

    for (const plugin of this.#container.plugins) {
      if (plugin.resize) {
        this.#resizePlugins.push(plugin);
      }
    }
  }

  /**
   * Loads the canvas HTML element
   * @param canvas - the canvas source element or OffscreenCanvas
   */
  loadCanvas(canvas: HTMLCanvasElement | OffscreenCanvas): void {
    if (this.#generated && this.domElement) {
      this.domElement.remove();
    }

    const domCanvas = isHtmlCanvasElement(canvas) ? canvas : undefined;

    this.domElement = domCanvas;
    this.#generated = domCanvas ? domCanvas.dataset[generatedAttribute] === "true" : false;
    this.renderCanvas = domCanvas ? getTransferredCanvas(domCanvas) : (canvas as OffscreenCanvas);

    const domElement = this.domElement;

    if (domElement) {
      domElement.ariaHidden = "true";

      this.#originalStyle = cloneStyle(domElement.style);
    }

    const standardSize = this.#standardSize,
      renderCanvas = this.renderCanvas;

    if (domElement) {
      standardSize.height = domElement.offsetHeight;
      standardSize.width = domElement.offsetWidth;
    } else {
      standardSize.height = renderCanvas.height;
      standardSize.width = renderCanvas.width;
    }

    const pxRatio = this.#container.retina.pixelRatio,
      retinaSize = this.size;

    renderCanvas.height = retinaSize.height = standardSize.height * pxRatio;
    renderCanvas.width = retinaSize.width = standardSize.width * pxRatio;
  }

  /**
   * Calculates the size of the canvas
   * @returns true if the size changed
   */
  resize(): boolean {
    const element = this.domElement;

    if (!element) {
      return false;
    }

    const container = this.#container,
      renderCanvas = this.renderCanvas;

    if (renderCanvas === undefined) {
      return false;
    }

    const currentSize = container.canvas.#standardSize,
      newSize = {
        width: element.offsetWidth,
        height: element.offsetHeight,
      },
      pxRatio = container.retina.pixelRatio,
      retinaSize = {
        width: newSize.width * pxRatio,
        height: newSize.height * pxRatio,
      };

    if (
      newSize.height === currentSize.height &&
      newSize.width === currentSize.width &&
      retinaSize.height === renderCanvas.height &&
      retinaSize.width === renderCanvas.width
    ) {
      return false;
    }

    const oldSize = { ...currentSize };

    currentSize.height = newSize.height;
    currentSize.width = newSize.width;

    const canvasSize = this.size;

    renderCanvas.width = canvasSize.width = retinaSize.width;
    renderCanvas.height = canvasSize.height = retinaSize.height;

    if (this.#container.started) {
      container.particles.setResizeFactor({
        width: currentSize.width / oldSize.width,
        height: currentSize.height / oldSize.height,
      });
    }

    return true;
  }

  /**
   * Sets the pointer events style on the canvas
   * @param type - The pointer-events value to apply.
   */
  setPointerEvents(type: string): void {
    const element = this.domElement;

    if (!element) {
      return;
    }

    this.#pointerEvents = type;
    this.#repairStyle();
  }

  /**
   * Sets the zoom level and center point
   * @param zoomLevel - the new zoom level
   * @param center - optional center point for zoom (default is canvas center)
   */
  setZoom(zoomLevel: number, center?: ICoordinates): void {
    this.zoom = zoomLevel;
    this.#zoomCenter = center;
  }

  /** Stops the canvas manager */
  stop(): void {
    this.#safeMutationObserver(obs => {
      obs.disconnect();
    });

    this.#mutationObserver = undefined;

    this.render.stop();
  }

  /**
   * The window resize event handler
   */
  async windowResize(): Promise<void> {
    if (!this.domElement || !this.resize()) {
      return;
    }

    const container = this.#container,
      needsRefresh = container.updateActualOptions();

    /* density particles enabled */
    container.particles.setDensity();

    this.#applyResizePlugins();

    if (needsRefresh) {
      await container.refresh();
    }
  }

  #applyResizePlugins(): void {
    for (const plugin of this.#resizePlugins) {
      plugin.resize?.();
    }
  }

  #initContext(): void {
    const container = this.#container,
      canSupportHdr =
        container.actualOptions.hdr &&
        safeMatchMedia("(color-gamut: p3)")?.matches &&
        safeMatchMedia("(dynamic-range: high)")?.matches;
    this.render.setContextSettings({
      alpha: true,
      desynchronized: true,
      willReadFrequently: false,
      ...(canSupportHdr
        ? { colorSpace: "display-p3" as const, colorType: "float16" as const }
        : { colorSpace: "srgb" as const }),
    });
    const renderCanvas = this.renderCanvas;

    if (!renderCanvas) {
      return;
    }

    this.render.setContext(renderCanvas.getContext("2d", this.render.settings));
  }

  #initStyle(): void {
    const element = this.domElement,
      options = this.#container.actualOptions;

    if (!element) {
      return;
    }

    if (this.#fullScreen) {
      this.#setFullScreenStyle();
    } else {
      this.#resetOriginalStyle();
    }

    for (const key in options.style) {
      if (!key || !(key in options.style)) {
        continue;
      }

      const value = options.style[key];

      if (!value) {
        continue;
      }

      element.style.setProperty(key, value, "important");
    }
  }

  #repairStyle(): void {
    const element = this.domElement;

    if (!element) {
      return;
    }

    this.#safeMutationObserver(observer => {
      observer.disconnect();
    });
    this.#initStyle();
    this.initBackground();

    const pointerEvents = this.#pointerEvents;

    element.style.pointerEvents = pointerEvents;
    element.style.setProperty("pointer-events", pointerEvents);

    this.#safeMutationObserver(observer => {
      if (!(element instanceof Node)) {
        return;
      }

      observer.observe(element, { attributes: true });
    });
  }

  #resetOriginalStyle(): void {
    const element = this.domElement,
      originalStyle = this.#originalStyle;

    if (!element || !originalStyle) {
      return;
    }

    setStyle(element, originalStyle, true);
  }

  #safeMutationObserver(callback: (observer: MutationObserver) => void): void {
    if (!this.#mutationObserver) {
      return;
    }

    callback(this.#mutationObserver);
  }

  #setFullScreenStyle(): void {
    const element = this.domElement;

    if (!element) {
      return;
    }

    setStyle(element, getFullScreenStyle(this.#container.actualOptions.fullScreen.zIndex), true);
  }
}
