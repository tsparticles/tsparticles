import type { IColorAnimation } from "../Interfaces/IColorAnimation";
import type { RangeValue, RecursivePartial } from "../../Types";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import { NumberUtils } from "../../Utils";

/**
 * @category Options
 */
export class ColorAnimation implements IColorAnimation, IOptionLoader<IColorAnimation> {
    public count;
    public enable;
    public offset: RangeValue;
    public speed;
    public sync;

    constructor() {
        this.count = 0;
        this.enable = false;
        this.offset = 0;
        this.speed = 1;
        this.sync = true;
    }

    public load(data?: RecursivePartial<IColorAnimation>): void {
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
            this.offset = NumberUtils.setRangeValue(data.offset);
        }

        if (data.speed !== undefined) {
            this.speed = data.speed;
        }

        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
