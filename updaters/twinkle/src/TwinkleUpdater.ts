import {
  type Container,
  type IParticleColorStyle,
  type IParticleUpdater,
  type Particle,
  type PluginManager,
  type RecursivePartial,
  getRandom,
  getRangeValue,
  getStyleFromHsl,
  loadOptionProperty,
  rangeColorToHsl,
} from "@tsparticles/engine";
import type { ITwinkleParticlesOptions, TwinkeParticle, TwinkleParticlesOptions } from "./Types.js";
import { Twinkle } from "./Options/Classes/Twinkle.js";

/** Twinkle updater plugin */
export class TwinkleUpdater implements IParticleUpdater {
  /** The particles container */
  readonly #container;
  /** The plugin manager */
  readonly #pluginManager;

  /**
   * TwinkleUpdater constructor
   * @param pluginManager
   * @param container
   */
  constructor(pluginManager: PluginManager, container: Container) {
    this.#pluginManager = pluginManager;
    this.#container = container;
  }

  /**
   * Gets the twinkle color styles
   * @param particle
   * @param _context
   * @param _radius
   * @param opacity
   */
  getColorStyles(
    particle: Particle,
    _context: OffscreenCanvasRenderingContext2D,
    _radius: number,
    opacity: number,
  ): IParticleColorStyle {
    const pOptions = particle.options,
      container = this.#container,
      twinkleOptions = pOptions["twinkle"] as Twinkle | undefined;

    if (!twinkleOptions) {
      return {};
    }

    const twinkle = twinkleOptions.particles,
      twinkling = twinkle.enable && getRandom() < twinkle.frequency,
      zIndexOptions = particle.options.zIndex,
      zOffset = 1,
      zOpacityFactor = (zOffset - particle.zIndexFactor) ** zIndexOptions.opacityRate,
      twinklingOpacity = twinkling ? getRangeValue(twinkle.opacity) * zOpacityFactor : opacity,
      twinkleFillRgb = rangeColorToHsl(this.#pluginManager, twinkle.fillColor),
      twinkleStrokeRgb = rangeColorToHsl(this.#pluginManager, twinkle.strokeColor),
      getTwinkleFillStyle = (): string | undefined => {
        if (!twinkleFillRgb) {
          return undefined;
        }

        return getStyleFromHsl(twinkleFillRgb, container.hdr, twinklingOpacity);
      },
      getTwinkleStrokeStyle = (): string | undefined => {
        if (!twinkleStrokeRgb) {
          return undefined;
        }

        return getStyleFromHsl(twinkleStrokeRgb, container.hdr, twinklingOpacity);
      },
      twinkleFillStyle = getTwinkleFillStyle(),
      twinkleStrokeStyle = getTwinkleStrokeStyle(),
      res: IParticleColorStyle = {},
      needsTwinkle = twinkling && (!!twinkleFillStyle || !!twinkleStrokeStyle);

    res.fill = needsTwinkle ? twinkleFillStyle : undefined;
    res.stroke = needsTwinkle ? twinkleStrokeStyle : undefined;

    return res;
  }

  /** Initializes the twinkle (no-op) */
  init(): void {
    // nothing to do
  }

  /**
   * Checks if twinkle is enabled
   * @param particle
   */
  isEnabled(particle: TwinkeParticle): boolean {
    const pOptions = particle.options,
      twinkleOptions = pOptions.twinkle;

    if (!twinkleOptions) {
      return false;
    }

    return twinkleOptions.particles.enable;
  }

  /**
   * Loads the twinkle options
   * @param options
   * @param sources
   */
  loadOptions(
    options: TwinkleParticlesOptions,
    ...sources: (RecursivePartial<ITwinkleParticlesOptions> | undefined)[]
  ): void {
    loadOptionProperty(options, "twinkle", Twinkle, ...sources);
  }

  /** Updates the twinkle (no-op) */
  update(): void {
    // nothing to do
  }
}
