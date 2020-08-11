import type { ILifeDuration } from "../../../Interfaces/Particles/Life/ILifeDuration";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { LifeDurationRandom } from "./LifeDurationRandom";
import type { RecursivePartial } from "../../../../Types";

export class LifeDuration implements ILifeDuration, IOptionLoader<ILifeDuration> {
    public random: LifeDurationRandom;
    public sync: boolean;
    public value: number;

    constructor() {
        this.random = new LifeDurationRandom();
        this.sync = false;
        this.value = 0;
    }

    public load(data?: RecursivePartial<ILifeDuration>): void {
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
