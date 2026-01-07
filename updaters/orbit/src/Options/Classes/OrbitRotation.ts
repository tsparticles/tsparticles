import { type IValueWithRandom, type RecursivePartial, ValueWithRandom, isNull } from "@tsparticles/engine";

/**
 */
export class OrbitRotation extends ValueWithRandom {
    constructor() {
        super();

        this.value = 45;
    }

    override load(data?: RecursivePartial<IValueWithRandom>): void {
        if (isNull(data)) {
            return;
        }

        super.load(data);
    }
}
