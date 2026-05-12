import {
  type IOptionLoader,
  OptionsColor,
  type RangeValue,
  type RecursivePartial,
  isNull,
  setRangeValue,
} from "@tsparticles/engine";
import type { ITwinkleLinksValues } from "../Interfaces/ITwinkleLinksValues.js";

/** Twinkle links values options class */
export class TwinkleLinksValues implements ITwinkleLinksValues, IOptionLoader<ITwinkleLinksValues> {
  /** Twinkle links color */
  color?: OptionsColor;
  /** Enables the twinkle links */
  enable;
  /** Twinkle links frequency */
  frequency;
  /** Twinkle links opacity */
  opacity: RangeValue;

  /** TwinkleLinksValues constructor */
  constructor() {
    this.enable = false;
    this.frequency = 0.05;
    this.opacity = 1;
  }

  /**
   * Loads the twinkle links values from data
   * @param data
   */
  load(data?: RecursivePartial<ITwinkleLinksValues>): void {
    if (isNull(data)) {
      return;
    }

    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.frequency !== undefined) {
      this.frequency = data.frequency;
    }

    if (data.opacity !== undefined) {
      this.opacity = setRangeValue(data.opacity);
    }
  }
}
