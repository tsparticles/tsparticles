import type { IOptionsColor } from "../IOptionsColor";

/**
 * The background cover customization
 */
export interface IBackgroundMaskCover {
    /**
     * The background color hiding all elements behind, string or {@link IOptionsColor} value.
     */
    color: string | IOptionsColor;

    /**
     * The opacity of the background
     */
    opacity: number;
}
