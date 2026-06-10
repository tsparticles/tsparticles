import { ValueWithRandom } from "@tsparticles/engine";

/** Split rate options class */
export class SplitRate extends ValueWithRandom {
  override value = { min: 4, max: 9 };
}
