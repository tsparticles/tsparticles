import type { IOptionLoader, RecursivePartial } from "tsparticles-engine";
import type { ILifeDuration } from "../Interfaces/ILifeDuration";
import { ValueWithRandom } from "tsparticles-engine";

export class LifeDuration extends ValueWithRandom implements ILifeDuration, IOptionLoader<ILifeDuration> {
    sync;

    constructor() {
        super();
        this.random.minimumValue = 0.0001;
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
