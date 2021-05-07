import { ValueWithRandom } from "../../../../Options/Classes/ValueWithRandom";

export class RepulserSize extends ValueWithRandom {
    constructor() {
        super();
        this.random.minimumValue = 1;
        this.value = 50;
    }
}
