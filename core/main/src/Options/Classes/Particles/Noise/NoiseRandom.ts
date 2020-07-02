import type { INoiseRandom } from "../../../Interfaces/Particles/Noise/INoiseRandom";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

export class NoiseRandom implements INoiseRandom, IOptionLoader<INoiseRandom> {
    public enable: boolean;
    public minimumValue: number;

    constructor() {
        this.enable = false;
        this.minimumValue = 0;
    }

    public load(data?: RecursivePartial<INoiseRandom>): void {
        if (data === undefined) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.minimumValue !== undefined) {
            this.minimumValue = data.minimumValue;
        }
    }
}
