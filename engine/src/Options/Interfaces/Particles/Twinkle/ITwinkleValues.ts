import type { IOptionsColor } from "../../IOptionsColor";
import type { RangeValue } from "../../../../Types/RangeValue";

/**
 * @category Options
 */
export interface ITwinkleValues {
    color?: string | IOptionsColor;
    enable: boolean;
    frequency: number;
    opacity: RangeValue;
}
