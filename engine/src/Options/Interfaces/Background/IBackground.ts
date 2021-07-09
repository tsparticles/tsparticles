import type { IColor } from "../../../Core/Interfaces/Colors";

/**
 * The background options used by the canvas element, it's not drawn, it's applied in the style
 * [[include:Options/Background.md]]
 * @category Options
 */
export interface IBackground {
    /**
     * The `color` property can be set to a HEX string or to a {@link IColor | color object}, that is the same as the one used in `particles.color` options.
     *
     * This color is set to canvas style `background-color` property, if this property is not set the background will be transparent.
     */
    color: IColor | string;

    /**
     * The `image` property sets the canvas style `background-image` property.
     *
     * This property doesn't have a default value, anyway if you need a background image you need to specify the same CSS syntax with the `url()` function.
     */
    image: string;

    /**
     * The `opacity` property sets the `color` property opacity, so you can set a semi-transparent background.
     *
     * This value is by default to `1` and it accepts any value between `0` and `1` included.
     */
    opacity: number;

    /**
     * The `position` property sets the canvas style `background-position` property.
     *
     * This [link](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position) can be useful to set the right value to this property.
     */
    position: string;

    /**
     * The `repeat` property sets the canvas style `background-repeat` property.
     *
     * This [link](https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat) can be useful to set the right value to this property.
     */
    repeat: string;

    /**
     * The `size` property sets the canvas style `background-size` property.
     *
     * This [link](https://developer.mozilla.org/en-US/docs/Web/CSS/background-size) can be useful to set the right value to this property.
     */
    size: string;
}
