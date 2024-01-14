import type { IValueWithRandom } from "../../../IValueWithRandom.js";
import type { PathOptions } from "../../../../../Types/PathOptions.js";

/**
 */
export interface IMovePath {
    /**
     * Checks if the output value is clamped between -1 and 1, the velocity range, values out of range must be handled correctly.
     */
    clamp: boolean;

    /**
     * The delay between two updates of the path.
     */
    delay: IValueWithRandom;

    /**
     * Enables or disables the path movement.
     */
    enable: boolean;

    /**
     * The name of the path generator to use, if any.
     */
    generator?: string;

    /**
     * The options of the path movement.
     */
    options: PathOptions;
}
