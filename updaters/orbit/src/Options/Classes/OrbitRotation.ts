import { type IValueWithRandom, type RecursivePartial, ValueWithRandom } from "@tsparticles/engine";

/**
 */
export class OrbitRotation extends ValueWithRandom {
    constructor() {
        super();

        this.value = 45;
        this.random.enable = false;
        this.random.minimumValue = 0;
    }

    load(data?: RecursivePartial<IValueWithRandom>): void {
        if (data === undefined) {
            return;
        }

        super.load(data);
    }
}
