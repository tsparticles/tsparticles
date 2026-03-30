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
 *
 * @param canvas -
 * @param style -
 * @param important -
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
   * The particles canvas
   */
  element?: HTMLCanvasElement;

  readonly render;

  /**
   * The particles canvas dimension
   */
  readonly size: IDimension;

  /**
   * Current zoom level
   */
  zoom = defaultZoom;

  private readonly _container;
  private _generated;
  private _mutationObserver?: MutationObserver;
  private _originalStyle?: CSSStyleDeclaration;
  private readonly _pluginManager;
  private _pointerEvents: string;
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
    this._pluginManager = pluginManager;
    this._container = container;
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

    this._generated = false;
    this._resizePlugins = [];
    this._pointerEvents = "none";
  }

  private get _fullScreen(): boolean {
    return this._container.actualOptions.fullScreen.enable;
  }

  /**
   * Destroying object actions
   */
  destroy(): void {
    this.stop();

    if (this._generated) {
      const element = this.element;

      element?.remove();

      this.element = undefined;
    } else {
      this._resetOriginalStyle();
    }

    this.render.destroy();

    this._resizePlugins = [];
  }

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
    this._safeMutationObserver(obs => {
      obs.disconnect();
    });
    this._mutationObserver = safeMutationObserver(records => {
      for (const record of records) {
        if (record.type === "attributes" && record.attributeName === "style") {
          this._repairStyle();
        }
      }
    });

    this.resize();
    this._initStyle();
    this.initBackground();
    this._safeMutationObserver(obs => {
      if (!this.element || !(this.element instanceof Node)) {
        return;
      }

      obs.observe(this.element, { attributes: true });
    });

    this.initPlugins();
    this.render.init();
  }

  /**
   * Initializes the canvas background
   */
  initBackground(): void {
    const { _container } = this,
      options = _container.actualOptions,
      background = options.background,
      element = this.element;

    if (!element) {
      return;
    }

    const elementStyle = element.style,
      color = rangeColorToRgb(this._pluginManager, background.color);

    if (color) {
      elementStyle.backgroundColor = getStyleFromRgb(color, _container.hdr, background.opacity);
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
    this._resizePlugins = [];

    for (const plugin of this._container.plugins) {
      if (plugin.resize) {
        this._resizePlugins.push(plugin);
      }
    }
  }

  /**
   * Loads the canvas HTML element
   * @param canvas - the canvas HTML element
   */
  loadCanvas(canvas: HTMLCanvasElement): void {
    if (this._generated && this.element) {
      this.element.remove();
    }

    const container = this._container;

    this._generated =
      generatedAttribute in canvas.dataset ? canvas.dataset[generatedAttribute] === "true" : this._generated;
    this.element = canvas;
    this.element.ariaHidden = "true";
    this._originalStyle = cloneStyle(this.element.style);

    const standardSize = this._standardSize;

    standardSize.height = canvas.offsetHeight;
    standardSize.width = canvas.offsetWidth;

    const pxRatio = this._container.retina.pixelRatio,
      retinaSize = this.size;

    canvas.height = retinaSize.height = standardSize.height * pxRatio;
    canvas.width = retinaSize.width = standardSize.width * pxRatio;

    const canSupportHdrQuery = safeMatchMedia("(color-gamut: p3)");

    this.render.setContextSettings({
      alpha: true,
      colorSpace: canSupportHdrQuery?.matches && container.hdr ? "display-p3" : "srgb",
      desynchronized: true,
      willReadFrequently: false,
    });
    this.render.setContext(this.element.getContext("2d", this.render.settings));

    this._safeMutationObserver(obs => {
      obs.disconnect();
    });

    container.retina.init();
    this.initBackground();

    this._safeMutationObserver(obs => {
      if (!this.element || !(this.element instanceof Node)) {
        return;
      }

      obs.observe(this.element, { attributes: true });
    });
  }

  /**
   * Calculates the size of the canvas
   * @returns true if the size changed
   */
  resize(): boolean {
    if (!this.element) {
      return false;
    }

    const container = this._container,
      currentSize = container.canvas._standardSize,
      newSize = {
        width: this.element.offsetWidth,
        height: this.element.offsetHeight,
      },
      pxRatio = container.retina.pixelRatio,
      retinaSize = {
        width: newSize.width * pxRatio,
        height: newSize.height * pxRatio,
      };

    if (
      newSize.height === currentSize.height &&
      newSize.width === currentSize.width &&
      retinaSize.height === this.element.height &&
      retinaSize.width === this.element.width
    ) {
      return false;
    }

    const oldSize = { ...currentSize };

    currentSize.height = newSize.height;
    currentSize.width = newSize.width;

    const canvasSize = this.size;

    this.element.width = canvasSize.width = retinaSize.width;
    this.element.height = canvasSize.height = retinaSize.height;

    if (this._container.started) {
      container.particles.setResizeFactor({
        width: currentSize.width / oldSize.width,
        height: currentSize.height / oldSize.height,
      });
    }

    return true;
  }

  setPointerEvents(type: string): void {
    const element = this.element;

    if (!element) {
      return;
    }

    this._pointerEvents = type;
    this._repairStyle();
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

  stop(): void {
    this._safeMutationObserver(obs => {
      obs.disconnect();
    });

    this._mutationObserver = undefined;

    this.render.stop();
  }

  /**
   * The window resize event handler
   */
  async windowResize(): Promise<void> {
    if (!this.element || !this.resize()) {
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

  private readonly _initStyle: () => void = () => {
    const element = this.element,
      options = this._container.actualOptions;

    if (!element) {
      return;
    }

    if (this._fullScreen) {
      this._setFullScreenStyle();
    } else {
      this._resetOriginalStyle();
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
  };

  private readonly _repairStyle: () => void = () => {
    const element = this.element;

    if (!element) {
      return;
    }

    this._safeMutationObserver(observer => {
      observer.disconnect();
    });
    this._initStyle();
    this.initBackground();

    const pointerEvents = this._pointerEvents;

    element.style.pointerEvents = pointerEvents;
    element.setAttribute("pointer-events", pointerEvents);

    this._safeMutationObserver(observer => {
      if (!(element instanceof Node)) {
        return;
      }

      observer.observe(element, { attributes: true });
    });
  };

  private readonly _resetOriginalStyle: () => void = () => {
    const element = this.element,
      originalStyle = this._originalStyle;

    if (!element || !originalStyle) {
      return;
    }

    setStyle(element, originalStyle, true);
  };

  private readonly _safeMutationObserver: (callback: (observer: MutationObserver) => void) => void = callback => {
    if (!this._mutationObserver) {
      return;
    }

    callback(this._mutationObserver);
  };

  private readonly _setFullScreenStyle: () => void = () => {
    const element = this.element;

    if (!element) {
      return;
    }

    setStyle(element, getFullScreenStyle(this._container.actualOptions.fullScreen.zIndex), true);
  };
}
