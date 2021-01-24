import type { IValueWithRandom } from "../../../IValueWithRandom";

/**
 * @category Options
 */
export interface INoise {
    clamp: boolean;
    delay: IValueWithRandom;
    enable: boolean;
    generator?: string;
}
