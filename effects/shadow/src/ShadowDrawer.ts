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

/**
 * Shadow effect shape data
 */
export interface IShadowData extends IShapeValues {
  /** Shadow blur radius */
  blur?: number;
  /** Shadow color */
  color?: IOptionsColor;
  /** Shadow offset */
  offset?: ICoordinates;
}

/**
 * Shadow effect particle extension type
 */
export type ShadowParticle = Particle & {
  /** Shadow effect data */
  effectData?: IShadowData;
  /** Shadow blur radius */
  shadowBlur?: number;
  /** Shadow color */
  shadowColor?: IRgb;
  /** Shadow offset */
  shadowOffset?: ICoordinates;
};

/** Shadow effect drawer plugin */
export class ShadowDrawer implements IEffectDrawer {
  /** The particles container */
  private readonly _container;
  /** The plugin manager */
  private readonly _pluginManager;

  /**
   * ShadowDrawer constructor
   * @param pluginManager
   * @param container
   */
  constructor(pluginManager: PluginManager, container: Container) {
    this._pluginManager = pluginManager;
    this._container = container;
  }

  /**
   * Restores the canvas context after shadow rendering
   * @param data
   */
  drawAfter(data: IShapeDrawData): void {
    const { context } = data;

    context.restore();
  }

  /**
   * Applies shadow styles before particle rendering
   * @param data
   */
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

  /**
   * Initializes shadow-related particle properties
   * @param _container
   * @param particle
   */
  particleInit(_container: Container, particle: ShadowParticle): void {
    const effectData = particle.effectData,
      shadowColor = OptionsColor.create(new OptionsColor(), effectData?.color);

    particle.shadowColor = rangeColorToRgb(this._pluginManager, shadowColor);
    particle.shadowBlur = effectData?.blur ?? defaultShadowBlur;
    particle.shadowOffset = effectData?.offset ?? originPoint;
  }
}
