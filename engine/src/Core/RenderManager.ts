import {
  defaultCompositeValue,
  defaultTransformValue,
  defaultZoom,
  minStrokeWidth,
  minimumSize,
  originPoint,
  zIndexFactorOffset,
} from "./Utils/Constants.js";
import { getStyleFromHsl, rangeColorToHsl } from "../Utils/ColorUtils.js";
import type { CanvasManager } from "./CanvasManager.js";
import type { Container } from "./Container.js";
import { DrawLayer } from "../Enums/DrawLayer.js";
import type { IContainerPlugin } from "./Interfaces/IContainerPlugin.js";
import type { IDelta } from "./Interfaces/IDelta.js";
import type { IDrawParticleParams } from "./Interfaces/IDrawParticleParams.js";
import type { IEffectDrawer } from "./Interfaces/IEffectDrawer.js";
import type { IHsl } from "./Interfaces/Colors.js";
import type { IParticleColorStyle } from "./Interfaces/IParticleColorStyle.js";
import type { IParticleTransformValues } from "./Interfaces/IParticleTransformValues.js";
import type { IParticleUpdater } from "./Interfaces/IParticleUpdater.js";
import type { IShapeDrawData } from "./Interfaces/IShapeDrawData.js";
import type { IShapeDrawer } from "./Interfaces/IShapeDrawer.js";
import type { Particle } from "./Particle.js";
import type { PluginManager } from "./Utils/PluginManager.js";
import { getLogger } from "../Utils/LogUtils.js";

const fColorIndex = 0,
  sColorIndex = 1;

/**
 * @param factor - The factor
 * @param newFactor - The newFactor
 * @param key - The key
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
 * Canvas manager
 */
export class RenderManager {
  #backgroundElement: CanvasImageSource | null;
  readonly #backgroundWarnings: Set<string>;
  #canvasClearPlugins: IContainerPlugin[];
  readonly #canvasManager: CanvasManager;
  #colorPlugins: IContainerPlugin[];
  readonly #container;
  /**
   * The particles canvas context
   */
  #context: OffscreenCanvasRenderingContext2D | null;
  #contextSettings?: CanvasRenderingContext2DSettings;
  #drawParticlePlugins: IContainerPlugin[];
  #drawParticlesCleanupPlugins: IContainerPlugin[];
  #drawParticlesSetupPlugins: IContainerPlugin[];
  /**
   * Layer-based plugin storage: each plugin is pushed to ALL layers where it has relevant hooks.
   * For example, a plugin implementing both `canvasPaint` and `drawSettingsSetup` appears in
   * both `BackgroundMask` and `CanvasSetup` layers.
   *
   * Populated by {@link initPlugins} and consumed by {@link drawParticles} which iterates
   * layers 0-7 in ordinal order.
   * @see DrawLayer
   */
  #layers: Record<DrawLayer, IContainerPlugin[]>;
  readonly #pluginManager;
  #postDrawUpdaters: IParticleUpdater[];
  #preDrawUpdaters: IParticleUpdater[];
  readonly #reusableColorStyles: IParticleColorStyle = {};
  readonly #reusablePluginColors: (IHsl | undefined)[] = [undefined, undefined];
  readonly #reusableTransform: Partial<IParticleTransformValues> = {};

