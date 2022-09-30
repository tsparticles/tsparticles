import type { IOptionLoader, RangeValue, RecursivePartial } from "tsparticles-engine";
import type { IRotateAnimation } from "../Interfaces/IRotateAnimation";
import { setRangeValue } from "tsparticles-engine";

/**
 * @category Options
 */
export class RotateAnimation implements IRotateAnimation, IOptionLoader<IRotateAnimation> {
    decay: RangeValue;
    enable;
    speed: RangeValue;
    sync;

    constructor() {
        this.enable = false;
        this.speed = 0;
        this.decay = 0;
        this.sync = false;
    }

    load(data?: RecursivePartial<IRotateAnimation>): void {
        if (!data) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.speed !== undefined) {
            this.speed = setRangeValue(data.speed);
        }

        if (data.decay !== undefined) {
            this.decay = setRangeValue(data.decay);
        }

        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
