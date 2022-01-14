import type { IColor } from "../../../../Core/Interfaces/Colors";
import type { ILinksShadow } from "./ILinksShadow";
import type { ILinksTriangle } from "./ILinksTriangle";

/**
 * Particles Links options, this configures how the particles link together
 * [[include:Options/Particles/Links.md]]
 * @category Options
 */
export interface ILinks {
    /**
     * Enables random blinking, if set to true and [[color]] is set to "random"
     * the link will have a random color each frame resulting in a blinking animation
     */
    blink: boolean;

    /**
     * Link line color, can be a string or an [[IColor]] object.
     * If the value is "random", if [[blink]] is `true` sets a random color each frame,
     * if [[consent]] is `true` a random color is used for all links,
     * if [[blink]] and [[consent]] are false the color will be a gradient with the two linked particles color
     */
    color: string | IColor;

    /**
     * If enabled the links will have a single random color, if [[color]] value is "random"
     */
    consent: boolean;

    /**
     * Sets the maximum particles link line length
     */
    distance: number;

    /**
     * Enables the particles links
     */
    enable: boolean;

    frequency: number;

    /**
     * Sets the link id, if two particles have a different link id they won't link together
     */
    id?: string;

    /**
     * Sets the maximum link opacity
     */
    opacity: number;

    /**
     * Enables the link line shadow
     * **Shadows in canvas are really heavy and this can affect negatively on performances, use with caution**
     */
    shadow: ILinksShadow;

    /**
     * Fills the triangles made by link lines
     */
    triangles: ILinksTriangle;

    /**
     * Enable link lines warp, linking particles between edges like there's a warp portal at the edges
     */
    warp: boolean;

    /**
     * Sets the link line width
     */
    width: number;
}
