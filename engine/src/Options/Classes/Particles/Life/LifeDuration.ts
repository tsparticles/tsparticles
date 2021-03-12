import type { ILifeDuration } from "../../../Interfaces/Particles/Life/ILifeDuration";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types";
import { ValueWithRandom } from "../../ValueWithRandom";

export class LifeDuration extends ValueWithRandom implements ILifeDuration, IOptionLoader<ILifeDuration> {
    public sync;

    constructor() {
        super();
        this.random.minimumValue = 0.0001;
        this.sync = false;
    }

    public load(data?: RecursivePartial<ILifeDuration>): void {
        if (data === undefined) {
            return;
        }

        super.load(data);

        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
