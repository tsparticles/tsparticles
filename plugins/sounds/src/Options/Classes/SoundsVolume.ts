import type { IOptionLoader, RecursivePartial } from "tsparticles-engine";
import type { ISoundsVolume } from "../Interfaces/ISoundsVolume";

export class SoundsVolume implements ISoundsVolume, IOptionLoader<ISoundsVolume> {
    max: number;
    min: number;
    step: number;
    value: number;

    constructor() {
        this.value = 100;
        this.max = 100;
        this.min = 0;
        this.step = 10;
    }

    load(data?: RecursivePartial<ISoundsVolume | number>): void {
        if (data === undefined) {
            return;
        }

        if (typeof data === "object") {
            if (data.max !== undefined) {
                this.max = data.max;
            }

            if (data.min !== undefined) {
                this.min = data.min;
            }

            if (data.step !== undefined) {
                this.step = data.step;
            }

            if (data.value !== undefined) {
                this.value = data.value;
            }
        } else {
            this.value = data;
        }
    }
}
