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
  readonly #container;
  /** The plugin manager */
  readonly #pluginManager;

  /**
   * ShadowDrawer constructor
   * @param pluginManager - The plugin manager
   * @param container - The container to handle
   */
  constructor(pluginManager: PluginManager, container: Container) {
    this.#pluginManager = pluginManager;
    this.#container = container;
  }

  /**
   * Restores the canvas context after shadow rendering
   * @param data - The data to handle
   */
  drawAfter(data: IShapeDrawData): void {
    const { context } = data;

    context.restore();
  }

  /**
   * Applies shadow styles before particle rendering
   * @param data - The data to handle
   */
  drawBefore(data: IShapeDrawData): void {
    const { particle, context } = data,
      container = this.#container,
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
   * @param _container - The container to handle
   * @param particle - The particle to process
   */
  particleInit(_container: Container, particle: ShadowParticle): void {
    const effectData = particle.effectData,
      shadowColor = OptionsColor.create(new OptionsColor(), effectData?.color);

    particle.shadowColor = rangeColorToRgb(this.#pluginManager, shadowColor);
    particle.shadowBlur = effectData?.blur ?? defaultShadowBlur;
    particle.shadowOffset = effectData?.offset ?? originPoint;
  }
}
