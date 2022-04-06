import type { IColorAnimation } from "../Interfaces/IColorAnimation";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import type { RangeValue } from "../../Types/RangeValue";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import { setRangeValue } from "../../Utils/NumberUtils";

/**
 * @category Options
 */
export class ColorAnimation implements IColorAnimation, IOptionLoader<IColorAnimation> {
    count: RangeValue;
    enable;
    offset: RangeValue;
    speed: RangeValue;
    sync;

    constructor() {
        this.count = 0;
        this.enable = false;
        this.offset = 0;
        this.speed = 1;
        this.sync = true;
    }

    load(data?: RecursivePartial<IColorAnimation>): void {
        if (!data) {
            return;
        }

        if (data.count !== undefined) {
            this.count = setRangeValue(data.count);
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.offset !== undefined) {
            this.offset = setRangeValue(data.offset);
        }

        if (data.speed !== undefined) {
            this.speed = setRangeValue(data.speed);
        }

        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
