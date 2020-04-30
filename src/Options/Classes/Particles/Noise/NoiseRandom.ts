import type { INoiseRandom } from "../../../Interfaces/Particles/Noise/INoiseRandom";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

export class NoiseRandom implements INoiseRandom {
    public enable: boolean;
    public minimumValue: number;

    constructor() {
        this.enable = false;
        this.minimumValue = 0;
    }

    public load(data?: RecursivePartial<INoiseRandom>): void {
        if (data !== undefined) {
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }

            if (data.minimumValue !== undefined) {
                this.minimumValue = data.minimumValue;
            }
        }
    }
}
