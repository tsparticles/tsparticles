import {
  type IOptionLoader,
  OptionsColor,
  type RangeValue,
  type RecursivePartial,
  isNull,
  loadProperty,
  loadRangeProperty,
} from "@tsparticles/engine";
import type { ITwinkleLinksValues } from "../Interfaces/ITwinkleLinksValues.js";

/** Twinkle links values options class */
export class TwinkleLinksValues implements ITwinkleLinksValues, IOptionLoader<ITwinkleLinksValues> {
  /** Twinkle links color */
  color?: OptionsColor;
  /** Enables the twinkle links */
  enable = false;
  /** Twinkle links frequency */
  frequency = 0.05;
  /** Twinkle links opacity */
  opacity: RangeValue = 1;
  /** TwinkleLinksValues constructor */

  /**
   * Loads the twinkle links values from data
   * @param data - The data to handle
   */
  load(data?: RecursivePartial<ITwinkleLinksValues>): void {
    if (isNull(data)) {
      return;
    }

    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }

    loadProperty(this, "enable", data.enable);
    loadProperty(this, "frequency", data.frequency);
    loadRangeProperty(this, "opacity", data.opacity);
  }
}
