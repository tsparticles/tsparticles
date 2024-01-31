import type { IOptionsColor } from "../IOptionsColor.js";

/**
 * The background cover customization
 */
export interface IBackgroundMaskCover {
    /**
     * The background color hiding all elements behind, string or {@link IOptionsColor} value.
     */
    color?: string | IOptionsColor;

    /**
     * The background image hiding all elements behind
     */
    image?: string;

    /**
     * The opacity of the background
     */
    opacity: number;
}
