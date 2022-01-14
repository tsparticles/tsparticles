import type { ILifeDelay, IOptionLoader } from "../../../Interfaces";
import type { RecursivePartial } from "../../../../Types";
import { ValueWithRandom } from "../../ValueWithRandom";

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
