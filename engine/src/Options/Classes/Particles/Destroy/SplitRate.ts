import { ValueWithRandom } from "../../ValueWithRandom";

export class SplitRate extends ValueWithRandom {
    constructor() {
        super();

        this.value = 9;
        this.random.enable = true;
        this.random.minimumValue = 4;
    }
}
