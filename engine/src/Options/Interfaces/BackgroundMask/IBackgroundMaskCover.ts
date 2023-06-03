import type { IColor } from "../../../Core/Interfaces/Colors";
import type { IOptionsColor } from "../IOptionsColor";

/**
 * The background cover customization
 */
export interface IBackgroundMaskCover {
    /**
     * The background color hiding all elements behind, string or {@link IColor} value.
     */
    color: string | IOptionsColor;

    /**
     * The opacity of the background
     */
    opacity: number;
}
