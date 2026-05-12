import { defaultZoom, generatedAttribute, half } from "./Utils/Constants.js";
import type { Container } from "./Container.js";
import { DomCanvasManager } from "../Dom/DomCanvasManager.js";
import type { IContainerPlugin } from "./Interfaces/IContainerPlugin.js";
import type { ICoordinates } from "./Interfaces/ICoordinates.js";
import type { IDimension } from "./Interfaces/IDimension.js";
import type { ParticlesCanvasType } from "../Types/ParticlesCanvasType.js";
import type { PluginManager } from "./Utils/PluginManager.js";
import { RenderManager } from "./RenderManager.js";
import { safeMatchMedia } from "../Utils/Utils.js";

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
  isHtmlCanvasElement = (canvas: ParticlesCanvasType): canvas is HTMLCanvasElement => {
    return typeof HTMLCanvasElement !== "undefined" && canvas instanceof HTMLCanvasElement;
  };

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
  renderCanvas?: ParticlesCanvasType;

  /**
   * The particles canvas dimension
   */
  readonly size: IDimension;

  /**
   * Current zoom level
   */
  zoom = defaultZoom;

  private readonly _container;
  private readonly _domManager;
  private _resizePlugins: IContainerPlugin[];
  private readonly _standardSize: IDimension;

  /**
   * Zoom center point (for centered zooming)
   */
  private _zoomCenter?: ICoordinates;

  /**
   * Constructor of canvas manager
   * @param pluginManager - the engine managing the whole library
   * @param container - the parent container
   */
  constructor(pluginManager: PluginManager, container: Container) {
    this._container = container;
    this._domManager = new DomCanvasManager(pluginManager, container);
    this.render = new RenderManager(pluginManager, container, this);
    this._standardSize = {
      height: 0,
      width: 0,
    };

    const pxRatio = container.retina.pixelRatio,
      stdSize = this._standardSize;

    this.size = {
      height: stdSize.height * pxRatio,
      width: stdSize.width * pxRatio,
    };

    this._resizePlugins = [];
  }

  /**
   * Destroying object actions
   */
  destroy(): void {
    this.stop();

    this._domManager.destroy();
    this.domElement = undefined;
    this.renderCanvas = undefined;

    this.render.destroy();

    this._resizePlugins = [];
  }

  /**
   * Gets the zoom center point
   * @returns The current zoom center.
   */
  getZoomCenter(): ICoordinates {
    const pxRatio = this._container.retina.pixelRatio,
      { width, height } = this.size;

    if (this._zoomCenter) {
      return this._zoomCenter;
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
    this.resize();
    this._domManager.init();

    this.initPlugins();
    this.render.init();
  }

  /**
   * Initializes the canvas background
   */
  initBackground(): void {
    this._domManager.initBackground();
  }

  /**
   * Initializes the plugins needed by canvas
   */
  initPlugins(): void {
    this._resizePlugins = [];

    for (const plugin of this._container.plugins) {
      if (plugin.resize) {
        this._resizePlugins.push(plugin);
      }
    }
  }

  /**
   * Loads the canvas HTML element
   * @param canvas - the canvas source element or OffscreenCanvas
   */
  loadCanvas(canvas: ParticlesCanvasType): void {
    const container = this._container,
      domCanvas = isHtmlCanvasElement(canvas) ? canvas : undefined;

    this._domManager.loadCanvasElement(domCanvas, domCanvas ? domCanvas.dataset[generatedAttribute] === "true" : false);
    this.domElement = this._domManager.domElement;
    this.renderCanvas = domCanvas ? getTransferredCanvas(domCanvas) : canvas;

    const domElement = this.domElement,
      standardSize = this._standardSize,
      renderCanvas = this.renderCanvas;

    if (domElement) {
      standardSize.height = domElement.offsetHeight;
      standardSize.width = domElement.offsetWidth;
    } else {
      standardSize.height = renderCanvas.height;
      standardSize.width = renderCanvas.width;
    }

    const pxRatio = this._container.retina.pixelRatio,
      retinaSize = this.size;

    renderCanvas.height = retinaSize.height = standardSize.height * pxRatio;
    renderCanvas.width = retinaSize.width = standardSize.width * pxRatio;

    const canSupportHdrQuery = safeMatchMedia("(color-gamut: p3)");

    this.render.setContextSettings({
      alpha: true,
      colorSpace: canSupportHdrQuery?.matches && container.hdr ? "display-p3" : "srgb",
      desynchronized: true,
      willReadFrequently: false,
    });
    this.render.setContext(renderCanvas.getContext("2d", this.render.settings));

    container.retina.init();
    this.initBackground();
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

    const container = this._container,
      renderCanvas = this.renderCanvas;

    if (renderCanvas === undefined) {
      return false;
    }

    const currentSize = container.canvas._standardSize,
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

    if (this._container.started) {
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
    this._domManager.setPointerEvents(type);
  }

  /**
   * Sets the zoom level and center point
   * @param zoomLevel - the new zoom level
   * @param center - optional center point for zoom (default is canvas center)
   */
  setZoom(zoomLevel: number, center?: ICoordinates): void {
    this.zoom = zoomLevel;
    this._zoomCenter = center;
  }

  /** Stops the canvas manager */
  stop(): void {
    this._domManager.stop();

    this.render.stop();
  }

  /**
   * The window resize event handler
   */
  async windowResize(): Promise<void> {
    if (!this.domElement || !this.resize()) {
      return;
    }

    const container = this._container,
      needsRefresh = container.updateActualOptions();

    /* density particles enabled */
    container.particles.setDensity();

    this._applyResizePlugins();

    if (needsRefresh) {
      await container.refresh();
    }
  }

  private readonly _applyResizePlugins: () => void = () => {
    for (const plugin of this._resizePlugins) {
      plugin.resize?.();
    }
  };
}
