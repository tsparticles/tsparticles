import {
  type IOptionLoader,
  type RangeValue,
  type RecursivePartial,
  isNull,
  loadProperty,
  loadRangeProperty,
} from "@tsparticles/engine";
import type { IRollLight } from "../Interfaces/IRollLight.js";

/** Roll light options class */
export class RollLight implements IRollLight, IOptionLoader<IRollLight> {
  /** Enables the roll light effect */
  enable = false;
  /** Roll light value */
  value: RangeValue = 0;
  /** RollLight constructor */

  /**
   * Loads the roll light from data
   * @param data - The data to handle
   */
  load(data?: RecursivePartial<IRollLight>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "enable", data.enable);
    loadRangeProperty(this, "value", data.value);
  }
}
