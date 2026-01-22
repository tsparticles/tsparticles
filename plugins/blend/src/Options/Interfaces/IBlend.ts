/**
 * The options to apply a base color to canvas to cover what's behind
 * The particles will unveil what is covered by the canvas
 * [[include:Options/Blend.md]]
 */
export interface IBlend {
    /**
     * This property set the background mask mode, this mode enables the `composite` option to all elements drawn.
     */
    enable: boolean;

    /**
     * This property is used to choose the composition mode for the background mask effect.
     *
     * The default value is `destination-out`, which unveils the background below using drawn elements, any other valid value
     * can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)
     */
    mode: GlobalCompositeOperation;
}
