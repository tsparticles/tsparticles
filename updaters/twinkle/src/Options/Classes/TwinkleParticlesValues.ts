import {
  type IOptionLoader,
  OptionsColor,
  type RangeValue,
  type RecursivePartial,
  isNull,
  setRangeValue,
} from "@tsparticles/engine";
import type { ITwinkleParticlesValues } from "../Interfaces/ITwinkleParticlesValues.js";

/**
 */
export class TwinkleParticlesValues implements ITwinkleParticlesValues, IOptionLoader<ITwinkleParticlesValues> {
  enable;
  fillColor?: OptionsColor;
  frequency;
  opacity: RangeValue;
  strokeColor?: OptionsColor;

  constructor() {
    this.enable = false;
    this.frequency = 0.05;
    this.opacity = 1;
  }

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
