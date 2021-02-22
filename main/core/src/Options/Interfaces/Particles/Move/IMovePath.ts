import type { IValueWithRandom } from "../../IValueWithRandom";

/**
 * @category Options
 */
export interface IMovePath {
    clamp: boolean;
    delay: IValueWithRandom;
    enable: boolean;
    generator?: string;
}
