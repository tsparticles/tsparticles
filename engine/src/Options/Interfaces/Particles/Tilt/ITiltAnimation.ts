import type { RangeValue } from "../../../../Types/RangeValue";

/**
 * @category Options
 */

export interface ITiltAnimation {
    enable: boolean;
    speed: RangeValue;
    decay: RangeValue;
    sync: boolean;
}
