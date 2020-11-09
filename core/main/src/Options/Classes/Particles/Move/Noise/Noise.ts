import type { INoise } from "../../../../Interfaces/Particles/Move/Noise/INoise";
import type { RecursivePartial } from "../../../../../Types";
import { NoiseDelay } from "./NoiseDelay";
import type { IOptionLoader } from "../../../../Interfaces/IOptionLoader";

/**
 * @category Options
 */
export class Noise implements INoise, IOptionLoader<INoise> {
    public clamp;
    public delay;
    public enable;
    public generator?: string;

    constructor() {
        this.clamp = true;
        this.delay = new NoiseDelay();
        this.enable = false;
    }

    public load(data?: RecursivePartial<INoise>): void {
        if (data === undefined) {
            return;
        }

        if (data.clamp !== undefined) {
            this.clamp = data.clamp;
        }

        this.delay.load(data.delay);

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        this.generator = data.generator;
    }
}
