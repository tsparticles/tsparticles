import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { IOpacityRandom } from "../../../../Interfaces/Options/Particles/Opacity/IOpacityRandom";

export class OpacityRandom implements IOpacityRandom {
    public enable: boolean;
    public minimumValue: number;

    constructor() {
        this.enable = false;
        this.minimumValue = 1;
    }

    public load(data?: RecursivePartial<IOpacityRandom> | undefined): void {
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
