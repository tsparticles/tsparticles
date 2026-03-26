import {
  type ICoordinates,
  type IEffectDrawer,
  type IOptionsColor,
  type IRgb,
  type IShapeDrawData,
  type IShapeValues,
  OptionsColor,
  type Particle,
  type PluginManager,
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
  private readonly _pluginManager;

  constructor(pluginManager: PluginManager) {
    this._pluginManager = pluginManager;
  }

  drawAfter(data: IShapeDrawData): void {
    const { context } = data;

    context.shadowBlur = 0;
    context.shadowColor = "transparent";
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
  }

  drawBefore(data: IShapeDrawData): void {
    const { container, particle, context } = data,
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

  particleInit(particle: ShadowParticle): void {
    const effectData = particle.effectData as IShadowData | undefined,
      shadowColor = OptionsColor.create(new OptionsColor(), effectData?.color);

    particle.shadowColor = rangeColorToRgb(this._pluginManager, shadowColor);
    particle.shadowBlur = effectData?.blur ?? defaultShadowBlur;
    particle.shadowOffset = effectData?.offset ?? originPoint;
  }
}
