import type { RangeValue } from "../../../../Types/RangeValue";

/**
 * @category Options
 */
export interface IRotateAnimation {
    enable: boolean;
    speed: RangeValue;
    decay: RangeValue;
    sync: boolean;
}
