import { OptionLoader, loadRangeProperty } from "../../../../Utils/OptionsUtils.js";
import type { IMoveAngle } from "../../../Interfaces/Particles/Move/IMoveAngle.js";
import type { RangeValue } from "../../../../Types/RangeValue.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";

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
  protected doLoad(data: RecursivePartial<IMoveAngle>): void {
    loadRangeProperty(this, "offset", data.offset);
    loadRangeProperty(this, "value", data.value);
  }
}
