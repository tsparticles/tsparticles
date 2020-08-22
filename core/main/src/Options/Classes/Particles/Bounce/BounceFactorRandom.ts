import type { IBounceFactorRandom } from "../../../Interfaces/Particles/Bounce/IBounceFactorRandom";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types";

export class BounceFactorRandom implements IBounceFactorRandom, IOptionLoader<IBounceFactorRandom> {
    public enable;
    public minimumValue;

    constructor() {
        this.enable = false;
        this.minimumValue = 0.1;
    }

    public load(data?: RecursivePartial<IBounceFactorRandom>): void {
        if (!data) {
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
