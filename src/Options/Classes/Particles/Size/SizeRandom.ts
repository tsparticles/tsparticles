import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { ISizeRandom } from "../../../Interfaces/Particles/Size/ISizeRandom";

export class SizeRandom implements ISizeRandom {
    public enable: boolean;
    public minimumValue: number;

    constructor() {
        this.enable = false;
        this.minimumValue = 1;
    }

    public load(data?: RecursivePartial<ISizeRandom> | undefined): void {
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
