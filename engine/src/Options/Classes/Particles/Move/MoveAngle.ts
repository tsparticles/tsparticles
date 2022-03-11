import type { IMoveAngle, IOptionLoader } from "../../../Interfaces";
import type { RangeValue, RecursivePartial } from "../../../../Types";
import { setRangeValue } from "../../../../Utils";

/**
 * @category Options
 */
export class MoveAngle implements IMoveAngle, IOptionLoader<IMoveAngle> {
    offset: RangeValue;
    value: RangeValue;

    constructor() {
        this.offset = 0; //45;
        this.value = 90;
    }

    load(data?: RecursivePartial<IMoveAngle>): void {
        if (!data) {
            return;
        }

        if (data.offset !== undefined) {
            this.offset = setRangeValue(data.offset);
        }

        if (data.value !== undefined) {
            this.value = setRangeValue(data.value);
        }
    }
}
