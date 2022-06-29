import type { IOptionLoader, RangeValue, RecursivePartial } from "tsparticles-engine";
import type { ITiltAnimation } from "../Interfaces/ITiltAnimation";
import { setRangeValue } from "tsparticles-engine";

/**
 * @category Options
 */
export class TiltAnimation implements ITiltAnimation, IOptionLoader<ITiltAnimation> {
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

    load(data?: RecursivePartial<ITiltAnimation>): void {
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
