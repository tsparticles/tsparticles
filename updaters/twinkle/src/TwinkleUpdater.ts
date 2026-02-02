import {
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
  private readonly _engine;

  constructor(engine: Engine) {
    this._engine = engine;
  }

  getColorStyles(
    particle: Particle,
    _context: CanvasRenderingContext2D,
    _radius: number,
    opacity: number,
  ): IParticleColorStyle {
    const pOptions = particle.options,
      { container } = particle,
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
      twinkleRgb = rangeColorToHsl(this._engine, twinkle.color),
      getTwinkleStyle = (): string | undefined => {
        if (!twinkleRgb) {
          return undefined;
        }

        return getStyleFromHsl(twinkleRgb, container.hdr, twinklingOpacity);
      },
      twinkleStyle = getTwinkleStyle(),
      res: IParticleColorStyle = {},
      needsTwinkle = twinkling && twinkleStyle;

    res.fill = needsTwinkle ? twinkleStyle : undefined;
    res.stroke = needsTwinkle ? twinkleStyle : undefined;

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
    options.twinkle = new Twinkle();

    for (const source of sources) {
      options.twinkle.load(source?.twinkle);
    }
  }

  update(): void {
    // nothing to do
  }
}
