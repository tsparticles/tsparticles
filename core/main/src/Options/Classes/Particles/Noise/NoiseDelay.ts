import type { INoiseDelay } from "../../../Interfaces/Particles/Noise/INoiseDelay";
import { NoiseRandom } from "./NoiseRandom";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

export class NoiseDelay implements INoiseDelay, IOptionLoader<INoiseDelay> {
    public random: NoiseRandom;
    public value: number;

    constructor() {
        this.random = new NoiseRandom();
        this.value = 0;
    }

    public load(data?: RecursivePartial<INoiseDelay>): void {
        if (data === undefined) {
            return;
        }

        this.random?.load(data.random);

        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}
