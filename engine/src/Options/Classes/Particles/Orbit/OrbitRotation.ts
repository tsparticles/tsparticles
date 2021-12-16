import type { RecursivePartial } from "../../../../Types";
import type { IValueWithRandom } from "../../../Interfaces/IValueWithRandom";
import { ValueWithRandom } from "../../ValueWithRandom";

/**
 * @category Options
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
