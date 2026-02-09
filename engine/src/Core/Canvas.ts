import { clear, drawParticle, drawParticlePlugin, paintBase, paintImage } from "../Utils/CanvasUtils.js";
import { cloneStyle, getFullScreenStyle, safeMatchMedia, safeMutationObserver } from "../Utils/Utils.js";
import {
  defaultTransformValue,
  defaultZoom,
  generatedAttribute,
  half,
  minimumSize,
  originPoint,
  zIndexFactorOffset,
} from "./Utils/Constants.js";
import { getStyleFromHsl, getStyleFromRgb, rangeColorToHsl, rangeColorToRgb } from "../Utils/ColorUtils.js";
import type { Container } from "./Container.js";
import type { Engine } from "./Engine.js";
import type { IContainerPlugin } from "./Interfaces/IContainerPlugin.js";
import type { ICoordinates } from "./Interfaces/ICoordinates.js";
import type { IDelta } from "./Interfaces/IDelta.js";
import type { IDimension } from "./Interfaces/IDimension.js";
import type { IHsl } from "./Interfaces/Colors.js";
import type { IParticleColorStyle } from "./Interfaces/IParticleColorStyle.js";
import type { IParticleTransformValues } from "./Interfaces/IParticleTransformValues.js";
import type { IParticleUpdater } from "./Interfaces/IParticleUpdater.js";
import type { Particle } from "./Particle.js";

const fColorIndex = 0,
  sColorIndex = 1;

/**
 * @param factor -
 * @param newFactor -
 * @param key -
 */
function setTransformValue(
  factor: Partial<IParticleTransformValues>,
  newFactor: Partial<IParticleTransformValues>,
  key: keyof IParticleTransformValues,
): void {
  const newValue = newFactor[key];

  if (newValue !== undefined) {
    factor[key] = (factor[key] ?? defaultTransformValue) * newValue;
  }
}

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
export class Canvas {
  /**
   * The particles canvas
   */
  element?: HTMLCanvasElement;

  /**
   * The particles canvas dimension
   */
  readonly size: IDimension;

  /**
   * Current zoom level
   */
  zoom = defaultZoom;

  private _canvasClearPlugins: IContainerPlugin[];
  private _canvasPaintPlugins: IContainerPlugin[];
  private _canvasSettings?: CanvasRenderingContext2DSettings;
  private _clearDrawPlugins: IContainerPlugin[];
  private _colorPlugins: IContainerPlugin[];
  /**
   * The particles canvas context
   */
  private _context: CanvasRenderingContext2D | null;
  private _drawParticlePlugins: IContainerPlugin[];
  private _drawParticlesCleanupPlugins: IContainerPlugin[];
  private _drawParticlesSetupPlugins: IContainerPlugin[];
  private _drawPlugins: IContainerPlugin[];
  private _drawSettingsCleanupPlugins: IContainerPlugin[];
  private _drawSettingsSetupPlugins: IContainerPlugin[];
  private readonly _engine;
  private _generated;
  private _mutationObserver?: MutationObserver;
  private _originalStyle?: CSSStyleDeclaration;
  private _pointerEvents: string;
  private _postDrawUpdaters: IParticleUpdater[];
  private _preDrawUpdaters: IParticleUpdater[];
  private _resizePlugins: IContainerPlugin[];
  private readonly _reusableColorStyles: IParticleColorStyle = {};
  private readonly _reusablePluginColors: (IHsl | undefined)[] = [undefined, undefined];
  private readonly _reusableTransform: Partial<IParticleTransformValues> = {};
  private readonly _standardSize: IDimension;

  /**
   * Zoom center point (for centered zooming)
   */
  private _zoomCenter: ICoordinates = { ...originPoint };

  /**
   * Constructor of canvas manager
   * @param container - the parent container
   * @param engine - the engine managing the whole library
   */
  constructor(
    private readonly container: Container,
    engine: Engine,
  ) {
    this._engine = engine;
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

    this._context = null;
    this._generated = false;
    this._preDrawUpdaters = [];
    this._postDrawUpdaters = [];
    this._resizePlugins = [];
    this._colorPlugins = [];
    this._canvasClearPlugins = [];
    this._canvasPaintPlugins = [];
    this._clearDrawPlugins = [];
    this._drawParticlePlugins = [];
    this._drawParticlesCleanupPlugins = [];
    this._drawParticlesSetupPlugins = [];
    this._drawPlugins = [];
    this._drawSettingsSetupPlugins = [];
    this._drawSettingsCleanupPlugins = [];
    this._pointerEvents = "none";
  }

