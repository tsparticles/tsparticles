import type { IBackgroundMaskCover } from "./IBackgroundMaskCover";
import type { IColor } from "../../../Core";

/**
 * The options to apply a base color to canvas to cover what's behind
 * The particles will unveil what is covered by the canvas
 * [[include:Options/BackgroundMask.md]]
 * @category Options
 */
export interface IBackgroundMask {
    /**
     * This property is used to choose the composition mode for the background mask effect.
     *
     * The default value is `destination-out`, which unveils the background below using drawn elements, any other valid value
     * can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)
     */
    composite: string;

    /**
     * The `cover` property can be set to a HEX string or to a {@link IColor | color object}, that is the same as the one used
     * in `particles.color` options.
     *
     * The `cover` can also be a {@link IBackgroundMaskCover | cover object} like the one described below.
     */
    cover: IBackgroundMaskCover | IColor | string;

    /**
     * This property set the background mask mode, this mode enables the `composite` option to all elements drawn.
     */
    enable: boolean;
}
