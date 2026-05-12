import type { IMoveAngle } from "../../../Interfaces/Particles/Move/IMoveAngle.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { RangeValue } from "../../../../Types/RangeValue.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import { isNull } from "../../../../Utils/TypeUtils.js";
import { setRangeValue } from "../../../../Utils/MathUtils.js";

/** Movement angle options class */
export class MoveAngle implements IMoveAngle, IOptionLoader<IMoveAngle> {
  /** Angle offset value */
  offset: RangeValue;
  /** Angle value in degrees */
  value: RangeValue;

  constructor() {
    this.offset = 0; // 45;
    this.value = 90;
  }

  /**
   * Loads move angle options from the given data
   * @param data
   */
  load(data?: RecursivePartial<IMoveAngle>): void {
    if (isNull(data)) {
      return;
    }

    if (data.offset !== undefined) {
      this.offset = setRangeValue(data.offset);
    }

    if (data.value !== undefined) {
      this.value = setRangeValue(data.value);
    }
  }
}
