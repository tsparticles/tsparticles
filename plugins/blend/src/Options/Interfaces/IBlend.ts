/**
 * Options for configuring canvas blend/composite operations
 * This allows particles to use different blend modes when drawn
 * [[include:Options/Blend.md]]
 */
export interface IBlend {
  /**
   * This property set the blend mode, this mode enables the `composite` option to all elements drawn.
   */
  enable: boolean;

  /**
   * This property is used to choose the composition mode for the blend effect.
   *
   * The default value is `destination-out`, which unveils the background below using drawn elements, any other valid value
   * can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)
   */
  mode: GlobalCompositeOperation;
}