  get settings(): CanvasRenderingContext2DSettings | undefined {
    return this._canvasSettings;
  }

  private get _fullScreen(): boolean {
    return this.container.actualOptions.fullScreen.enable;
  }

  canvasClear(): void {
    if (!this.container.actualOptions.clear) {
      return;
    }

    this.draw(ctx => {
      clear(ctx, this.size);
    });
  }

  /**
   * Clears the canvas content
   */
  clear(): void {
    let pluginHandled = false;

    for (const plugin of this._canvasClearPlugins) {
      pluginHandled = plugin.canvasClear?.() ?? false;

      if (pluginHandled) {
        break;
      }
    }

    if (pluginHandled) {
      return;
    }

    this.canvasClear();
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

    this._preDrawUpdaters = [];
    this._postDrawUpdaters = [];
    this._resizePlugins = [];
    this._colorPlugins = [];
    this._canvasClearPlugins = [];
    this._canvasPaintPlugins = [];
    this._clearDrawPlugins = [];
    this._drawParticlePlugins = [];
    this._drawParticlesCleanupPlugins = [];
    this._drawParticlesSetupPlugins = [];
    this._drawPlugins = [];
    this._drawSettingsSetupPlugins = [];
    this._drawSettingsCleanupPlugins = [];
  }

  /**
   * Generic draw method for drawing stuff on the canvas context
   * @param cb -
   * @returns the result of the callback
   */
  draw<T>(cb: (context: CanvasRenderingContext2D) => T): T | undefined {
    const ctx = this._context;

    if (!ctx) {
      return;
    }

    return cb(ctx);
  }

  /**
   * Draws the specified particle in the canvas
   * @param particle - the particle to draw
   * @param delta - the frame delta time values
   */
  drawParticle(particle: Particle, delta: IDelta): void {
    if (particle.spawning || particle.destroyed) {
      return;
    }

    const radius = particle.getRadius();

    if (radius <= minimumSize) {
      return;
    }

    const pfColor = particle.getFillColor(),
      psColor = particle.getStrokeColor() ?? pfColor;

    let [fColor, sColor] = this._getPluginParticleColors(particle);

    fColor ??= pfColor;
    sColor ??= psColor;

    if (!fColor && !sColor) {
      return;
    }

    const container = this.container,
      zIndexOptions = particle.options.zIndex,
      zIndexFactor = zIndexFactorOffset - particle.zIndexFactor,
      { opacity, strokeOpacity } = particle.getOpacity(),
      transform = this._reusableTransform,
      colorStyles = this._reusableColorStyles,
      fill = fColor ? getStyleFromHsl(fColor, container.hdr, opacity) : undefined,
      stroke = sColor ? getStyleFromHsl(sColor, container.hdr, strokeOpacity) : fill;

    transform.a = transform.b = transform.c = transform.d = undefined;

    colorStyles.fill = fill;
    colorStyles.stroke = stroke;

    this.draw((context): void => {
      for (const plugin of this._drawParticlesSetupPlugins) {
        plugin.drawParticleSetup?.(context, particle, delta);
      }

      this._applyPreDrawUpdaters(context, particle, radius, opacity, colorStyles, transform);

      drawParticle({
        container,
        context,
        particle,
        delta,
        colorStyles,
        radius: radius * zIndexFactor ** zIndexOptions.sizeRate,
        opacity: opacity,
        transform,
      });

      this._applyPostDrawUpdaters(particle);

      for (const plugin of this._drawParticlesCleanupPlugins) {
        plugin.drawParticleCleanup?.(context, particle, delta);
      }
    });
  }

  /**
   * Draws stuff using the given plugin, using the given particle
   * @param particle - the particle used
   * @param delta - the frame delta time values
   */
  drawParticlePlugins(particle: Particle, delta: IDelta): void {
    this.draw(ctx => {
      for (const plugin of this._drawParticlePlugins) {
        drawParticlePlugin(ctx, plugin, particle, delta);
      }
    });
  }

