import type { ILifeDuration } from "../../../Interfaces/Particles/Life/ILifeDuration";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { ValueWithRandom } from "../../ValueWithRandom";

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
