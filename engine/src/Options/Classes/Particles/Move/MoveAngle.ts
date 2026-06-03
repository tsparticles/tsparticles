import type { IMoveAngle } from "../../../Interfaces/Particles/Move/IMoveAngle.js";
import { OptionLoader } from "../../../../Utils/OptionsUtils.js";
import type { RangeValue } from "../../../../Types/RangeValue.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import { setRangeValue } from "../../../../Utils/MathUtils.js";

/** Movement angle options class */
export class MoveAngle extends OptionLoader<IMoveAngle> implements IMoveAngle {
  /** Angle offset value */
  offset: RangeValue;
  /** Angle value in degrees */
  value: RangeValue;

  constructor() {
    super();
    this.offset = 0; // 45;
    this.value = 90;
  }

  /**
   * Loads move angle options from the given data
   * @param data -
   */
  doLoad(data: RecursivePartial<IMoveAngle>): void {
    if (data.offset !== undefined) {
      this.offset = setRangeValue(data.offset);
    }

    if (data.value !== undefined) {
      this.value = setRangeValue(data.value);
    }
  }
}
