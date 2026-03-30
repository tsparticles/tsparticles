import {
  type Container,
  type Engine,
  type IParticleColorStyle,
  type IParticleUpdater,
  type Particle,
  type RecursivePartial,
  getRandom,
  getRangeValue,
  getStyleFromHsl,
  rangeColorToHsl,
} from "@tsparticles/engine";
import type { ITwinkleParticlesOptions, TwinkeParticle, TwinkleParticlesOptions } from "./Types.js";
import { Twinkle } from "./Options/Classes/Twinkle.js";

export class TwinkleUpdater implements IParticleUpdater {
  private readonly _container;
  private readonly _engine;

  constructor(engine: Engine, container: Container) {
    this._engine = engine;
    this._container = container;
  }

  getColorStyles(
    particle: Particle,
    _context: CanvasRenderingContext2D,
    _radius: number,
    opacity: number,
  ): IParticleColorStyle {
    const pOptions = particle.options,
      { _container: container } = this,
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
      twinkleFillRgb = rangeColorToHsl(this._engine, twinkle.fillColor),
      twinkleStrokeRgb = rangeColorToHsl(this._engine, twinkle.strokeColor),
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

  init(): void {
    // nothing to do
  }

  isEnabled(particle: TwinkeParticle): boolean {
    const pOptions = particle.options,
      twinkleOptions = pOptions.twinkle;

    if (!twinkleOptions) {
      return false;
    }

    return twinkleOptions.particles.enable;
  }

  loadOptions(
    options: TwinkleParticlesOptions,
    ...sources: (RecursivePartial<ITwinkleParticlesOptions> | undefined)[]
  ): void {
    options.twinkle ??= new Twinkle();

    for (const source of sources) {
      options.twinkle.load(source?.twinkle);
    }
  }

  update(): void {
    // nothing to do
  }
}
