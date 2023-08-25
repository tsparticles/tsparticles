import { ValueWithRandom } from "../../ValueWithRandom.js";

export class ParticlesBounceFactor extends ValueWithRandom {
    constructor() {
        super();
        this.random.minimumValue = 0.1;
        this.value = 1;
    }
}
