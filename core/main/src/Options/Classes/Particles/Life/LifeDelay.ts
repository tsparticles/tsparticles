import type { ILifeDelay } from "../../../Interfaces/Particles/Life/ILifeDelay";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { LifeDelayRandom } from "./LifeDelayRandom";
import type { RecursivePartial } from "../../../../Types";

export class LifeDelay implements ILifeDelay, IOptionLoader<ILifeDelay> {
    public random;
    public sync;
    public value;

    constructor() {
        this.random = new LifeDelayRandom();
        this.sync = false;
        this.value = 0;
    }

    public load(data?: RecursivePartial<ILifeDelay>): void {
        if (data === undefined) {
            return;
        }

        this.random.load(data.random);

        if (data.sync !== undefined) {
            this.sync = data.sync;
        }

        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}
