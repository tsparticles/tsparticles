import {
  type Container,
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
  private readonly _container;
  private readonly _pluginManager;

  constructor(pluginManager: PluginManager, container: Container) {
    this._pluginManager = pluginManager;
    this._container = container;
  }

  drawAfter(data: IShapeDrawData): void {
    const { context } = data;

    context.restore();
  }

  drawBefore(data: IShapeDrawData): void {
    const { particle, context } = data,
      { _container: container } = this,
      shadowParticle = particle as ShadowParticle,
      shadowColor = shadowParticle.shadowColor,
      shadowOffset = shadowParticle.shadowOffset;

    if (!shadowColor) {
      return;
    }

    context.save();

    context.shadowBlur = shadowParticle.shadowBlur ?? defaultShadowBlur;
    context.shadowColor = getStyleFromRgb(shadowColor, container.hdr);
    context.shadowOffsetX = shadowOffset?.x ?? defaultShadowOffsetValue;
    context.shadowOffsetY = shadowOffset?.y ?? defaultShadowOffsetValue;
  }

  particleInit(_container: Container, particle: ShadowParticle): void {
    const effectData = particle.effectData as IShadowData | undefined,
      shadowColor = OptionsColor.create(new OptionsColor(), effectData?.color);

    particle.shadowColor = rangeColorToRgb(this._pluginManager, shadowColor);
    particle.shadowBlur = effectData?.blur ?? defaultShadowBlur;
    particle.shadowOffset = effectData?.offset ?? originPoint;
  }
}
