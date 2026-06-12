import type { RangeValue } from "../../../../Types/RangeValue.js";
import { ValueWithRandom } from "../../ValueWithRandom.js";

export class ParticlesBounceFactor extends ValueWithRandom {
  override value: RangeValue = 1;
}
