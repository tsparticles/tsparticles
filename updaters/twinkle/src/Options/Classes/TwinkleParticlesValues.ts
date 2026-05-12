import {
  type IOptionLoader,
  OptionsColor,
  type RangeValue,
  type RecursivePartial,
  isNull,
  setRangeValue,
} from "@tsparticles/engine";
import type { ITwinkleParticlesValues } from "../Interfaces/ITwinkleParticlesValues.js";

/** Twinkle particles values options class */
export class TwinkleParticlesValues implements ITwinkleParticlesValues, IOptionLoader<ITwinkleParticlesValues> {
  /** Enables the twinkle particles */
  enable;
  /** Twinkle particles fill color */
  fillColor?: OptionsColor;
  /** Twinkle particles frequency */
  frequency;
  /** Twinkle particles opacity */
  opacity: RangeValue;
  /** Twinkle particles stroke color */
  strokeColor?: OptionsColor;

  /** TwinkleParticlesValues constructor */
  constructor() {
    this.enable = false;
    this.frequency = 0.05;
    this.opacity = 1;
  }

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