  /**
   * Constructor of canvas manager
   * @param pluginManager - the engine managing the whole library
   * @param container - the parent container
   * @param canvasManager - The canvasManager
   */
  constructor(pluginManager: PluginManager, container: Container, canvasManager: CanvasManager) {
    this.#pluginManager = pluginManager;
    this.#container = container;
    this.#canvasManager = canvasManager;
    this.#context = null;
    this.#backgroundElement = null;
    this.#backgroundWarnings = new Set<string>();
    this.#preDrawUpdaters = [];
    this.#postDrawUpdaters = [];
    this.#canvasClearPlugins = [];
    this.#colorPlugins = [];
    this.#drawParticlePlugins = [];
    this.#drawParticlesCleanupPlugins = [];
    this.#drawParticlesSetupPlugins = [];
    this.#layers = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
    };
  }

  /**
   * Canvas rendering context settings
   * @returns the canvas context settings
   */
  get settings(): CanvasRenderingContext2DSettings | undefined {
    return this.#contextSettings;
  }

  /** Clears the canvas directly */
  canvasClear(): void {
    if (!this.#container.actualOptions.clear) {
      return;
    }

    this.draw(ctx => {
      ctx.clearRect(originPoint.x, originPoint.y, this.#canvasManager.size.width, this.#canvasManager.size.height);
    });
  }

  /**
   * Clears the canvas content through the layer system.
   *
   * First checks plugins registered in the dedicated `#canvasClearPlugins` array (plugins that
   * implement `canvasClear` as their only rendering hook, e.g. trail), then iterates all layers
   * in ordinal order (0–7) for any additional `canvasClear` implementations.
   *
   * The first plugin that returns `true` short-circuits the clear. If no plugin handles it,
   * falls back to {@link canvasClear} which respects `actualOptions.clear`.
   * @see IContainerPlugin.canvasClear
   */
  clear(): void {
    /* check dedicated canvasClear plugins first (e.g. trail, which has no layer hooks) */
    for (const plugin of this.#canvasClearPlugins) {
      if (plugin.canvasClear?.() ?? false) {
        return;
      }
    }

    /* then check all layer plugins */
    for (const layer of Object.values(DrawLayer)) {
      if (typeof layer === "number") {
        for (const plugin of this.#getLayerPlugins(layer)) {
          if (plugin.canvasClear?.() ?? false) {
            return;
          }
        }
      }
    }

    this.canvasClear();
  }

  /**
   * Destroying object actions
   */
  destroy(): void {
    this.stop();

    this.#backgroundElement = null;
    this.#backgroundWarnings.clear();
    this.#preDrawUpdaters = [];
    this.#postDrawUpdaters = [];
    this.#canvasClearPlugins = [];
    this.#colorPlugins = [];
    this.#drawParticlePlugins = [];
    this.#drawParticlesCleanupPlugins = [];
    this.#drawParticlesSetupPlugins = [];
    for (const layer of Object.values(DrawLayer)) {
      if (typeof layer === "number") {
        this.#layers[layer] = [];
      }
    }
  }

  /**
   * Generic draw method for drawing stuff on the canvas context
   * @param cb - The cb
   * @returns the result of the callback
   */
  draw<T>(cb: (context: OffscreenCanvasRenderingContext2D) => T): T | undefined {
    const ctx = this.#context;

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
      psColor = particle.getStrokeColor();

    let [fColor, sColor] = this.#getPluginParticleColors(particle);

    fColor ??= pfColor;
    sColor ??= psColor;

    if (!fColor && !sColor) {
      return;
    }

    const container = this.#container,
      zIndexOptions = particle.options.zIndex,
      zIndexFactor = zIndexFactorOffset - particle.zIndexFactor,
      { fillOpacity, opacity, strokeOpacity } = particle.getOpacity(),
      transform = this.#reusableTransform,
      colorStyles = this.#reusableColorStyles,
      fill = fColor
        ? getStyleFromHsl(fColor, container.hdr, fillOpacity * opacity, container.peakNits, container.hdrMode)
        : undefined,
      stroke = sColor
        ? getStyleFromHsl(sColor, container.hdr, strokeOpacity * opacity, container.peakNits, container.hdrMode)
        : fill;

    transform.a = transform.b = transform.c = transform.d = undefined;

    colorStyles.fill = fill;
    colorStyles.stroke = stroke;

    this.draw((context): void => {
      for (const plugin of this.#drawParticlesSetupPlugins) {
        plugin.drawParticleSetup?.(context, particle, delta);
      }

      this.#applyPreDrawUpdaters(context, particle, radius, opacity, colorStyles, transform);

      this.#drawParticle({
        container,
        context,
        particle,
        delta,
        colorStyles,
        radius: radius * zIndexFactor ** zIndexOptions.sizeRate,
        opacity: opacity,
        transform,
      });

      this.#applyPostDrawUpdaters(particle);

      for (const plugin of this.#drawParticlesCleanupPlugins) {
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
      for (const plugin of this.#drawParticlePlugins) {
        this.#drawParticlePlugin(ctx, plugin, particle, delta);
      }
    });
  }

  /**
   * Draws all particles for the current frame via the layer-based rendering pipeline.
   *
   * Layer order (back to front):
   * 0. BackgroundElement — auto-draw `background.element` via `ctx.drawImage`
   * 1. BackgroundDraw — execute `background.draw(ctx, delta)` callback
   * 2. BackgroundMask — `plugin.canvasPaint()` for each plugin
   * 3. CanvasSetup — `plugin.drawSettingsSetup(ctx, delta)` for each plugin
   * 4. PluginContent — `plugin.draw(ctx, delta)` for each plugin
   * 5. Particles — `particles.drawParticles(delta)` (core particle rendering)
   * 6. CanvasCleanup — `plugin.clearDraw()` + `plugin.drawSettingsCleanup()` for each plugin
   * 7. Foreground — reserved for future overlay/fx
   * @param delta - The delta time
   * @see DrawLayer
   */
  drawParticles(delta: IDelta): void {
    const { particles, actualOptions } = this.#container;

    this.clear();

    /* update each particle before drawing */
    particles.update(delta);

    this.draw(ctx => {
      const width = this.#canvasManager.size.width,
        height = this.#canvasManager.size.height;

      /* Layer 0 — BackgroundElement: background.element auto-draw */
      if (this.#backgroundElement) {
        try {
          ctx.drawImage(this.#backgroundElement, originPoint.x, originPoint.y, width, height);
        } catch {
          this.#warnOnce("background-element-draw-error", "Error drawing background element onto canvas");
        }
      }

      /* Layer 1 — BackgroundDraw: background.draw callback */
      const background = actualOptions.background;

      if (background.draw) {
        try {
          background.draw(ctx, delta);
        } catch {
          this.#warnOnce("background-draw-error", "Error in background.draw callback");
        }
      }

      /* Layer 2 — BackgroundMask: plugin canvasPaint */
      for (const plugin of this.#getLayerPlugins(DrawLayer.BackgroundMask)) {
        plugin.canvasPaint?.();
      }

      /* Layer 3 — CanvasSetup: plugin drawSettingsSetup */
      for (const plugin of this.#getLayerPlugins(DrawLayer.CanvasSetup)) {
        plugin.drawSettingsSetup?.(ctx, delta);
      }

      /* Layer 4 — PluginContent: plugin draw behind particles */
      for (const plugin of this.#getLayerPlugins(DrawLayer.PluginContent)) {
        plugin.draw?.(ctx, delta);
      }

      /* Layer 5 — Particles */
      particles.drawParticles(delta);

      /* Layer 6 — CanvasCleanup: plugin clearDraw + drawSettingsCleanup */
      for (const plugin of this.#getLayerPlugins(DrawLayer.CanvasCleanup)) {
        plugin.clearDraw?.(ctx, delta);
        plugin.drawSettingsCleanup?.(ctx, delta);
      }

      /* Layer 7 — Foreground: reserved */
    });
  }

  /**
   * Initializes the canvas element
   */
  init(): void {
    this.initUpdaters();
    this.initPlugins();
    this.#resolveBackgroundElement();
    this.paint();
  }

  /**
   * Initializes the plugins needed by canvas.
   *
   * Assigns each plugin to ALL layers where it has relevant hooks, not just one primary layer.
   * This enables plugins like {@link BackgroundMaskPluginInstance} that implement multiple hooks
   * (`canvasPaint`→BackgroundMask, `drawSettingsSetup`→CanvasSetup, `drawSettingsCleanup`→CanvasCleanup)
   * to participate in all the layers they need.
   *
   * Hook-independent features (`particleFillColor`, `particleStrokeColor`, `drawParticle`,
   * `drawParticleSetup`, `drawParticleCleanup`) are collected into separate arrays for
   * per-particle use during rendering.
   * @see DrawLayer
   * @see IContainerPlugin
   */
  initPlugins(): void {
    this.#canvasClearPlugins = [];
    this.#colorPlugins = [];
    this.#drawParticlePlugins = [];
    this.#drawParticlesSetupPlugins = [];
    this.#drawParticlesCleanupPlugins = [];

    for (const layer of Object.values(DrawLayer)) {
      if (typeof layer === "number") {
        this.#layers[layer] = [];
      }
    }

    for (const plugin of this.#container.plugins) {
      if (plugin.particleFillColor ?? plugin.particleStrokeColor) {
        this.#colorPlugins.push(plugin);
      }

      if (plugin.drawParticle) {
        this.#drawParticlePlugins.push(plugin);
      }

      if (plugin.drawParticleSetup) {
        this.#drawParticlesSetupPlugins.push(plugin);
      }

      if (plugin.drawParticleCleanup) {
        this.#drawParticlesCleanupPlugins.push(plugin);
      }

      if (plugin.canvasClear) {
        this.#canvasClearPlugins.push(plugin);
      }

      /* assign plugin to all layers where it has relevant hooks */
      if (plugin.canvasPaint) {
        this.#getLayerPlugins(DrawLayer.BackgroundMask).push(plugin);
      }

      if (plugin.drawSettingsSetup) {
        this.#getLayerPlugins(DrawLayer.CanvasSetup).push(plugin);
      }

      if (plugin.draw) {
        this.#getLayerPlugins(DrawLayer.PluginContent).push(plugin);
      }

      if (plugin.clearDraw ?? plugin.drawSettingsCleanup) {
        this.#getLayerPlugins(DrawLayer.CanvasCleanup).push(plugin);
      }
    }
  }

  /**
   * Initializes the updaters needed by canvas
   */
  initUpdaters(): void {
    this.#preDrawUpdaters = [];
    this.#postDrawUpdaters = [];

    for (const updater of this.#container.particleUpdaters) {
      if (updater.afterDraw) {
        this.#postDrawUpdaters.push(updater);
      }

      if (updater.getColorStyles ?? updater.getTransformValues ?? updater.beforeDraw) {
        this.#preDrawUpdaters.push(updater);
      }
    }
  }

  /**
   * Paints the canvas background
   */
  paint(): void {
    let handled = false;

    for (const plugin of this.#getLayerPlugins(DrawLayer.BackgroundMask)) {
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

  /**
   * Paints the canvas background with an optional base color
   * @param baseColor - The baseColor
   */
  paintBase(baseColor?: string): void {
    this.draw(ctx => {
      ctx.fillStyle = baseColor ?? "rgba(0,0,0,0)";
      ctx.fillRect(originPoint.x, originPoint.y, this.#canvasManager.size.width, this.#canvasManager.size.height);
    });
  }

  /**
   * Paints an image on the canvas with the given opacity
   * @param image - The image
   * @param opacity - The opacity value
   */
  paintImage(image: HTMLImageElement | undefined | null, opacity: number): void {
    this.draw(ctx => {
      if (!image) {
        return;
      }

      const prevAlpha = ctx.globalAlpha;

      ctx.globalAlpha = opacity;

      ctx.drawImage(
        image,
        originPoint.x,
        originPoint.y,
        this.#canvasManager.size.width,
        this.#canvasManager.size.height,
      );

      ctx.globalAlpha = prevAlpha;
    });
  }

  /**
   * Sets the canvas rendering context
   * @param context - The rendering context
   */
  setContext(context: OffscreenCanvasRenderingContext2D | null): void {
    this.#context = context;

    if (this.#context) {
      this.#context.globalCompositeOperation = defaultCompositeValue;
    }
  }

  /**
   * Sets the canvas rendering context settings
   * @param settings - The settings
   */
  setContextSettings(settings: CanvasRenderingContext2DSettings): void {
    this.#contextSettings = settings;
  }

  /** Stops the renderer and clears the canvas */
  stop(): void {
    this.draw(ctx => {
      ctx.clearRect(originPoint.x, originPoint.y, this.#canvasManager.size.width, this.#canvasManager.size.height);
    });
  }

  #applyPostDrawUpdaters(particle: Particle): void {
    for (const updater of this.#postDrawUpdaters) {
      updater.afterDraw?.(particle);
    }
  }

  #applyPreDrawUpdaters(
    ctx: OffscreenCanvasRenderingContext2D,
    particle: Particle,
    radius: number,
    zOpacity: number,
    colorStyles: IParticleColorStyle,
    transform: Partial<IParticleTransformValues>,
  ): void {
    for (const updater of this.#preDrawUpdaters) {
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
  }

  #drawAfterEffect(drawer: IEffectDrawer | undefined, data: IShapeDrawData): void {
    if (!drawer?.drawAfter) {
      return;
    }

    const { particle } = data;

    if (!particle.effect) {
      return;
    }

    drawer.drawAfter(data);
  }

  #drawBeforeEffect(drawer: IEffectDrawer | undefined, data: IShapeDrawData): void {
    if (!drawer?.drawBefore) {
      return;
    }

    const { particle } = data;

    if (!particle.effect) {
      return;
    }

    drawer.drawBefore(data);
  }

  #drawParticle(data: IDrawParticleParams): void {
    const { container, context, particle, delta, colorStyles, radius, opacity, transform } = data,
      { effectDrawers, shapeDrawers } = container,
      pos = particle.getPosition(),
      transformData = particle.getTransformData(transform),
      drawScale = defaultZoom,
      drawPosition = {
        x: pos.x,
        y: pos.y,
      };

    context.setTransform(transformData.a, transformData.b, transformData.c, transformData.d, pos.x, pos.y);

    if (colorStyles.fill) {
      context.fillStyle = colorStyles.fill;
    }

    const fillEnabled = !!particle.fillEnabled,
      strokeWidth = particle.strokeWidth ?? minStrokeWidth;

    context.lineWidth = strokeWidth;

    if (colorStyles.stroke) {
      context.strokeStyle = colorStyles.stroke;
    }

    const drawData: IShapeDrawData = {
      context,
      particle,
      radius,
      drawRadius: radius * drawScale,
      opacity,
      delta,
      pixelRatio: container.retina.pixelRatio,
      fill: fillEnabled,
      stroke: strokeWidth > minStrokeWidth,
      transformData,
      position: { ...pos },
      drawPosition,
      drawScale,
    };

    for (const plugin of container.plugins) {
      plugin.drawParticleTransform?.(drawData);
    }

    const effect = particle.effect ? effectDrawers.get(particle.effect) : undefined,
      shape = particle.shape ? shapeDrawers.get(particle.shape) : undefined;

    this.#drawBeforeEffect(effect, drawData);
    this.#drawShapeBeforeDraw(shape, drawData);
    this.#drawShape(shape, drawData);
    this.#drawShapeAfterDraw(shape, drawData);
    this.#drawAfterEffect(effect, drawData);

    context.resetTransform();
  }

  #drawParticlePlugin(
    context: OffscreenCanvasRenderingContext2D,
    plugin: IContainerPlugin,
    particle: Particle,
    delta: IDelta,
  ): void {
    if (!plugin.drawParticle) {
      return;
    }

    plugin.drawParticle(context, particle, delta);
  }

  #drawShape(drawer: IShapeDrawer | undefined, data: IShapeDrawData): void {
    if (!drawer) {
      return;
    }

    const { context, fill, particle, stroke } = data;

    if (!particle.shape) {
      return;
    }

    context.beginPath();

    drawer.draw(data);

    if (particle.shapeClose) {
      context.closePath();
    }

    if (fill) {
      context.fill();
    }

    if (stroke) {
      context.stroke();
    }
  }

  #drawShapeAfterDraw(drawer: IShapeDrawer | undefined, data: IShapeDrawData): void {
    if (!drawer?.afterDraw) {
      return;
    }

    const { particle } = data;

    if (!particle.shape) {
      return;
    }

    drawer.afterDraw(data);
  }

  #drawShapeBeforeDraw(drawer: IShapeDrawer | undefined, data: IShapeDrawData): void {
    if (!drawer?.beforeDraw) {
      return;
    }

    const { particle } = data;

    if (!particle.shape) {
      return;
    }

    drawer.beforeDraw(data);
  }

  #getLayerPlugins(layer: DrawLayer): IContainerPlugin[] {
    return this.#layers[layer];
  }

  #getPluginParticleColors(particle: Particle): (IHsl | undefined)[] {
    let fColor: IHsl | undefined, sColor: IHsl | undefined;

    for (const plugin of this.#colorPlugins) {
      if (!fColor && plugin.particleFillColor) {
        fColor = rangeColorToHsl(this.#pluginManager, plugin.particleFillColor(particle));
      }

      if (!sColor && plugin.particleStrokeColor) {
        sColor = rangeColorToHsl(this.#pluginManager, plugin.particleStrokeColor(particle));
      }

      if (fColor && sColor) {
        break;
      }
    }

    this.#reusablePluginColors[fColorIndex] = fColor;
    this.#reusablePluginColors[sColorIndex] = sColor;

    return this.#reusablePluginColors;
  }

  #resolveBackgroundElement(): void {
    const background = this.#container.actualOptions.background;

    this.#backgroundElement = null;

    if (!background.element) {
      return;
    }

    if (typeof background.element === "string") {
      if (typeof document !== "undefined") {
        const node = document.querySelector(background.element);

        if (node instanceof HTMLCanvasElement || node instanceof HTMLVideoElement || node instanceof HTMLImageElement) {
          this.#backgroundElement = node;
        } else if (node) {
          this.#warnOnce(
            "background-element-not-supported",
            `Background element "${background.element}" is not a supported drawable element (canvas, video, or img)`,
          );
        } else {
          this.#warnOnce(
            "background-element-not-found",
            `Background element selector "${background.element}" not found`,
          );
        }
      }
    } else if (
      background.element instanceof HTMLCanvasElement ||
      background.element instanceof OffscreenCanvas ||
      background.element instanceof HTMLVideoElement ||
      background.element instanceof HTMLImageElement
    ) {
      this.#backgroundElement = background.element;
    }
  }

  #warnOnce(key: string, message: string): void {
    if (!this.#backgroundWarnings.has(key)) {
      this.#backgroundWarnings.add(key);

      getLogger().warning(message);
    }
  }
}
