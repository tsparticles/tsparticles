import type { RangeValue, RecursivePartial } from "../../Types";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import { setRangeValue } from "../../Utils";
import { IValueWithRandom } from "..";

export abstract class ValueWithRandom implements IValueWithRandom, IOptionLoader<IValueWithRandom> {
    value: RangeValue;

    protected constructor() {
        this.value = 0;
    }

    load(data?: RecursivePartial<IValueWithRandom>): void {
        if (!data) {
            return;
        }

        if (data.value !== undefined) {
            this.value = setRangeValue(data.value);
        }
    }
}
