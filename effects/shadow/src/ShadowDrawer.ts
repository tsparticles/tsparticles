import {
  CachePolicy,
  type Container,
  EffectLayer,
  type Engine,
  type ICoordinates,
  type IEffectDrawer,
  type IOptionsColor,
  type IRgb,
  type IShapeDrawData,
  type IShapeValues,
  type ITextureMetadata,
  OptionsColor,
  type Particle,
  getStyleFromRgb,
  rangeColorToRgb,
} from "@tsparticles/engine";

const defaultShadowBlur = 0,
  defaultShadowOffsetValue = 0;

interface IShadowData extends IShapeValues {
  blur?: number;
  color?: IOptionsColor;
  enable?: boolean;
  offset?: ICoordinates;
}

type ShadowParticle = Particle & {
  shadowBlur?: number;
  shadowColor?: IRgb;
  shadowEnabled?: boolean;
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
      shadowEnabled = shadowParticle.shadowEnabled,
      shadowColor = shadowParticle.shadowColor,
      shadowOffset = shadowParticle.shadowOffset;

    if (!shadowEnabled || !shadowColor) {
      return;
    }

    context.shadowBlur = shadowParticle.shadowBlur ?? defaultShadowBlur;
    context.shadowColor = getStyleFromRgb(shadowColor, container.hdr);
    context.shadowOffsetX = shadowOffset?.x ?? defaultShadowOffsetValue;
    context.shadowOffsetY = shadowOffset?.y ?? defaultShadowOffsetValue;
  }

  getDescriptor(particle: ShadowParticle): string {
    const blur = particle.shadowBlur ?? defaultShadowBlur,
      offset = particle.shadowOffset,
      color = particle.shadowColor,
      offsetX = offset?.x ?? defaultShadowOffsetValue,
      offsetY = offset?.y ?? defaultShadowOffsetValue,
      colorKey = color ? `${color.r}:${color.g}:${color.b}` : "none";

    return `shadow:${particle.shadowEnabled ? "on" : "off"}:${blur}:${offsetX}:${offsetY}:${colorKey}`;
  }

  getMetadata(): ITextureMetadata {
    return {
      cachePolicy: CachePolicy.Static,
      effectLayer: EffectLayer.External,
    };
  }

  particleInit(_container: Container, particle: ShadowParticle): void {
    const effectData = particle.effectData as IShadowData | undefined;

    if (!effectData?.enable) {
      particle.shadowBlur = undefined;
      particle.shadowColor = undefined;
      particle.shadowOffset = undefined;
      particle.shadowEnabled = false;

      return;
    }

    const shadowColor = OptionsColor.create(new OptionsColor(), effectData.color);

    particle.shadowColor = rangeColorToRgb(this._engine, shadowColor);
    particle.shadowBlur = effectData.blur;
    particle.shadowOffset = effectData.offset;
    particle.shadowEnabled = true;
  }
}
