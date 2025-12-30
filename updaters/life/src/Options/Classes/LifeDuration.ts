import { type IOptionLoader, type RecursivePartial, ValueWithRandom, isNull } from "@tsparticles/engine";
import type { ILifeDuration } from "../Interfaces/ILifeDuration.js";

export class LifeDuration extends ValueWithRandom implements ILifeDuration, IOptionLoader<ILifeDuration> {
    sync;

    constructor() {
        super();
        this.sync = false;
    }

    override load(data?: RecursivePartial<ILifeDuration>): void {
        if (isNull(data)) {
            return;
        }

        super.load(data);

        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
