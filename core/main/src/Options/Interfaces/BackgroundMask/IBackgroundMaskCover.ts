import type { IColor } from "../../../Core/Interfaces/Colors";

/**
 * The background cover customization
 * @category Options
 */
export interface IBackgroundMaskCover {
    /**
     * The background color hiding all elements behind, string or [[IColor]] value.
     */
    color: IColor | string;

    /**
     * The opacity of the background
     */
    opacity: number;
}
