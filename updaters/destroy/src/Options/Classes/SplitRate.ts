import { ValueWithRandom } from "@tsparticles/engine";

/** Split rate options class */
export class SplitRate extends ValueWithRandom {
  /** SplitRate constructor */
  constructor() {
    super();

    this.value = { min: 4, max: 9 };
  }
}
