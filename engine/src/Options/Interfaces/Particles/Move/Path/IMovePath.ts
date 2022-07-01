import type { IValueWithRandom } from "../../../IValueWithRandom";
import type { PathOptions } from "../../../../../Types/PathOptions";

/**
 * @category Options
 */
export interface IMovePath {
    clamp: boolean;
    delay: IValueWithRandom;
    enable: boolean;
    generator?: string;
    options: PathOptions;
}
