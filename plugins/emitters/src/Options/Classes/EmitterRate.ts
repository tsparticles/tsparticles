import { type IOptionLoader, type RangeValue, type RecursivePartial, isNull, setRangeValue } from "@tsparticles/engine";
import type { IEmitterRate } from "../Interfaces/IEmitterRate.js";

/**
 */
export class EmitterRate implements IEmitterRate, IOptionLoader<IEmitterRate> {
    delay: RangeValue;
    quantity: RangeValue;

    constructor() {
        this.quantity = 1;
        this.delay = 0.1;
    }

    load(data?: RecursivePartial<IEmitterRate>): void {
        if (isNull(data)) {
            return;
        }

        if (data.quantity !== undefined) {
            this.quantity = setRangeValue(data.quantity);
        }

        if (data.delay !== undefined) {
            this.delay = setRangeValue(data.delay);
        }
    }
}
