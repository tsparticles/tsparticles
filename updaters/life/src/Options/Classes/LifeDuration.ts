import { type IOptionLoader, type RecursivePartial, ValueWithRandom } from "@tsparticles/engine";
import type { ILifeDuration } from "../Interfaces/ILifeDuration.js";

export class LifeDuration extends ValueWithRandom implements ILifeDuration, IOptionLoader<ILifeDuration> {
    sync;

    constructor() {
        super();
        this.sync = false;
    }

    load(data?: RecursivePartial<ILifeDuration>): void {
        if (!data) {
            return;
        }

        super.load(data);

        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
