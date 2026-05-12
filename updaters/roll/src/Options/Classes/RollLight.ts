import { type IOptionLoader, type RangeValue, type RecursivePartial, isNull, setRangeValue } from "@tsparticles/engine";
import type { IRollLight } from "../Interfaces/IRollLight.js";

/** Roll light options class */
export class RollLight implements IRollLight, IOptionLoader<IRollLight> {
  /** Enables the roll light effect */
  enable;
  /** Roll light value */
  value: RangeValue;

  /** RollLight constructor */
  constructor() {
    this.enable = false;
    this.value = 0;
  }

  /**
   * Loads the roll light from data
   * @param data
   */
  load(data?: RecursivePartial<IRollLight>): void {
    if (isNull(data)) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.value !== undefined) {
      this.value = setRangeValue(data.value);
    }
  }
}
