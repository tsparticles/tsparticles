import { clear, drawParticle, drawParticlePlugin, paintBase, paintImage } from "../Utils/CanvasUtils.js";
import { defaultCompositeValue, defaultTransformValue, minimumSize, zIndexFactorOffset } from "./Utils/Constants.js";
import { getStyleFromHsl, rangeColorToHsl } from "../Utils/ColorUtils.js";
import type { CanvasManager } from "./CanvasManager.js";
import type { Container } from "./Container.js";
import type { IContainerPlugin } from "./Interfaces/IContainerPlugin.js";
import type { IDelta } from "./Interfaces/IDelta.js";
import type { IHsl } from "./Interfaces/Colors.js";
import type { IParticleColorStyle } from "./Interfaces/IParticleColorStyle.js";
import type { IParticleTransformValues } from "./Interfaces/IParticleTransformValues.js";
import type { IParticleUpdater } from "./Interfaces/IParticleUpdater.js";
import type { Particle } from "./Particle.js";
import type { PluginManager } from "./Utils/PluginManager.js";

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
 * Canvas manager
 */
export class RenderManager {
  #canvasClearPlugins: IContainerPlugin[];
  readonly #canvasManager: CanvasManager;
  #canvasPaintPlugins: IContainerPlugin[];
  #clearDrawPlugins: IContainerPlugin[];
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
  #drawPlugins: IContainerPlugin[];
  #drawSettingsCleanupPlugins: IContainerPlugin[];
  #drawSettingsSetupPlugins: IContainerPlugin[];
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
   * @param canvasManager -
   */
  constructor(pluginManager: PluginManager, container: Container, canvasManager: CanvasManager) {
    this.#pluginManager = pluginManager;
    this.#container = container;
    this.#canvasManager = canvasManager;
    this.#context = null;
    this.#preDrawUpdaters = [];
    this.#postDrawUpdaters = [];
    this.#colorPlugins = [];
    this.#canvasClearPlugins = [];
    this.#canvasPaintPlugins = [];
    this.#clearDrawPlugins = [];
    this.#drawParticlePlugins = [];
    this.#drawParticlesCleanupPlugins = [];
    this.#drawParticlesSetupPlugins = [];
    this.#drawPlugins = [];
    this.#drawSettingsSetupPlugins = [];
    this.#drawSettingsCleanupPlugins = [];
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
      clear(ctx, this.#canvasManager.size);
    });
  }

  /**
   * Clears the canvas content
   */
  clear(): void {
    let pluginHandled = false;

    for (const plugin of this.#canvasClearPlugins) {
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

    this.#preDrawUpdaters = [];
    this.#postDrawUpdaters = [];
    this.#colorPlugins = [];
    this.#canvasClearPlugins = [];
    this.#canvasPaintPlugins = [];
    this.#clearDrawPlugins = [];
    this.#drawParticlePlugins = [];
    this.#drawParticlesCleanupPlugins = [];
    this.#drawParticlesSetupPlugins = [];
    this.#drawPlugins = [];
    this.#drawSettingsSetupPlugins = [];
    this.#drawSettingsCleanupPlugins = [];
  }

  /**
   * Generic draw method for drawing stuff on the canvas context
   * @param cb -
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
      fill = fColor ? getStyleFromHsl(fColor, container.hdr, fillOpacity * opacity) : undefined,
      stroke = sColor ? getStyleFromHsl(sColor, container.hdr, strokeOpacity * opacity) : fill;

    transform.a = transform.b = transform.c = transform.d = undefined;

    colorStyles.fill = fill;
    colorStyles.stroke = stroke;

    this.draw((context): void => {
      for (const plugin of this.#drawParticlesSetupPlugins) {
        plugin.drawParticleSetup?.(context, particle, delta);
      }

      this.#applyPreDrawUpdaters(context, particle, radius, opacity, colorStyles, transform);

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
        drawParticlePlugin(ctx, plugin, particle, delta);
      }
    });
  }

  /**
   * Draws all particles for the current frame
   * @param delta -
   */
  drawParticles(delta: IDelta): void {
    const { particles } = this.#container;

    this.clear();

    /* update each particle before drawing */
    particles.update(delta);

    this.draw(ctx => {
      for (const plugin of this.#drawSettingsSetupPlugins) {
        plugin.drawSettingsSetup?.(ctx, delta);
      }

      for (const plugin of this.#drawPlugins) {
        plugin.draw?.(ctx, delta);
      }

      particles.drawParticles(delta);

      for (const plugin of this.#clearDrawPlugins) {
        plugin.clearDraw?.(ctx, delta);
      }

      for (const plugin of this.#drawSettingsCleanupPlugins) {
        plugin.drawSettingsCleanup?.(ctx, delta);
      }
    });
  }

  /**
   * Initializes the canvas element
   */
  init(): void {
    this.initUpdaters();
    this.initPlugins();
    this.paint();
  }

  /**
   * Initializes the plugins needed by canvas
   */
  initPlugins(): void {
    this.#colorPlugins = [];
    this.#canvasClearPlugins = [];
    this.#canvasPaintPlugins = [];
    this.#clearDrawPlugins = [];
    this.#drawParticlePlugins = [];
    this.#drawParticlesSetupPlugins = [];
    this.#drawParticlesCleanupPlugins = [];
    this.#drawPlugins = [];
    this.#drawSettingsSetupPlugins = [];
    this.#drawSettingsCleanupPlugins = [];

    for (const plugin of this.#container.plugins) {
      if (plugin.particleFillColor ?? plugin.particleStrokeColor) {
        this.#colorPlugins.push(plugin);
      }

      if (plugin.canvasClear) {
        this.#canvasClearPlugins.push(plugin);
      }

      if (plugin.canvasPaint) {
        this.#canvasPaintPlugins.push(plugin);
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

      if (plugin.draw) {
        this.#drawPlugins.push(plugin);
      }

      if (plugin.drawSettingsSetup) {
        this.#drawSettingsSetupPlugins.push(plugin);
      }

      if (plugin.drawSettingsCleanup) {
        this.#drawSettingsCleanupPlugins.push(plugin);
      }

      if (plugin.clearDraw) {
        this.#clearDrawPlugins.push(plugin);
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

    for (const plugin of this.#canvasPaintPlugins) {
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
   * @param baseColor -
   */
  paintBase(baseColor?: string): void {
    this.draw(ctx => {
      paintBase(ctx, this.#canvasManager.size, baseColor);
    });
  }

  /**
   * Paints an image on the canvas with the given opacity
   * @param image -
   * @param opacity -
   */
  paintImage(image: HTMLImageElement, opacity: number): void {
    this.draw(ctx => {
      paintImage(ctx, this.#canvasManager.size, image, opacity);
    });
  }

  /**
   * Sets the canvas rendering context
   * @param context -
   */
  setContext(context: OffscreenCanvasRenderingContext2D | null): void {
    this.#context = context;

    if (this.#context) {
      this.#context.globalCompositeOperation = defaultCompositeValue;
    }
  }

  /**
   * Sets the canvas rendering context settings
   * @param settings -
   */
  setContextSettings(settings: CanvasRenderingContext2DSettings): void {
    this.#contextSettings = settings;
  }

  /** Stops the renderer and clears the canvas */
  stop(): void {
    this.draw(ctx => {
      clear(ctx, this.#canvasManager.size);
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
}
