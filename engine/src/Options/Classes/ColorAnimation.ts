import type { RangeValue, RecursivePartial } from "../../Types";
import type { IColorAnimation } from "../Interfaces/IColorAnimation";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import { setRangeValue } from "../../Utils";

/**
 * @category Options
 */
export class ColorAnimation implements IColorAnimation, IOptionLoader<IColorAnimation> {
    count;
    enable;
    offset: RangeValue;
    speed;
    sync;

    constructor() {
        this.count = 0;
        this.enable = false;
        this.offset = 0;
        this.speed = 1;
        this.sync = true;
    }

    load(data?: RecursivePartial<IColorAnimation>): void {
        if (data === undefined) {
            return;
        }

        if (data.count !== undefined) {
            this.count = data.count;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.offset !== undefined) {
            this.offset = setRangeValue(data.offset);
        }

        if (data.speed !== undefined) {
            this.speed = data.speed;
        }

        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
