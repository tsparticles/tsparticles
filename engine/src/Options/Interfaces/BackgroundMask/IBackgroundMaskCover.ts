import type { IOptionsColor } from "../IOptionsColor";

/**
 * The background cover customization
 * @category Options
 */
export interface IBackgroundMaskCover {
    /**
     * The background color hiding all elements behind, string or [[IColor]] value.
     */
    color: string | IOptionsColor;

    /**
     * The opacity of the background
     */
    opacity: number;
}
