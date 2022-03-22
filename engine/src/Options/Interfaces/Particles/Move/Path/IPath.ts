import type { IValueWithRandom } from "../../../IValueWithRandom";
import type { PathOptions } from "../../../../../Types";

/**
 * @category Options
 */
export interface IPath {
    clamp: boolean;
    delay: IValueWithRandom;
    enable: boolean;
    options: PathOptions;
    generator?: string;
}
