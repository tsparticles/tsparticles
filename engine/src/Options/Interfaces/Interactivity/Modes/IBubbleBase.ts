import type { IOptionsColor } from "../../IOptionsColor";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";

/**
 * @category Options
 */
export interface IBubbleBase {
    color?: SingleOrMultiple<string | IOptionsColor>;
    mix: boolean;
    distance: number;
    duration: number;
    opacity?: number;
    size?: number;
}
