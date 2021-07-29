import type { SingleOrMultiple } from "../../../../Types";
import type { IColor } from "../../../../Core/Interfaces";

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
