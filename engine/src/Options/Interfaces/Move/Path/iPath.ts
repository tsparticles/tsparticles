import type { IValueWithRandom } from "../../../IValueWithRandom";

/**
 * @category Options
 */
export interface IPath {
    clamp: boolean;
    delay: IValueWithRandom;
    enable: boolean;
    generator?: string;
}
