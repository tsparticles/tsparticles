import type { ILifeDelay } from "../../../Interfaces/Particles/Life/ILifeDelay";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types";
import { ValueWithRandom } from "../../ValueWithRandom";

export class LifeDelay extends ValueWithRandom implements ILifeDelay, IOptionLoader<ILifeDelay> {
    public sync;

    constructor() {
        super();
        this.sync = false;
    }

    public load(data?: RecursivePartial<ILifeDelay>): void {
        if (!data) {
            return;
        }

        super.load(data);

        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
