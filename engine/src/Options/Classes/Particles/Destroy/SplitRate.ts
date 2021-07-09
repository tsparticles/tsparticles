import { ValueWithRandom } from "../../ValueWithRandom";

export class SplitRate extends ValueWithRandom {
    constructor() {
        super();

        this.value = { min: 4, max: 9 };
    }
}
