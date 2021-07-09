import type { RangeValue } from "../../Types";
import type { IRandom } from "./IRandom";

export interface IValueWithRandom {
    /**
     * @deprecated Use the new [[RangeValue]] type instead of random
     */
    random: boolean | IRandom;

    value: RangeValue;
}
