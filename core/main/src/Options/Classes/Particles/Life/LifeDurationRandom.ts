import type { ILifeDurationRandom } from "../../../Interfaces/Particles/Life/ILifeDurationRandom";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types";

export class LifeDurationRandom implements ILifeDurationRandom, IOptionLoader<ILifeDurationRandom> {
    public enable;
    public minimumValue;

    constructor() {
        this.enable = false;
        this.minimumValue = 0;
    }

    public load(data?: RecursivePartial<ILifeDurationRandom>): void {
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
