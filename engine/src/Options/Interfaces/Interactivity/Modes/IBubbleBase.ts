import type { IOptionsColor } from "../../IOptionsColor";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";

/**
 * @category Options
 */
export interface IBubbleBase {
    color?: SingleOrMultiple<string | IOptionsColor>;
    distance: number;
    duration: number;
    mix: boolean;
    opacity?: number;
    size?: number;
}
