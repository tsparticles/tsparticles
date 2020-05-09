import type { INoise } from "../../../Interfaces/Particles/Noise/INoise";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { NoiseDelay } from "./NoiseDelay";
import { NoiseFactor } from "./NoiseFactor";

export class Noise implements INoise {
    public delay: NoiseDelay;
    public enable: boolean;
    public factor: NoiseFactor;

    constructor() {
        this.delay = new NoiseDelay();
        this.enable = false;
        this.factor = new NoiseFactor();
    }

    public load(data?: RecursivePartial<INoise>): void {
        if (data !== undefined) {
            this.delay.load(data.delay);

            if (data.enable !== undefined) {
                this.enable = data.enable;
            }

            this.factor.load(data.factor);
        }
    }
}
