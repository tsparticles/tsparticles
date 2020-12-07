import type { IRandom } from "./IRandom";
import type { RangeValue } from "../../Types";

export interface IValueWithRandom {
    /**
     * @deprecated these options are deprecated, use the new [[RangeValue]] syntax
     */
    random: boolean | IRandom;

    value: RangeValue;
}
