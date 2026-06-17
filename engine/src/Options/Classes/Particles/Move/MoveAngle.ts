import type { IMoveAngle } from "../../../Interfaces/Particles/Move/IMoveAngle.js";
import { OptionLoader } from "../../../../Utils/OptionLoader.js";
import type { RangeValue } from "../../../../Types/RangeValue.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import { loadRangeProperty } from "../../../../Utils/OptionsUtils.js";

/** Movement angle options class */
export class MoveAngle extends OptionLoader<IMoveAngle> implements IMoveAngle {
  /** Angle offset value */
  offset: RangeValue = 0;
  /** Angle value in degrees */
  value: RangeValue = 90;

  /**
   * Loads move angle options from the given data
   * @param data - The data to handle
   */
  protected doLoad(data: RecursivePartial<IMoveAngle>): void {
    loadRangeProperty(this, "offset", data.offset);
    loadRangeProperty(this, "value", data.value);
  }
}
