import type { IColor } from "../../../../Core";
import type { SingleOrMultiple } from "../../../../Types";

/**
 * @category Options
 */
export interface IBubbleBase {
    color?: SingleOrMultiple<IColor | string>;
    mix: boolean;
    distance: number;
    duration: number;
    opacity?: number;
    size?: number;
}
