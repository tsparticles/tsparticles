import type { IOptionLoader, RangeValue, RecursivePartial } from "tsparticles-engine";
import type { IRollLight } from "../Interfaces/IRollLight";
import { setRangeValue } from "tsparticles-engine";

export class RollLight implements IRollLight, IOptionLoader<IRollLight> {
    enable;
    value: RangeValue;

    constructor() {
        this.enable = false;
        this.value = 0;
    }

    load(data?: RecursivePartial<IRollLight>): void {
        if (!data) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.value !== undefined) {
            this.value = setRangeValue(data.value);
        }
    }
}
