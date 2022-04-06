import { ValueWithRandom } from "../../ValueWithRandom";

export class ParticlesBounceFactor extends ValueWithRandom {
    constructor() {
        super();
        this.random.minimumValue = 0.1;
        this.value = 1;
    }
}
