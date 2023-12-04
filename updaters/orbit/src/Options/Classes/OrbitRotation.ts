import { type IValueWithRandom, type RecursivePartial, ValueWithRandom } from "@tsparticles/engine";

/**
 */
export class OrbitRotation extends ValueWithRandom {
    constructor() {
        super();

        this.value = 45;
    }

    load(data?: RecursivePartial<IValueWithRandom>): void {
        if (data === undefined) {
            return;
        }

        super.load(data);
    }
}