  drawParticles(delta: IDelta): void {
    const { particles } = this.container;

    this.clear();

    /* update each particle before drawing */
    particles.update(delta);

    this.draw(ctx => {
      for (const plugin of this._drawSettingsSetupPlugins) {
        plugin.drawSettingsSetup?.(ctx, delta);
      }

      for (const plugin of this._drawPlugins) {
        plugin.draw?.(ctx, delta);
      }

      // this.quadTree.draw(ctx);

      particles.drawParticles(delta);

      for (const plugin of this._clearDrawPlugins) {
        plugin.clearDraw?.(ctx, delta);
      }

      for (const plugin of this._drawSettingsCleanupPlugins) {
        plugin.drawSettingsCleanup?.(ctx, delta);
      }
    });
  }

  getZoomCenter(): ICoordinates {
    const pxRatio = this.container.retina.pixelRatio,
      zoomCenter = this._zoomCenter,
      { width, height } = this.size;

    return {
      x: zoomCenter.x || (width * half) / pxRatio,
      y: zoomCenter.y || (height * half) / pxRatio,
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

    this.initUpdaters();
    this.initPlugins();
    this.paint();
  }

  /**
   * Initializes the canvas background
   */
  initBackground(): void {
    const { container } = this,
      options = container.actualOptions,
      background = options.background,
      element = this.element;

    if (!element) {
      return;
    }

    const elementStyle = element.style,
      color = rangeColorToRgb(this._engine, background.color);

    if (color) {
      elementStyle.backgroundColor = getStyleFromRgb(color, container.hdr, background.opacity);
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
    this._colorPlugins = [];
    this._canvasClearPlugins = [];
    this._canvasPaintPlugins = [];
    this._clearDrawPlugins = [];
    this._drawParticlePlugins = [];
    this._drawParticlesSetupPlugins = [];
    this._drawParticlesCleanupPlugins = [];
    this._drawPlugins = [];
    this._drawSettingsSetupPlugins = [];
    this._drawSettingsCleanupPlugins = [];

    for (const plugin of this.container.plugins) {
      if (plugin.resize) {
        this._resizePlugins.push(plugin);
      }

      if (plugin.particleFillColor ?? plugin.particleStrokeColor) {
        this._colorPlugins.push(plugin);
      }

      if (plugin.canvasClear) {
        this._canvasClearPlugins.push(plugin);
      }

      if (plugin.canvasPaint) {
        this._canvasPaintPlugins.push(plugin);
      }

      if (plugin.drawParticle) {
        this._drawParticlePlugins.push(plugin);
      }

      if (plugin.drawParticleSetup) {
        this._drawParticlesSetupPlugins.push(plugin);
      }

      if (plugin.drawParticleCleanup) {
        this._drawParticlesCleanupPlugins.push(plugin);
      }

      if (plugin.draw) {
        this._drawPlugins.push(plugin);
      }

      if (plugin.drawSettingsSetup) {
        this._drawSettingsSetupPlugins.push(plugin);
      }

      if (plugin.drawSettingsCleanup) {
        this._drawSettingsCleanupPlugins.push(plugin);
      }

      if (plugin.clearDraw) {
        this._clearDrawPlugins.push(plugin);
      }
    }
  }

  /**
   * Initializes the updaters needed by canvas
   */
  initUpdaters(): void {
    this._preDrawUpdaters = [];
    this._postDrawUpdaters = [];

    for (const updater of this.container.particles.updaters) {
      if (updater.afterDraw) {
        this._postDrawUpdaters.push(updater);
      }

      if (updater.getColorStyles ?? updater.getTransformValues ?? updater.beforeDraw) {
        this._preDrawUpdaters.push(updater);
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

    const container = this.container;

    this._generated =
      generatedAttribute in canvas.dataset ? canvas.dataset[generatedAttribute] === "true" : this._generated;
    this.element = canvas;
    this.element.ariaHidden = "true";
    this._originalStyle = cloneStyle(this.element.style);

    const standardSize = this._standardSize;

    standardSize.height = canvas.offsetHeight;
    standardSize.width = canvas.offsetWidth;

    const pxRatio = this.container.retina.pixelRatio,
      retinaSize = this.size;

    canvas.height = retinaSize.height = standardSize.height * pxRatio;
    canvas.width = retinaSize.width = standardSize.width * pxRatio;

    const canSupportHdrQuery = safeMatchMedia("(color-gamut: p3)");

    this._canvasSettings = {
      alpha: true,
      colorSpace: canSupportHdrQuery?.matches && container.hdr ? "display-p3" : "srgb",
      desynchronized: true,
      willReadFrequently: false,
    };
    this._context = this.element.getContext("2d", this._canvasSettings);

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
   * Paints the canvas background
   */
  paint(): void {
    let handled = false;

    for (const plugin of this._canvasPaintPlugins) {
      handled = plugin.canvasPaint?.() ?? false;

      if (handled) {
        break;
      }
    }

    if (handled) {
      return;
    }

    this.paintBase();
  }

  paintBase(baseColor?: string): void {
    this.draw(ctx => {
      paintBase(ctx, this.size, baseColor);
    });
  }

  paintImage(image: HTMLImageElement, opacity: number): void {
    this.draw(ctx => {
      paintImage(ctx, this.size, image, opacity);
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

    const container = this.container,
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

    if (this.container.started) {
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
    if (center) {
      this._zoomCenter = center;
    }
  }

  stop(): void {
    this._safeMutationObserver(obs => {
      obs.disconnect();
    });
    this._mutationObserver = undefined;

    this.draw(ctx => {
      clear(ctx, this.size);
    });
  }

  /**
   * The window resize event handler
   */
  async windowResize(): Promise<void> {
    if (!this.element || !this.resize()) {
      return;
    }

    const container = this.container,
      needsRefresh = container.updateActualOptions();

    /* density particles enabled */
    container.particles.setDensity();

    this._applyResizePlugins();

    if (needsRefresh) {
      await container.refresh();
    }
  }

  private readonly _applyPostDrawUpdaters: (particle: Particle) => void = particle => {
    for (const updater of this._postDrawUpdaters) {
      updater.afterDraw?.(particle);
    }
  };

  private readonly _applyPreDrawUpdaters: (
    ctx: CanvasRenderingContext2D,
    particle: Particle,
    radius: number,
    zOpacity: number,
    colorStyles: IParticleColorStyle,
    transform: Partial<IParticleTransformValues>,
  ) => void = (ctx, particle, radius, zOpacity, colorStyles, transform) => {
    for (const updater of this._preDrawUpdaters) {
      if (updater.getColorStyles) {
        const { fill, stroke } = updater.getColorStyles(particle, ctx, radius, zOpacity);

        if (fill) {
          colorStyles.fill = fill;
        }

        if (stroke) {
          colorStyles.stroke = stroke;
        }
      }

      if (updater.getTransformValues) {
        const updaterTransform = updater.getTransformValues(particle);

        for (const key in updaterTransform) {
          setTransformValue(transform, updaterTransform, key as keyof IParticleTransformValues);
        }
      }

      updater.beforeDraw?.(particle);
    }
  };

  private readonly _applyResizePlugins: () => void = () => {
    for (const plugin of this._resizePlugins) {
      plugin.resize?.();
    }
  };

  private readonly _getPluginParticleColors: (particle: Particle) => (IHsl | undefined)[] = particle => {
    let fColor: IHsl | undefined, sColor: IHsl | undefined;

    for (const plugin of this._colorPlugins) {
      if (!fColor && plugin.particleFillColor) {
        fColor = rangeColorToHsl(this._engine, plugin.particleFillColor(particle));
      }

      if (!sColor && plugin.particleStrokeColor) {
        sColor = rangeColorToHsl(this._engine, plugin.particleStrokeColor(particle));
      }

      if (fColor && sColor) {
        break;
      }
    }

    this._reusablePluginColors[fColorIndex] = fColor;
    this._reusablePluginColors[sColorIndex] = sColor;

    return this._reusablePluginColors;
  };

  private readonly _initStyle: () => void = () => {
    const element = this.element,
      options = this.container.actualOptions;

    if (!element) {
      return;
    }

    if (this._fullScreen) {
      this._setFullScreenStyle();
    } else {
      this._resetOriginalStyle();
    }

    for (const key in options.style) {
      if (!key || !Object.hasOwn(options.style, key)) {
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

    setStyle(element, getFullScreenStyle(this.container.actualOptions.fullScreen.zIndex), true);
  };
}
