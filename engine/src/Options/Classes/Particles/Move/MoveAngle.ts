import type { RangeValue, RecursivePartial } from "../../../../Types";
import type { IMoveAngle } from "../../../Interfaces/Particles/Move/IMoveAngle";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
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
        if (data === undefined) {
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
