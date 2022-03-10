import type { IColor } from "../../../../Core";
import type { RangeValue } from "../../../../Types";

/**
 * @category Options
 */
export interface ITwinkleValues {
    color?: string | IColor;
    enable: boolean;
    frequency: number;
    opacity: RangeValue;
}
