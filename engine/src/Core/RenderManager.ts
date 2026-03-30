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
  private _canvasClearPlugins: IContainerPlugin[];
  private readonly _canvasManager: CanvasManager;
  private _canvasPaintPlugins: IContainerPlugin[];
  private _clearDrawPlugins: IContainerPlugin[];
  private _colorPlugins: IContainerPlugin[];
  private readonly _container;
  /**
   * The particles canvas context
   */
  private _context: CanvasRenderingContext2D | null;
  private _contextSettings?: CanvasRenderingContext2DSettings;
  private _drawParticlePlugins: IContainerPlugin[];
  private _drawParticlesCleanupPlugins: IContainerPlugin[];
  private _drawParticlesSetupPlugins: IContainerPlugin[];
  private _drawPlugins: IContainerPlugin[];
  private _drawSettingsCleanupPlugins: IContainerPlugin[];
  private _drawSettingsSetupPlugins: IContainerPlugin[];
  private readonly _pluginManager;
  private _postDrawUpdaters: IParticleUpdater[];
  private _preDrawUpdaters: IParticleUpdater[];
  private readonly _reusableColorStyles: IParticleColorStyle = {};
  private readonly _reusablePluginColors: (IHsl | undefined)[] = [undefined, undefined];
  private readonly _reusableTransform: Partial<IParticleTransformValues> = {};

  /**
   * Constructor of canvas manager
   * @param pluginManager - the engine managing the whole library
   * @param container - the parent container
   * @param canvasManager -
   */
  constructor(pluginManager: PluginManager, container: Container, canvasManager: CanvasManager) {
    this._pluginManager = pluginManager;
    this._container = container;
    this._canvasManager = canvasManager;
    this._context = null;
    this._preDrawUpdaters = [];
    this._postDrawUpdaters = [];
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

  get settings(): CanvasRenderingContext2DSettings | undefined {
    return this._contextSettings;
  }

  canvasClear(): void {
    if (!this._container.actualOptions.clear) {
      return;
    }

    this.draw(ctx => {
      clear(ctx, this._canvasManager.size);
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

    this._preDrawUpdaters = [];
    this._postDrawUpdaters = [];
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
      psColor = particle.getStrokeColor();

    let [fColor, sColor] = this._getPluginParticleColors(particle);

    fColor ??= pfColor;
    sColor ??= psColor;

    if (!fColor && !sColor) {
      return;
    }

    const container = this._container,
      zIndexOptions = particle.options.zIndex,
      zIndexFactor = zIndexFactorOffset - particle.zIndexFactor,
      { fillOpacity, opacity, strokeOpacity } = particle.getOpacity(),
      transform = this._reusableTransform,
      colorStyles = this._reusableColorStyles,
      fill = fColor ? getStyleFromHsl(fColor, container.hdr, fillOpacity * opacity) : undefined,
      stroke = sColor ? getStyleFromHsl(sColor, container.hdr, strokeOpacity * opacity) : fill;

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
    const { particles } = this._container;

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

      particles.drawParticles(delta);

      for (const plugin of this._clearDrawPlugins) {
        plugin.clearDraw?.(ctx, delta);
      }

      for (const plugin of this._drawSettingsCleanupPlugins) {
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

    for (const plugin of this._container.plugins) {
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

    for (const updater of this._container.particleUpdaters) {
      if (updater.afterDraw) {
        this._postDrawUpdaters.push(updater);
      }

      if (updater.getColorStyles ?? updater.getTransformValues ?? updater.beforeDraw) {
        this._preDrawUpdaters.push(updater);
      }
    }
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
      paintBase(ctx, this._canvasManager.size, baseColor);
    });
  }

  paintImage(image: HTMLImageElement, opacity: number): void {
    this.draw(ctx => {
      paintImage(ctx, this._canvasManager.size, image, opacity);
    });
  }

  setContext(context: CanvasRenderingContext2D | null): void {
    this._context = context;

    if (this._context) {
      this._context.globalCompositeOperation = defaultCompositeValue;
    }
  }

  setContextSettings(settings: CanvasRenderingContext2DSettings): void {
    this._contextSettings = settings;
  }

  stop(): void {
    this.draw(ctx => {
      clear(ctx, this._canvasManager.size);
    });
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

  private readonly _getPluginParticleColors: (particle: Particle) => (IHsl | undefined)[] = particle => {
    let fColor: IHsl | undefined, sColor: IHsl | undefined;

    for (const plugin of this._colorPlugins) {
      if (!fColor && plugin.particleFillColor) {
        fColor = rangeColorToHsl(this._pluginManager, plugin.particleFillColor(particle));
      }

      if (!sColor && plugin.particleStrokeColor) {
        sColor = rangeColorToHsl(this._pluginManager, plugin.particleStrokeColor(particle));
      }

      if (fColor && sColor) {
        break;
      }
    }

    this._reusablePluginColors[fColorIndex] = fColor;
    this._reusablePluginColors[sColorIndex] = sColor;

    return this._reusablePluginColors;
  };
}
