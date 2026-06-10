import {
  type IOptionLoader,
  OptionsColor,
  type RangeValue,
  type RecursivePartial,
  isNull,
  loadProperty,
  loadRangeProperty,
} from "@tsparticles/engine";
import type { ITwinkleParticlesValues } from "../Interfaces/ITwinkleParticlesValues.js";

/** Twinkle particles values options class */
export class TwinkleParticlesValues implements ITwinkleParticlesValues, IOptionLoader<ITwinkleParticlesValues> {
  /** Enables the twinkle particles */
  enable = false;
  /** Twinkle particles fill color */
  fillColor?: OptionsColor;
  /** Twinkle particles frequency */
  frequency = 0.05;
  /** Twinkle particles opacity */
  opacity: RangeValue = 1;
  /** Twinkle particles stroke color */
  strokeColor?: OptionsColor;

  /** TwinkleParticlesValues constructor */

  /**
   * Loads the twinkle particles values from data
   * @param data
   */
  load(data?: RecursivePartial<ITwinkleParticlesValues>): void {
    if (isNull(data)) {
      return;
    }

    if (data.fillColor !== undefined) {
      this.fillColor = OptionsColor.create(this.fillColor, data.fillColor);
    }

    if (data.strokeColor !== undefined) {
      this.strokeColor = OptionsColor.create(this.strokeColor, data.strokeColor);
    }

    loadProperty(this, "enable", data.enable);
    loadProperty(this, "frequency", data.frequency);
    loadRangeProperty(this, "opacity", data.opacity);
  }
}
