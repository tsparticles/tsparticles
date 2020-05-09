import type { INoiseValue } from "../../../Interfaces/Particles/Noise/INoiseValue";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

export class NoiseValue implements INoiseValue {
    public value: number;
    public offset: number;

    constructor() {
        this.value = 1;
        this.offset = 0;
    }

    public load(data?: RecursivePartial<INoiseValue>): void {
        if (data !== undefined) {
            if (data.value !== undefined) {
                this.value = data.value === 0 ? this.value : data.value;
            }

            if (data.offset !== undefined) {
                this.offset = data.offset;
            }
        }
    }
}
