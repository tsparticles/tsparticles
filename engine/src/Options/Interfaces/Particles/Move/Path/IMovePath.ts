import type { IValueWithRandom } from "../../../IValueWithRandom.js";
import type { PathOptions } from "../../../../../Types/PathOptions.js";

/**
 */
export interface IMovePath {
    clamp: boolean;
    delay: IValueWithRandom;
    enable: boolean;
    generator?: string;
    options: PathOptions;
}
