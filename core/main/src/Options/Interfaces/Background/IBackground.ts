import type { IColor } from "../../../Core/Interfaces/IColor";
import type { IOptionLoader } from "../IOptionLoader";

/**
 * The background options used by the canvas element, it's not drawn, it's applied in the style
 */
export interface IBackground extends IOptionLoader<IBackground> {
    /**
     * The background color used by the canvas element, string or [[IColor]] value
     */
    color?: IColor | string;

    /**
     * The background opacity
     */
    opacity?: number;

    /**
     * The background image used by the canvas element, its value will be used to set CSS property background-image
     */
    image?: string;

    /**
     * The background position, it's used by the CSS property background-position
     */
    position?: string;

    /**
     * The background position, it's used by the CSS property background-repeat
     */
    repeat?: string;

    /**
     * The background size, it's used by the CSS property background-size
     */
    size?: string;
}
