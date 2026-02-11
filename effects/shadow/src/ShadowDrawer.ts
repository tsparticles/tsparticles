import {
  type Container,
  type Engine,
  type ICoordinates,
  type IEffectDrawer,
  type IOptionsColor,
  type IRgb,
  type IShapeDrawData,
  type IShapeValues,
  OptionsColor,
  type Particle,
  getStyleFromRgb,
  originPoint,
  rangeColorToRgb,
} from "@tsparticles/engine";

const defaultShadowBlur = 0,
  defaultShadowOffsetValue = 0;

interface IShadowData extends IShapeValues {
  blur?: number;
  color?: IOptionsColor;
  offset?: ICoordinates;
}

type ShadowParticle = Particle & {
  shadowBlur?: number;
  shadowColor?: IRgb;
  shadowOffset?: ICoordinates;
};

export class ShadowDrawer implements IEffectDrawer {
  private readonly _engine: Engine;

  constructor(engine: Engine) {
    this._engine = engine;
  }

  drawBefore(data: IShapeDrawData): void {
    const { particle, context } = data,
      { container } = particle,
      shadowParticle = particle as ShadowParticle,
      shadowColor = shadowParticle.shadowColor,
      shadowOffset = shadowParticle.shadowOffset;

    if (!shadowColor) {
      return;
    }

    context.shadowBlur = shadowParticle.shadowBlur ?? defaultShadowBlur;
    context.shadowColor = getStyleFromRgb(shadowColor, container.hdr);
    context.shadowOffsetX = shadowOffset?.x ?? defaultShadowOffsetValue;
    context.shadowOffsetY = shadowOffset?.y ?? defaultShadowOffsetValue;
  }

  particleInit(_container: Container, particle: ShadowParticle): void {
    const effectData = particle.effectData as IShadowData | undefined,
      shadowColor = OptionsColor.create(new OptionsColor(), effectData?.color);

    particle.shadowColor = rangeColorToRgb(this._engine, shadowColor);
    particle.shadowBlur = effectData?.blur ?? defaultShadowBlur;
    particle.shadowOffset = effectData?.offset ?? originPoint;
  }
}
