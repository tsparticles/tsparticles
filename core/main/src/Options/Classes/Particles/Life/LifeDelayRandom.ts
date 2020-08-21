import type { ILifeDelayRandom } from "../../../Interfaces/Particles/Life/ILifeDelayRandom";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types";

export class LifeDelayRandom implements ILifeDelayRandom, IOptionLoader<ILifeDelayRandom> {
    public enable;
    public minimumValue;

    constructor() {
        this.enable = false;
        this.minimumValue = 0;
    }

    public load(data?: RecursivePartial<ILifeDelayRandom>): void {
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
