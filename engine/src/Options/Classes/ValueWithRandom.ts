import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import type { IValueWithRandom } from "../Interfaces/IValueWithRandom";
import { Random } from "./Random";
import type { RangeValue } from "../../Types/RangeValue";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import { setRangeValue } from "../../Utils/NumberUtils";

export class ValueWithRandom implements IValueWithRandom, IOptionLoader<IValueWithRandom> {
    /**
     * @deprecated use the new [[RangeValue]] type instead
     */
    random: Random;

    value: RangeValue;

    constructor() {
        this.random = new Random();
        this.value = 0;
    }

    load(data?: RecursivePartial<IValueWithRandom>): void {
        if (!data) {
            return;
        }

        if (typeof data.random === "boolean") {
            this.random.enable = data.random;
        } else {
            this.random.load(data.random);
        }

        if (data.value !== undefined) {
            this.value = setRangeValue(data.value, this.random.enable ? this.random.minimumValue : undefined);
        }
    }
}
