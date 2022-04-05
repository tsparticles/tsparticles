import type { IColor } from "../../../../Core/Interfaces/Colors";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";

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
