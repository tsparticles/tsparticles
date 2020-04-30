import type { INoiseDelay } from "../../../Interfaces/Particles/Noise/INoiseDelay";
import { NoiseRandom } from "./NoiseRandom";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

export class NoiseDelay implements INoiseDelay {
    public random: NoiseRandom;
    public value: number;

    constructor() {
        this.random = new NoiseRandom();
        this.value = 0;
    }

    public load(data?: RecursivePartial<INoiseDelay>): void {
        if (data !== undefined) {
            this.random?.load(data.random);

            if (data.value !== undefined) {
                this.value = data.value;
            }
        }
    }
}
