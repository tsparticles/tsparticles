import { type IOptionLoader, type RecursivePartial, ValueWithRandom } from "@tsparticles/engine";
import type { ILifeDelay } from "../Interfaces/ILifeDelay";

export class LifeDelay extends ValueWithRandom implements ILifeDelay, IOptionLoader<ILifeDelay> {
    sync;

    constructor() {
        super();
        this.sync = false;
    }

    load(data?: RecursivePartial<ILifeDelay>): void {
        if (!data) {
            return;
        }

        super.load(data);

        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
