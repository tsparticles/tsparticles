import type { INoise } from "../../../Interfaces/Particles/Noise/INoise";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { NoiseDelay } from "./NoiseDelay";

export class Noise implements INoise {
    public delay: NoiseDelay;
    public enable: boolean;

    constructor() {
        this.delay = new NoiseDelay();
        this.enable = false;
    }

    public load(data?: RecursivePartial<INoise>): void {
        if (data === undefined) {
            return;
        }

        this.delay.load(data.delay);

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
    }
}
