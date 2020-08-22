import type { IBounceFactor } from "../../../Interfaces/Particles/Bounce/IBounceFactor";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { BounceFactorRandom } from "./BounceFactorRandom";
import type { RecursivePartial } from "../../../../Types";

export class BounceFactor implements IBounceFactor, IOptionLoader<IBounceFactor> {
    public random;
    public value;

    constructor() {
        this.random = new BounceFactorRandom();
        this.value = 1;
    }

    public load(data?: RecursivePartial<IBounceFactor>): void {
        if (!data) {
            return;
        }

        this.random.load(data.random);

        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}
